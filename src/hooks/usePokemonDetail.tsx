import { useEffect, useState } from "react";
import { Pokemon, PokemonSpecies, Ability } from "../types";
import { useAtom } from "jotai";
import {
  abilityNamesAtom,
  errorAtom,
  loadingAtom,
  pokemonAtom,
  speciesAtom,
} from "../atom";

interface PokemonDetailData {
  pokemon: Pokemon | null;
  species: PokemonSpecies | null;
  abilityNames: string[];
  moveNames: string[];
  loading: boolean;
  error: string | null;
}

const getSpeciesName = (name: string): string => {
  return name.split("-")[0];
};

export const usePokemonDetail = (name: string): PokemonDetailData => {
  const [pokemon, setPokemon] = useAtom(pokemonAtom);
  const [species, setSpecies] = useAtom(speciesAtom);
  const [abilityNames, setAbilityNames] = useAtom(abilityNamesAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [error, setError] = useAtom(errorAtom);
  const [moveNames, setMoveNames] = useState<string[]>([]);

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (!res.ok) throw new Error("ポケモンデータ取得失敗");
        const pokemonData: Pokemon = await res.json();
        setPokemon(pokemonData);

        const speciesName = getSpeciesName(name);
        const speciesRes = await fetch(
          `https://pokeapi.co/api/v2/pokemon-species/${speciesName}`
        );
        if (!speciesRes.ok) throw new Error("種族情報取得失敗");
        const speciesData: PokemonSpecies = await speciesRes.json();
        setSpecies(speciesData);

        const abilities = await Promise.all(
          pokemonData.abilities.map(async (a) => {
            const abRes = await fetch(a.ability.url);
            const ab: Ability = await abRes.json();
            const ja = ab.names.find(
              (n) => n.language.name === "ja-Hrkt" || n.language.name === "ja"
            );
            return ja?.name ?? a.ability.name;
          })
        );
        setAbilityNames(abilities);

        const selectedMoves = pokemonData.moves.slice(0, 5);
        const names = await Promise.all(
          selectedMoves.map(async (move) => {
            const moveRes = await fetch(move.move.url);
            const moveData = await moveRes.json();
            const jaName =
              moveData.names.find(
                (n: {
                  name: string;
                  language: { name: string; url: string };
                }) => n.language.name === "ja-Hrkt" || n.language.name === "ja"
              )?.name ?? move.move.name;
            return jaName;
          })
        );
        setMoveNames(names);
      } catch (err) {
        console.error(err);
        setError("データの取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    fetchPokemonData();
  }, [name, setPokemon, setSpecies, setAbilityNames, setError, setLoading]);

  return { pokemon, species, abilityNames, moveNames, loading, error };
};
