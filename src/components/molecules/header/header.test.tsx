// Header.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
//import '@testing-library/jest-dom/extend-expect';
import Header from './index';
describe('Header', () => {
  test('renders the header component with title and description', () => {
    render(<Header />);

    // Check if the title is rendered
    const titleElement = screen.getByText('Pokédex');
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveClass('text-2xl font-bold tracking-widest');

    // Check if the description is rendered
    const descriptionElement = screen.getByText('Search for any Pokémon that exists on the planet');
    expect(descriptionElement).toBeInTheDocument();
  });

  test('renders correctly in mobile view', () => {
    render(<Header />);

    const container = screen.getByText('Pokédex').closest('div');
    expect(container).toHaveClass('flex-1 md:border-r border-b md:border-b-0 border-gray-500 pb-2 md:pb-0 md:pr-7');
  });

  test('renders correctly in desktop view', () => {
    render(<Header />);

    const titleContainer = screen.getByText('Pokédex').closest('div');
    expect(titleContainer).toHaveClass('flex-1 md:border-r border-b md:border-b-0 border-gray-500 pb-2 md:pb-0 md:pr-7');

    const descriptionContainer = screen.getByText('Search for any Pokémon that exists on the planet').closest('div');
    expect(descriptionContainer).toHaveClass('flex-1 pt-2 md:pt-0 md:pl-4 md:text-nowrap');
  });
});
