import { atom } from "jotai";
import { User } from "firebase/auth";
import {
  Pokemon,
  PokemonSpecies,
  PokemonDetail,
  PokemonSummary,
  NameEntry,
} from "./types";

export const currentPageAtom = atom(1);
export const itemsPerPageAtom = atom(20); // 1ページあたりのアイテム数

export const emailAtom = atom("");
export const passwordAtom = atom("");

export const pokemonAtom = atom<Pokemon | null>(null);
export const speciesAtom = atom<PokemonSpecies | null>(null);
export const abilityNamesAtom = atom<string[]>([]);
export const loadingAtom = atom(true);
export const errorAtom = atom<string | null>(null);

export const pokeDataAtom = atom<PokemonDetail | null>(null);

export const pokeListAtom = atom<PokemonSummary[]>([]);
export const totalCountAtom = atom<number>(0);
export const isFavoriteAtom = atom<boolean>(false);

export const userAtom = atom<User | null>(null);
export const favoritesAtom = atom<PokemonSummary[]>([]);

export const searchQueryAtom = atom<string>("");

const initialValue = {
  items: [] as PokemonSummary[],
  total: 0,
};

export const fetchPagePokemonsAtom = atom(initialValue);

export const fetchPagePokemonsActionAtom = atom(
  null,
  async (_get, set, offset: number = 0) => {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`
    );
    const data = await res.json();

    const items = await Promise.all(
      data.results.map(async (pokemon: { name: string; url: string }) => {
        const resDetail = await fetch(pokemon.url);
        const detail = await resDetail.json();

        const speciesRes = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${detail.id}/`
        );
        const species = await speciesRes.json();
        const jaName =
          species.names.find((n: NameEntry) => n.language.name === "ja")
            ?.name ?? detail.name;

        const typesJa = await Promise.all(
          detail.types.map(
            async (t: { type: { name: string; url: string } }) => {
              const typeRes = await fetch(t.type.url);
              const typeData = await typeRes.json();
              return (
                typeData.names.find((n: NameEntry) => n.language.name === "ja")
                  ?.name ?? t.type.name
              );
            }
          )
        );

        return {
          name: detail.name,
          jaName,
          image: detail.sprites.other["official-artwork"].front_default,
          types: typesJa,
        };
      })
    );

    set(pokeListAtom, items);
    set(totalCountAtom, data.count);
  }
);
