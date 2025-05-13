import { useState, useCallback } from "react";
import { BasicPokemonEntry, PokemonSummary, PokemonTypeEntry } from "../types";
import { fetchJapaneseNameFromSpeciesUrl } from "../api/getPokeApi";
import { fetchJapaneseTypeName } from "../api/getPokeApi";

export const useAllPokemonData = () => {
  const [allPokemon, setAllPokemon] = useState<PokemonSummary[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchAllPokemon = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("https://pokeapi.co/api/v2/pokemon?limit=10000");
      const data = await res.json();

      const results: PokemonSummary[] = await Promise.all(
        data.results.map(async (poke: BasicPokemonEntry) => {
          const detailRes = await fetch(poke.url);
          const detail = await detailRes.json();
          const jaName = await fetchJapaneseNameFromSpeciesUrl(
            detail.species.url
          );

          const jaTypes = await Promise.all(
            detail.types.map(async (t: PokemonTypeEntry) => {
              return await fetchJapaneseTypeName(t.type.url);
            })
          );

          return {
            name: detail.name,
            jaName,
            image: detail.sprites.other["official-artwork"].front_default,
            types: jaTypes,
          };
        })
      );

      setAllPokemon(results);
    } catch (e) {
      console.error("全ポケモン取得失敗", e);
      setAllPokemon([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { allPokemon, loading, fetchAllPokemon };
};
