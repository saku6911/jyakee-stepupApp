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

export type Pokemon = {
  name: string;
  url: string;
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

export type FullPokemon = {
  id?: number;
  name: string;
  jaName: string;
  image: string;
  types: string[];
  height?: number;
  weight?: number;
  abilities?: string[];
};

export type NamedAPIResource = {
  name: string;
  url: string;
};

export type PokeAPIListResponse = {
  count: number;
  results: NamedAPIResource[];
};

export type PokeAPIType = {
  type: {
    name: string;
  };
};

export type PokeAPIName = {
  name: string;
  language: {
    name: string;
  };
};

export type PokeAPIDetail = {
  id: number;
  name: string;
  sprites: {
    other: {
      ["official-artwork"]: {
        front_default: string;
      };
    };
    front_default: string;
  };
  types: {
    type: {
      name: string;
    };
  }[];
  height: number;
  weight: number;
  abilities: {
    ability: {
      name: string;
    };
  }[];
};
