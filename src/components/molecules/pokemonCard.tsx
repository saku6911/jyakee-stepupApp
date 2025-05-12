import { useEffect, useState } from "react";
import { fetchJapaneseNameFromSpeciesUrl } from "../../api/getPokeApi";

type Props = {
  name: string;
  image: string;
  types: string[];
  speciesUrl: string;
};

export const PokemonCard = ({ name, image, types, speciesUrl }: Props) => {
  const [jaName, setJaName] = useState<string>("");

  useEffect(() => {
    const loadJaName = async () => {
      const result = await fetchJapaneseNameFromSpeciesUrl(speciesUrl);
      setJaName(result);
    };
    loadJaName();
  }, [speciesUrl]);

  return (
    <div>
      <img loading="lazy" src={image} alt={name} width={200} />
      <p>{jaName ? `${jaName} (${name})` : name}</p>
      <p>タイプ: {types.join(", ")}</p>
    </div>
  );
};
