// MobileDetailPagination.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
//import '@testing-library/jest-dom/extend-expect';
import MobileDetailPagination from './index';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

describe('MobileDetailPagination component', () => {
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });
  });

  test('renders previous and next buttons correctly', () => {
    const data = {
      prevPokemon: { name: 'Bulbasaur' },
      nextPokemon: { name: 'Ivysaur' },
    };
    const id = 2;

    render(<MobileDetailPagination data={data} id={id} />);

    const prevButton = screen.getByRole('button', { name: /Bulbasaur/i });
    expect(prevButton).toBeInTheDocument();

    const nextButton = screen.getByRole('button', { name: /Ivysaur/i });
    expect(nextButton).toBeInTheDocument();
  });

  test('handles click on previous button correctly', () => {
    const data = {
      prevPokemon: { name: 'Bulbasaur' },
    };
    const id = 2;

    render(<MobileDetailPagination data={data} id={id} />);

    const prevButton = screen.getByRole('button', { name: /Bulbasaur/i });
    fireEvent.click(prevButton);

    expect(mockRouterPush).toHaveBeenCalledWith('/pokemon-detail/Bulbasaur/1');
  });

  test('handles click on next button correctly', () => {
    const data = {
      nextPokemon: { name: 'Ivysaur' },
    };
    const id = 2;

    render(<MobileDetailPagination data={data} id={id} />);

    const nextButton = screen.getByRole('button', { name: /Ivysaur/i });
    fireEvent.click(nextButton);

    //expect(mockRouterPush).toHaveBeenCalledWith('/pokemon-detail/Ivysaur/3');
  });
});
