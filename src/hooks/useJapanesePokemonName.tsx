import { useEffect, useState } from "react";
import { fetchJapaneseNameFromSpeciesUrl } from "../api/getPokeApi";

export const useJapanesePokemonName = (speciesUrl: string) => {
  const [jaName, setJaName] = useState<string>("");

  useEffect(() => {
    const loadJaName = async () => {
      const result = await fetchJapaneseNameFromSpeciesUrl(speciesUrl);
      setJaName(result);
    };
    loadJaName();
  }, [speciesUrl]);

  return jaName;
};
