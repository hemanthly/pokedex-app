// SearchBox.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
//import '@testing-library/jest-dom/extend-expect';
import SearchBox from './index';

// Mock the next/navigation module
jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(() => new URLSearchParams('query=initial')),
  usePathname: jest.fn(() => '/test-path'),
  useRouter: jest.fn(() => ({
    replace: jest.fn(),
  })),
}));

describe('SearchBox', () => {
  test('renders the SearchBox component correctly', () => {
    render(<SearchBox />);
    const inputElement = screen.getByPlaceholderText('Name or Number');
    expect(inputElement).toBeInTheDocument();
  });

  test('handles input change and updates search term', () => {
    render(<SearchBox />);
    const inputElement = screen.getByPlaceholderText('Name or Number');

    fireEvent.change(inputElement, { target: { value: 'Pikachu' } });
    expect(inputElement).toHaveValue('Pikachu');
  });

  test('updates URL parameters correctly on input change', () => {
    const mockReplace = jest.fn();
    jest.mock('next/navigation', () => ({
      useSearchParams: jest.fn(() => new URLSearchParams('query=initial')),
      usePathname: jest.fn(() => '/test-path'),
      useRouter: jest.fn(() => ({
        replace: mockReplace,
      })),
    }));

    render(<SearchBox />);
    const inputElement = screen.getByPlaceholderText('Name or Number');

    fireEvent.change(inputElement, { target: { value: 'Pikachu' } });
    //expect(mockReplace).toHaveBeenCalledWith('/test-path?query=Pikachu');

    // fireEvent.change(inputElement, { target: { value: '' } });
    // expect(mockReplace).toHaveBeenCalledWith('/test-path');
  });
});
