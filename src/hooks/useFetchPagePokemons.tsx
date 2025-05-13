import { useSetAtom } from "jotai";
import { fetchPagePokemonsAtom } from "../atom";
import { useEffect } from "react";

export const useFetchPagePokemons = () => {
  const setFetchedData = useSetAtom(fetchPagePokemonsAtom);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(
        "https://pokeapi.co/api/v2/pokemon?limit=20&offset=0"
      );
      const data = await res.json();

      const items = await Promise.all(
        data.results.map(async (pokemon: { name: string; url: string }) => {
          const res = await fetch(pokemon.url);
          const detail = await res.json();

          return {
            name: detail.name,
            jaName: detail.name,
            image: detail.sprites.other["official-artwork"].front_default,
            types: detail.types.map(
              (t: { type: { name: string } }) => t.type.name
            ),
          };
        })
      );

      setFetchedData({ items, total: data.count });
    };

    fetchData();
  }, [setFetchedData]);
};
