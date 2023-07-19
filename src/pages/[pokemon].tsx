import { useRouter } from "next/router"
import useSWR from "swr"
import * as PokemonApi from '@/network/pokemonApi' // exportamos todas las funciones fetch
import Head from "next/head"
import Link from "next/link"
import Spinner from "react-bootstrap/Spinner"
import { Button, Form, Image } from "react-bootstrap"
import usePokemon from "@/hooks/usePokemon"
import { FormEvent } from "react"

//? En este archivo vamos a hacer el fetch desde el cliente y guardamos las variables en el estado

export default function PokemonDetailsPage() {
    //TODO haremos el fetch desde el cliente en nuestra app
    const router = useRouter()
    const pokemonName = router.query.pokemon?.toString() || ''
    //* renombramos la data a pokemon y el loading a pokemonLoading
    //const { pokemon, pokemonLoading } = useSWR(pokemonName, PokemonApi.getPokemon)
    const { pokemon, pokemonLoading, mutatePokemon } = usePokemon(pokemonName)
    async function handleSubmitNickname(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        const formData = new FormData(e.currentTarget as HTMLFormElement)
        const nickname = formData.get("nickname")?.toString().trim()
        if (!pokemon || !nickname) return
        const newPokemon = await PokemonApi.setNickname(pokemon, nickname)
        mutatePokemon(newPokemon, { revalidate: false }) // revalidate false para que no haga el fetch de nuevo quedo en memoria
    }

    return (
        <>
            <Head>
                {pokemon && <title>{`${pokemon.name} - Nextjs Pokedex`}</title>}
            </Head>
            <div className="d-flex flex-column align-items-center">
                <p><Link href="/" className="link-light">← Pokedex</Link></p>
                {pokemonLoading && <Spinner animation="grow" />}
                {pokemon === null && <p>Pokemon not found</p>}
                {pokemon && (
                    <>
                        <h1 className="text-center text-capitalize">{pokemon.name}</h1>
                        <Image
                            src={pokemon.sprites.other["official-artwork"].front_default}
                            alt={pokemon.name}
                            width={400}
                            height={400}
                        />
                        <div className="d-inline-block mt-2">
                            <div><strong>Types: </strong>{pokemon.types.map((type) => type.type.name).join(", ")}</div>
                            <div><strong>Height: </strong>{pokemon.height * 10} cm</div>
                            <div><strong>Weight: </strong>{pokemon.weight / 10} kg</div>
                        </div>
                        <Form onSubmit={handleSubmitNickname} className="mt-4">
                            <Form.Group controlId="pokemon-nickname-input">
                                <Form.Label>Give this Pokemon a nickname</Form.Label>
                                <Form.Control name="nickname" placeholder="E.g dandondun"></Form.Control>
                            </Form.Group>
                            <Button type="submit">
                                Set nickname
                            </Button>
                        </Form>
                    </>
                )}
            </div>
        </>
    )
}
