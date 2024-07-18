// PokemonCard.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PokemonCard, { getGradientClass } from './index';

const mockPokemon = {
  id: 1,
  name: 'bulbasaur',
  imgUrl: '/bulbasaur.png',
  types: ['grass', 'poison'],
};

describe('PokemonCard component', () => {
  test('renders Pokemon card with correct data', () => {
    render(<PokemonCard {...mockPokemon} />);

    // Check if the Pokemon name is rendered correctly
    const pokemonNameElement = screen.getByText('Bulbasaur');
    expect(pokemonNameElement).toBeInTheDocument();

    // Check if the Pokemon ID is rendered correctly
    const pokemonIdElement = screen.getByText('001');
    expect(pokemonIdElement).toBeInTheDocument();

    // Check if the Pokemon image is rendered correctly
    const pokemonImageElement = screen.getByAltText('Pokemon bulbasaur (1)');
    expect(pokemonImageElement).toBeInTheDocument();
    expect(pokemonImageElement).toHaveAttribute('src', '/_next/image?url=%2Fbulbasaur.png&w=256&q=75');
  });

  test('applies correct gradient class based on types', () => {
    const types = ['grass', 'poison'];
    const gradientClass = getGradientClass(types);

    render(<PokemonCard {...mockPokemon} types={types} />);

    // Check if the gradient class is applied correctly
    const pokemonCardElement = screen.getByRole('listitem');
    expect(pokemonCardElement).toHaveClass(gradientClass);
  });

  test('handles keyboard events correctly', () => {
    render(<PokemonCard {...mockPokemon} />);

    const pokemonCardElement = screen.getByRole('listitem');

    // Simulate keyboard Enter press
    fireEvent.keyDown(pokemonCardElement, { key: 'Enter', code: 'Enter' });
    expect(document.getElementById('link-1')?.getAttribute('href')).toBe('/pokemon-detail/bulbasaur/1');

    // Simulate keyboard Space press
    fireEvent.keyDown(pokemonCardElement, { key: ' ', code: 'Space' });
    expect(document.getElementById('link-1')?.getAttribute('href')).toBe('/pokemon-detail/bulbasaur/1');
  });

  test('renders default gradient for unknown type', () => {
    const types = ['unknown'];
    const gradientClass = getGradientClass(types);

    render(<PokemonCard {...mockPokemon} types={types} />);

    // Check if the gradient class is applied correctly for unknown type
    const pokemonCardElement = screen.getByRole('listitem');
    expect(pokemonCardElement).toHaveClass(gradientClass);
  });

  test('checks gradient class for each Pokemon type', () => {
    const typesList = [
      ['normal'], 
      ['ice'], 
      ['fighting'], 
      ['flying'], 
      ['poison'], 
      ['ground'], 
      ['rock'], 
      ['bug'], 
      ['ghost'], 
      ['steel'], 
      ['fire'], 
      ['water'], 
      ['grass'], 
      ['electric'], 
      ['psychic'], 
      ['dragon'], 
      ['dark'], 
      ['fairy'], 
      ['unknown']
    ];

    typesList.forEach((types) => {
      const gradientClass = getGradientClass(types);

      render(<PokemonCard {...mockPokemon} types={types} />);

      const pokemonCardElement = screen.getByRole('listitem');
      expect(pokemonCardElement).toHaveClass(gradientClass);
    });
  });
});

describe('getGradientClass function', () => {
  it('returns correct gradient classes for each type', () => {
    expect(getGradientClass(['grass'])).toBe('bg-gradient-to-b from-grass to-grass');
    expect(getGradientClass(['fire'])).toBe('bg-gradient-to-b from-fire to-fire');
    expect(getGradientClass(['water'])).toBe('bg-gradient-to-b from-water to-water');
    expect(getGradientClass(['normal', 'dark'])).toBe('bg-gradient-to-b from-normal to-dark');
    expect(getGradientClass(['unknown'])).toBe('bg-gradient-to-b from-unknown to-unknown');
    expect(getGradientClass(['grass', 'fire'])).toBe('bg-gradient-to-b from-grass to-fire');
  });

  it('returns unknown gradient if no types are provided', () => {
    expect(getGradientClass([])).toBe('bg-gradient-to-b from-unknown to-unknown');
    //expect(getGradientClass()).toBe('bg-gradient-to-b from-unknown to-unknown');
  });
});
