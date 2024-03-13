import useSWR from "swr";
import * as PokemonAPI from "@/network/pokemonApi";
import { AxiosError } from "axios";

export default function usePokemon(name: string) {
    const { data, isLoading, mutate } = useSWR(name, async (name) => {
        try {
            return await PokemonAPI.getPokemon(name);
        } catch (error) {
            if (error instanceof AxiosError && error.response?.status === 404) {
                return null;
            } else {
                throw error; // cualquier otro error distinto de 404 lo lanzamos
            }
        }
    }, { revalidateIfStale: true });

    return {
        pokemon: data,
        pokemonLoading: isLoading,
        mutatePokemon: mutate,
    };
}