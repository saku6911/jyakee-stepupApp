import { atom } from "jotai";
import { fetchPokemonsByPage } from "./api/getPokeApi"; // データ取得関数
import { FullPokemon } from "./types";

// ページネーション用のステート
export const currentPageAtom = atom(1);
export const itemsPerPageAtom = atom(20); // 1ページあたりのアイテム数
// pokeListAtom はアイテムのリストを格納するための atom
export const pokeListAtom = atom<FullPokemon[]>([]);

// 非同期でページごとのデータを取得するための atom
export const fetchPagePokemonsAtom = atom(async (get) => {
  const currentPage = get(currentPageAtom);
  const itemsPerPage = get(itemsPerPageAtom);
  const offset = (currentPage - 1) * itemsPerPage;

  const data = await fetchPokemonsByPage(offset, itemsPerPage);
  return data; // data: { items, total }
});
export const emailAtom = atom("");
export const passwordAtom = atom("");
export const totalCountAtom = atom(0);
