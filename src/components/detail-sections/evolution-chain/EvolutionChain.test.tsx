// EvolutionChain.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
//import '@testing-library/jest-dom/extend-expect';
import EvolutionChain from './index';

const mockEvoChainData = [
  { id: 1, name: 'Bulbasaur', imgUrl: '/bulbasaur.png' },
  { id: 2, name: 'Ivysaur', imgUrl: '/ivysaur.png' },
  { id: 3, name: 'Venusaur', imgUrl: '/venusaur.png' },
];

describe('EvolutionChain component', () => {
  test('renders all evolution chain elements', () => {
    render(<EvolutionChain evoChainData={mockEvoChainData} />);
    
    // Check if each Pokemon in the evolution chain is rendered
    mockEvoChainData.forEach((pokemon) => {
      const pokemonNameElement = screen.getByText(pokemon.name);
      expect(pokemonNameElement).toBeInTheDocument();

      const pokemonIdElement = screen.getByText(pokemon.id.toString());
      expect(pokemonIdElement).toBeInTheDocument();

      // const pokemonImageElement = screen.getByAltText(pokemon.name);
      // expect(pokemonImageElement).toBeInTheDocument();
      //expect(pokemonImageElement).toHaveAttribute('src', pokemon.imgUrl);
    });

    // Check if the arrows between Pokemon are rendered correctly
    const arrowIcons = screen.getAllByTestId('arrow-icon');
    expect(arrowIcons.length).toBe(mockEvoChainData.length - 1); // There should be one less arrow than Pokemon
  });

  test('renders no elements when evoChainData is empty', () => {
    render(<EvolutionChain evoChainData={[]} />);
    const evolutionChainSection = screen.queryByTestId('evolution-chain-section');
    expect(evolutionChainSection).not.toBeInTheDocument();
  });
});
