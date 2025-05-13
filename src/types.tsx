export type InputProps = {
  type: string;
  value: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type ButtonProps = {
  children: string;
  onClick: (event: React.MouseEvent<HTMLElement>) => void;
};

export type PokemonDetail = {
  id: number;
  name: string;
  sprites: {
    other: {
      "official-artwork": {
        front_default: string;
      };
    };
  };
  types: { type: { name: string } }[];
  height: number;
  weight: number;
  abilities: { ability: { name: string } }[];
};
export type PokemonCardPropsType = {
  id: number;
  name: string;
  image: string;
  types: string[];
  speciesUrl: string;
};

export type NameEntry = {
  language: { name: string };
  name: string;
};

export type Pokemon = {
  name: string;
  height: number;
  weight: number;
  types: { type: { name: string } }[];
  abilities: { ability: { name: string; url: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  sprites: {
    front_default: string;
    other?: {
      ["official-artwork"]?: {
        front_default: string;
      };
    };
  };
  id: number;
  image: string;
  moves: {
    move: {
      name: string;
      url: string;
    };
  }[];
};

export type PokemonSpecies = {
  names: { name: string; language: { name: string } }[];
  flavor_text_entries: {
    flavor_text: string;
    language: { name: string };
    version: { name: string };
  }[];
  genera: {
    genus: string;
    language: {
      name: string;
      url: string;
    };
  }[];
};

export type Ability = {
  names: { name: string; language: { name: string } }[];
};

export type PokemonSummary = {
  name: string;
  id: number;
  jaName: string;
  image: string;
  types: string[];
};

export type PokemonCardProps = {
  name: string;
  image: string;
  types: string[];
  speciesUrl: string;
};

export type GeneraEntry = {
  genus: string;
  language: {
    name: string;
    url: string;
  };
};

export type BasicPokemonEntry = {
  name: string;
  url: string;
};

export type PokemonTypeEntry = {
  slot: number;
  type: {
    name: string;
    url: string;
  };
};
