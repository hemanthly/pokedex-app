// PokemonDetail.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
//import '@testing-library/jest-dom/extend-expect';
import PokemonDetail from './index';

const mockData = {
  pokemonbasicInfo: {
    name: 'bulbasaur',
  id: 1,
    imgUrl: 'https://example.com/bulbasaur.png',
    height: 7,
    weight: 69,
    abilities: ['overgrow', 'chlorophyll'],
    types: ['grass', 'poison'],
    stats: [{ name: 'hp', value: 45 }],
  },
  genders: ['male', 'female'],
  eggGroups: ['monster', 'grass'],
  weakAgainst: ['fire', 'ice'],
  evolutionChain: [
    { id: 1, name: 'bulbasaur', imgUrl: 'https://example.com/bulbasaur.png' },
    { id: 2, name: 'ivysaur', imgUrl: 'https://example.com/ivysaur.png' },
    { id: 3, name: 'venusaur', imgUrl: 'https://example.com/venusaur.png' },
  ],
  description: 'A strange seed was planted on its back at birth...',
};

const mockPrevNextData = {
  prevPokemon: { id: 0, name: 'Previous' },
  nextPokemon: { id: 2, name: 'Next' },
};

describe('PokemonDetail component', () => {
  test('renders basic information', () => {
    render(
      <PokemonDetail
        data={mockData}
        id={1}
        prevNextData={mockPrevNextData}
      />
    );

    const pokemonName = screen.getByText(/bulbasaur/i);
    expect(pokemonName).toBeInTheDocument();

    const basicInfoSection = screen.getByText(/height/i);
    expect(basicInfoSection).toBeInTheDocument();
  });

  test('renders evolution chain', () => {
    render(
      <PokemonDetail
        data={mockData}
        id={1}
        prevNextData={mockPrevNextData}
      />
    );

    const evolutionChainSection = screen.getByText(/evolution chain/i);
    expect(evolutionChainSection).toBeInTheDocument();

    const firstEvolution = screen.getByAltText(/bulbasaur/i);
    expect(firstEvolution).toBeInTheDocument();
  });

  test('renders mobile pagination', () => {
    render(
      <PokemonDetail
        data={mockData}
        id={1}
        prevNextData={mockPrevNextData}
      />
    );

    const mobilePaginationSection = screen.getByText(/mobile detail pagination/i);
    expect(mobilePaginationSection).toBeInTheDocument();

    const prevButton = screen.getByRole('button', { name: /prev/i });
    expect(prevButton).toBeInTheDocument();

    const nextButton = screen.getByRole('button', { name: /next/i });
    expect(nextButton).toBeInTheDocument();
  });
});
