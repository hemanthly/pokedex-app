export interface Pokemon {
    id: number;
    name: string;
    imgUrl: string;
  }
  
  export interface PokemonState {
    pokemons: { [key: number]: Pokemon };
    pages: { [key: number]: Pokemon[] };
    currentPage: number;
    nextUrl: string | null;
    prevUrl: string | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }
  
  export interface pokemonEvo{
    id: number;
    name: string;
    height: number;
    weight: number;
    abilities: string[];
    types: string[];
    stats: { name: string; value: number }[];
    imgUrl: string;
  }
  export interface PokemonDetail {
    evolution_chain: any;
    id: number;
    name: string;
    height: number;
    weight: number;
    abilities: string[];
    imgUrl: string;
    types: string[];
    stats: { name: string; value: number }[];
    eggGroups: string[];
    weakAgainst: string[];
    evolutionChain: pokemonEvo[];
    descGenderData: any;
  }
  
  export interface PokemonDetailState {
    details: PokemonDetail | null;
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
  }

  export  interface EvolutionDetail {
    min_level: number;
    trigger: {
      name: string;
      url: string;
    };
  }
 
export  interface EvolutionChain {
    is_baby: boolean;
    species: {
      name: string;
      url: string;
    };
    evolves_to: EvolutionChain[];
    evolution_details: EvolutionDetail[];
  }
 
 export interface EvolutionChainResponse {
    id: number;
    baby_trigger_item: null | { name: string; url: string };
    chain: EvolutionChain;
  }

export type AccordionItem = { label: string };

export type AccordionProps = {
  title: string;
  items: AccordionItem[];
  paramName: string;
};

export type FilterModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

  