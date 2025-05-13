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
      <div className="flex flex-col gap-10 items-center justify-center h-full bg-red-900 p-20">
        <h1 className="text-white font-bold text-4xl">ポケモン一覧</h1>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="ポケモンの名前または日本語名で検索"
          className="px-4 py-2 rounded border w-96 bg-white"
        />

        <div className="bg-white grid grid-cols-5 gap-10 p-10 h-full">
          {filteredList.length > 0 ? (
            filteredList.map((poke: PokemonSummary) => (
              <Link to={`/pokemon/${poke.name}`} key={poke.name}>
                <div className="text-center w-[200]">
                  <img
                    loading="lazy"
                    src={poke.image}
                    alt={poke.name}
                    width={200}
                  />
                  <p>
                    {poke.jaName} ({poke.name})
                  </p>
                  <p>タイプ: {poke.types.join(", ")}</p>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-center col-span-5 text-gray-600">
              該当するポケモンが見つかりません
            </p>
          )}
        </div>

        {!isSearching && <Pagenation />}
      </div>
    </>
  );
}
