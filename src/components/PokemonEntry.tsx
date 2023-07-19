import usePokemon from "@/hooks/usePokemon";
import Link from "next/link";
import styles from "@/styles/PokemonEntry.module.css";
import { Image, Spinner } from "react-bootstrap";

export default function PokemonEntry({ name }: { name: string }) {
    const { pokemon, pokemonLoading } = usePokemon(name);
    return (
        <Link href={`/${name}`}>
            <div className={styles.entry}>
                {pokemonLoading && <Spinner animation="grow" />}
                {pokemon &&
                    <div className={styles.card}>
                        <h1 className="text-center text-capitalize">
                            {pokemon.name}
                        </h1>
                        <Image
                            src={pokemon.sprites.other["official-artwork"].front_default}
                            alt={name}
                            width={200}
                            height={200}
                        />
                    </div>}
            </div>
        </Link>
    )
}

