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

const getSpeciesName = (name: string): string => name.split("-")[0];

export const usePokemonDetail = (name: string): PokemonDetailData => {
  const [pokemon, setPokemon] = useAtom(pokemonAtom);
  const [species, setSpecies] = useAtom(speciesAtom);
  const [abilityNames, setAbilityNames] = useAtom(abilityNamesAtom);
  const [loading, setLoading] = useAtom(loadingAtom);
  const [error, setError] = useAtom(errorAtom);
  const [moveNames, setMoveNames] = useState<string[]>([]);

  useEffect(() => {
    const fetchBasicData = async () => {
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
      } catch (err) {
        console.error(err);
        setError("基本データの取得に失敗しました");
      } finally {
        setLoading(false);
      }
    };

    fetchBasicData();
  }, [name]);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!pokemon) return;

      try {
        const abilityResults = await Promise.all(
          pokemon.abilities.map(async (a) => {
            try {
              const res = await fetch(a.ability.url);
              const ab: Ability = await res.json();
              const ja = ab.names.find(
                (n) => n.language.name === "ja-Hrkt" || n.language.name === "ja"
              );
              return ja?.name ?? a.ability.name;
            } catch {
              return a.ability.name;
            }
          })
        );
        setAbilityNames(abilityResults);
      } catch {
        // 無視（能力だけ失敗しても致命的ではない）
      }

      try {
        const selectedMoves = pokemon.moves.slice(0, 3);
        const moveResults = await Promise.all(
          selectedMoves.map(async (move) => {
            try {
              const res = await fetch(move.move.url);
              const moveData = await res.json();
              const ja = moveData.names.find(
                (n: { language: { name: string } }) =>
                  n.language.name === "ja-Hrkt" || n.language.name === "ja"
              );
              return ja?.name ?? move.move.name;
            } catch {
              return move.move.name;
            }
          })
        );
        setMoveNames(moveResults);
      } catch {
        // 無視
      }
    };

    fetchDetails();
  }, [pokemon]);

  return { pokemon, species, abilityNames, moveNames, loading, error };
};
