
export interface DropdownProps {
    label?: string;
    options?: string[];
  }
  
  export interface StatValues {
    hp: [number, number];
    attack: [number, number];
    defense: [number, number];
    'special-attack': [number, number];
    'special-defense': [number, number];
    speed: [number, number];
  }

  export const initialStatValues: StatValues = {
    hp: [0, 210],
    attack: [0, 210],
    defense: [0, 210],
    "special-attack": [0, 210],
    "special-defense": [0, 210],
    speed: [0, 210],
  };
  