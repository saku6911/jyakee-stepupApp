import { useJapanesePokemonName } from "../../hooks/useJapanesePokemonName";
import { PokemonCardProps } from "../../types";

export const PokemonCard = ({
  name,
  image,
  types,
  speciesUrl,
}: PokemonCardProps) => {
  const jaName = useJapanesePokemonName(speciesUrl);

  return (
    <div>
      <img loading="lazy" src={image} alt={name} width={200} />
      <p>{jaName ? `${jaName} (${name})` : name}</p>
      <p>タイプ: {types.join(", ")}</p>
    </div>
  );
};
