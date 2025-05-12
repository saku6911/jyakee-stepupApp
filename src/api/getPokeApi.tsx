// import axios from "axios";
// import { NameEntry, PokemonDetail } from "../types";
// import pLimit from "p-limit";

import {
  NameEntry,
  PokeAPIListResponse,
  PokeAPIDetail,
  NamedAPIResource,
} from "../types";

// const limit = pLimit(10);

// // 日本語名を取得
// const fetchJapaneseName = async (name: string): Promise<string> => {
//   try {
//     const res = await axios.get(
//       `https://pokeapi.co/api/v2/pokemon-species/${name}`
//     );
//     const jaEntry = (res.data.names as NameEntry[]).find(
//       (n) => n.language.name === "ja-Hrkt"
//     );
//     return jaEntry?.name || name;
//   } catch (error) {
//     console.warn(`⚠️ fetchJapaneseName failed for ${name}:`, error);
//     return name;
//   }
// };

// // ポケモン詳細（画像・タイプなど）取得
// const fetchPokemonDetail = async (name: string): Promise<PokemonDetail> => {
//   const res = await axios.get<PokemonDetail>(
//     `https://pokeapi.co/api/v2/pokemon/${name}`
//   );
//   return res.data;
// };

// // フル情報まとめて取得
// export const fetchFullPokemons = async (): Promise<FullPokemon[]> => {
//   const res = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=100000");
//   const results: { name: string }[] = res.data.results;

//   const detailedPokemons = await Promise.all(
//     results.map((poke) =>
//       limit(async () => {
//         try {
//           const [jaName, detail] = await Promise.all([
//             fetchJapaneseName(poke.name),
//             fetchPokemonDetail(poke.name),
//           ]);

//           return {
//             id: detail.id,
//             name: poke.name,
//             jaName,
//             image: detail.sprites.other["official-artwork"].front_default,
//             types: detail.types.map((t) => t.type.name),
//             height: detail.height,
//             weight: detail.weight,
//             abilities: detail.abilities.map((a) => a.ability.name),
//           };
//         } catch (err) {
//           console.warn(`❌ Skipped: ${poke.name}`, err);
//           return null;
//         }
//       })
//     )
//   );

//   return detailedPokemons.filter(Boolean) as FullPokemon[];
// };

// 日本語名を speciesUrl から取得
export const fetchJapaneseNameFromSpeciesUrl = async (
  url: string
): Promise<string> => {
  try {
    const res = await fetch(url);
    const data = await res.json();
    const jaEntry = data.names.find(
      (n: NameEntry) => n.language.name === "ja-Hrkt"
    );
    return jaEntry?.name || "???";
  } catch (error) {
    console.warn("日本語名取得失敗:", error);
    return "???";
  }
};

// ページ単位で基本情報取得
export async function fetchPokemonsByPage(offset: number, limit: number) {
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
  );
  const json: PokeAPIListResponse = await response.json();

  const results = await Promise.all(
    json.results.map(async (poke: NamedAPIResource) => {
      const res = await fetch(poke.url);
      const data: PokeAPIDetail = await res.json();

      const speciesRes = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${data.id}/`
      );
      const speciesData = await speciesRes.json();

      return {
        id: data.id,
        name: data.name,
        jaName:
          speciesData.names.find((n: NameEntry) => n.language.name === "ja")
            ?.name || data.name,
        image: data.sprites.other["official-artwork"].front_default,
        types: data.types.map((t) => t.type.name),
        height: data.height,
        weight: data.weight,
        abilities: data.abilities.map((a) => a.ability.name),
      };
    })
  );

  return {
    items: results,
    total: json.count,
  };
}
