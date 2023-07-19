import PokemonEntry from "@/components/PokemonEntry";

import { useRouter } from "next/router";
import useSWR from "swr";
import * as PokemonApi from "@/network/pokemonApi";
import { Button, Col, Row, Spinner } from "react-bootstrap";

//! data?.results es un array de objetos el signo de interrogacion es para que no de error si no hay data (undefined)

export default function Home() {
  const router = useRouter()
  const page = parseInt(router.query.page?.toString() || "1")
  const { data, isLoading } = useSWR(["getPokemonPage", page], ([key, value]) => PokemonApi.getPokemonPage(page))
  if (isLoading) return <Spinner animation="border" className="d-block m-auto" />

  return (

    <div>
      <h1 className='text-center mb-4'>
        Gotta catch &apos;em all
      </h1>
      <Row xs={1} md={2} lg={3} xl={4} className="g-4">
        {data?.results.map((pokemonEntry) => (
          <Col key={pokemonEntry.name} >
            <PokemonEntry name={pokemonEntry.name} />
          </Col>
        ))}
      </Row>
      <div className="d-flex justify-content-center gap-2 mt-4">
        {data?.previous &&
          <Button onClick={() => router.push({ query: { ...router.query, page: page - 1 } })}> Previous page</Button>
        }
        {data?.next &&
          <Button onClick={() => router.push({ query: { ...router.query, page: page + 1 } })}> Next page</Button>
        }
      </div>
    </div>

  )
}
