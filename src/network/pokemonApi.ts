import { Pokemon, PokemonPage } from "@/models/PokemonModel";
import api from "./axiosInstance";

// TODO creamos dos funciones para hacer el fetching de la api

export async function getPokemon(name: string) {
    const delay = Math.random() * 2000;
    await new Promise((resolve) => setTimeout(resolve, delay));  // TODO esto es para simular un delay en la respuesta de la api
    const response = await api.get<Pokemon>(`/pokemon/${name}`);
    return response.data;
}

export async function setNickname(pokemon: Pokemon, nickname: string) {
    //El spread operator es para copiar el objeto pokemon y no modificarlo directamente
    return { ...pokemon, name: nickname }
}

export async function getPokemonPage(page: number) {
    const pageSize = 12
    const response = await api.get<PokemonPage>(`/pokemon?limit=${pageSize}&offset=${pageSize * (page - 1)}`);
    return response.data;
}

