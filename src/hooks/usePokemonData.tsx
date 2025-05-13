import { useEffect } from "react";
import { useAtom } from "jotai";
import {
  currentPageAtom,
  itemsPerPageAtom,
  pokeListAtom,
  totalCountAtom,
  fetchPagePokemonsActionAtom,
  loadingAtom,
} from "../atom";

export const usePokemonData = () => {
  const [currentPage] = useAtom(currentPageAtom);
  const [itemsPerPage] = useAtom(itemsPerPageAtom);
  const [pokeList] = useAtom(pokeListAtom);
  const [totalCount] = useAtom(totalCountAtom);
  const [, fetchPokemons] = useAtom(fetchPagePokemonsActionAtom);
  const [loading, setLoading] = useAtom(loadingAtom);

  useEffect(() => {
    const fetchWithLoading = async () => {
      const offset = (currentPage - 1) * itemsPerPage;
      setLoading(true);
      try {
        await fetchPokemons(offset);
      } finally {
        setLoading(false);
      }
    };

    fetchWithLoading();
  }, [currentPage, itemsPerPage, fetchPokemons, setLoading]);

  return { pokeList, totalCount, loading };
};
