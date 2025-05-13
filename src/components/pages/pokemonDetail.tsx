import { useParams } from "react-router-dom";
import { usePokemonDetail } from "../../hooks/usePokemonDetail";
import LoadingCircleSpinner from "../atoms/LoadingCircleSpinner";
import { GeneraEntry } from "../../types";
import FavoriteButton from "../molecules/favoriteButton";
import { Header } from "../molecules/header";

export default function PokemonDetailPage() {
  const { name } = useParams<{ name: string }>();
  const { pokemon, species, abilityNames, moveNames, loading, error } =
    usePokemonDetail(name!);

  if (loading)
    return (
      <div>
        <LoadingCircleSpinner />
      </div>
    );
  if (error) return <div>{error}</div>;
  if (!pokemon || !species) return <div>データが見つかりません</div>;

  const jaName =
    species.names.find((n) => n.language.name === "ja")?.name ?? pokemon.name;
  const flavorText =
    species.flavor_text_entries
      .find((f) => f.language.name === "ja")
      ?.flavor_text.replace(/\n|\f/g, " ") ?? "";
  const category =
    species.genera.find((g: GeneraEntry) => g.language.name === "ja")?.genus ??
    "";
  const typeTranslations: { [key: string]: string } = {
    normal: "ノーマル",
    fire: "ほのお",
    water: "みず",
    electric: "でんき",
    grass: "くさ",
    ice: "こおり",
    fighting: "かくとう",
    poison: "どく",
    ground: "じめん",
    flying: "ひこう",
    psychic: "エスパー",
    bug: "むし",
    rock: "いわ",
    ghost: "ゴースト",
    dragon: "ドラゴン",
    dark: "あく",
    steel: "はがね",
    fairy: "フェアリー",
  };
  return (
    <>
      <Header />
      <div className="flex items-center justify-center bg-red-900 p-40 h-full">
        <div className="flex flex-col gap-10 items-center justify-center bg-white p-20 h-full">
          <h1 className="text-3xl font-bold mb-4">
            {jaName} ({pokemon.name})
          </h1>
          <img
            src={pokemon.sprites.other?.["official-artwork"]?.front_default}
            alt={pokemon.name}
            width={300}
          />
          <div>
            <p className="mt-4">高さ: {pokemon.height / 10} m</p>
            <p>重さ: {pokemon.weight / 10} kg</p>
            <p>
              タイプ：
              {pokemon.types
                .map((t) => typeTranslations[t.type.name] || t.type.name)
                .join(", ")}
            </p>
            <p>分類: {category}</p>
            <p>特性: {abilityNames.join(", ")}</p>
            <p>技（一部）: {moveNames.join(", ")}</p>
            <p className="whitespace-pre-line">図鑑説明: {flavorText}</p>
          </div>
          <FavoriteButton
            pokemon={{
              id: pokemon.id,
              name: pokemon.name,
              image:
                pokemon.sprites.other?.["official-artwork"]?.front_default ??
                "",
              jaName: jaName,
              types: pokemon.types.map((t) => t.type.name),
            }}
          />
        </div>
      </div>
    </>
  );
}
