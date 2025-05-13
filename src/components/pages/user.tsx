import { useEffect } from "react";
import { usePokemonData } from "../../hooks/usePokemonData";
import { useAllPokemonData } from "../../hooks/useAllPokemonData";
import { useSetAtom, useAtomValue, useAtom } from "jotai";
import {
  fetchPagePokemonsActionAtom,
  currentPageAtom,
  itemsPerPageAtom,
  searchQueryAtom,
} from "../../atom";
import { PokemonSummary } from "../../types";
import { Link } from "react-router-dom";
import { Pagenation } from "../molecules/pagenation";
import LoadingCircleSpinner from "../atoms/LoadingCircleSpinner";
import { Header } from "../molecules/header";
import { toHiragana } from "../../utils/convertToHiragana";

export default function User() {
  const { pokeList, loading } = usePokemonData();
  const fetchPokemons = useSetAtom(fetchPagePokemonsActionAtom);
  const currentPage = useAtomValue(currentPageAtom);
  const itemsPerPage = useAtomValue(itemsPerPageAtom);
  const [searchQuery, setSearchQuery] = useAtom(searchQueryAtom);

  const {
    allPokemon,
    loading: allLoading,
    fetchAllPokemon,
  } = useAllPokemonData();

  const isSearching = searchQuery.trim().length > 0;

  useEffect(() => {
    if (!isSearching) {
      const offset = (currentPage - 1) * itemsPerPage;
      fetchPokemons(offset);
    }
  }, [currentPage, itemsPerPage, fetchPokemons, isSearching]);

  useEffect(() => {
    if (isSearching && allPokemon.length === 0) {
      fetchAllPokemon();
    }
  }, [isSearching, allPokemon.length, fetchAllPokemon]);

  const searchTargetList = isSearching ? allPokemon : pokeList;

  const filteredList = searchTargetList.filter((poke) => {
    const query = toHiragana(searchQuery.toLowerCase());
    const name = poke.name.toLowerCase();
    const jaName = poke.jaName ? toHiragana(poke.jaName) : "";

    return name.includes(query) || jaName.includes(query);
  });

  const isLoading = isSearching ? allLoading : loading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingCircleSpinner />
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="flex flex-col gap-6 items-center justify-center min-h-screen bg-red-900 px-4 py-10 sm:px-8 md:px-20">
        <h1 className="text-white font-bold text-2xl md:text-4xl">
          ポケモン一覧
        </h1>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ポケモンの名前または日本語名で検索"
          className="px-4 py-2 rounded border w-full max-w-md bg-white"
        />

        <div className="bg-white grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-6 rounded w-full">
          {filteredList.length > 0 ? (
            filteredList.map((poke: PokemonSummary) => (
              <Link to={`/pokemon/${poke.name}`} key={poke.name}>
                <div className="text-center w-full">
                  <img
                    loading="lazy"
                    src={poke.image}
                    alt={poke.name}
                    className="mx-auto w-[120px] h-auto sm:w-[150px] md:w-[180px] lg:w-[200px]"
                  />
                  <p className="mt-2 font-semibold">
                    {poke.jaName} ({poke.name})
                  </p>
                  <p className="text-sm text-gray-600">
                    タイプ: {poke.types.join(", ")}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center col-span-full text-gray-600">
              該当するポケモンが見つかりません
            </p>
          )}
        </div>

        {!isSearching && <Pagenation />}
      </div>
    </>
  );
}
