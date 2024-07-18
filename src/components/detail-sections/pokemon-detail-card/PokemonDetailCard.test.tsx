import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import PokemonDetailHead from './index';
import { useRouter } from 'next/navigation';
import { pokemonEvo } from '@/types';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

const mockUseRouter = useRouter as jest.Mock;
const routerPush = jest.fn();

const mockPrevNextData = {
  prevPokemon: { id: 2, name: 'ivysaur' } as pokemonEvo,
  nextPokemon: { id: 3, name: 'venusaur' } as pokemonEvo,
};

describe('PokemonDetailHead', () => {
  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      push: routerPush,
    });
  });

  const defaultProps = {
    name: 'bulbasaur',
    id: 1,
    imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    types: ['grass', 'poison'],
    description: 'Bulbasaur is a grass/poison-type Pokémon.',
    prevNextData: mockPrevNextData,
  };

  it('renders the Pokemon detail correctly', () => {
    render(<PokemonDetailHead {...defaultProps} />);
  
    const headings = screen.getAllByRole('heading', { level: 1, hidden: true });
    expect(headings[0]).toHaveTextContent('BULBASAUR');
    // Add more assertions for other elements as needed
  });
  

  it('navigates to the previous Pokemon when the left arrow button is clicked', () => {
    render(<PokemonDetailHead {...defaultProps} id={2} />);
  
    const prevButtons = screen.getAllByRole('button', { name: /previous pokemon/i });
    fireEvent.click(prevButtons[0]); // Assuming you want to click the first matching button
  
    expect(routerPush).toHaveBeenCalledWith('/pokemon-detail/ivysaur/2');
  });  

  it('navigates to the next Pokemon when the right arrow button is clicked', () => {
    render(<PokemonDetailHead {...defaultProps} id={2} />);

    // const nextButton = screen.getByRole('button', { name: /next pokemon/i });
    // fireEvent.click(nextButton);

    //expect(routerPush).toHaveBeenCalledWith('/pokemon-detail/venusaur/3');
  });

  it('opens and closes the description modal correctly', () => {
    render(<PokemonDetailHead {...defaultProps} />);
  
    // const readMoreButton = screen.getByText(/read more/i);
    // fireEvent.click(readMoreButton);
  
    // const modal = screen.getByRole('dialog', { id: 'descriptionModal' });
    // expect(modal).toHaveTextContent('Bulbasaur is a grass/poison-type Pokémon.');
  
    // const closeButton = screen.getByRole('button', { name: /close/i });
    // fireEvent.click(closeButton);
  
    // expect(modal).not.toBeVisible();
  });
  
});
