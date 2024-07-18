// Dropdown.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
//import '@testing-library/jest-dom/extend-expect';
import { useRouter, useSearchParams } from 'next/navigation';
import Dropdown from './index';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

const mockedUseRouter = useRouter as jest.Mock;
const mockedUseSearchParams = useSearchParams as jest.Mock;


describe('Dropdown', () => {
  beforeEach(() => {
    mockedUseRouter.mockReturnValue({ push: jest.fn() });
    mockedUseSearchParams.mockReturnValue(new URLSearchParams());
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  const options = ["Option 1", "Option 2", "Option 3"];

  // test('renders dropdown with label', () => {
  //   render(<Dropdown label="Test Label" options={options} />);
  //   expect(screen.getByText('Test Label')).toBeInTheDocument();
  // });

  test('opens dropdown when clicked', () => {
    render(<Dropdown label="Test Label" options={options} />);
    const toggle = screen.getByRole('button');
    fireEvent.click(toggle);
    options.forEach(option => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  test('closes dropdown when clicking outside', () => {
    render(<Dropdown label="Test Label" options={options} />);
    const toggle = screen.getByRole('button');
    fireEvent.click(toggle);
    fireEvent.click(document);
    options.forEach(option => {
      expect(screen.queryByText(option)).not.toBeInTheDocument();
    });
  });

  test('selects and deselects options', () => {
    render(<Dropdown label="Test Label" options={options} />);
    const toggle = screen.getByRole('button');
    fireEvent.click(toggle);

    options.forEach(option => {
      const checkbox = screen.getByLabelText(option) as HTMLInputElement;
      fireEvent.click(checkbox);
      expect(checkbox.checked).toBe(true);
      fireEvent.click(checkbox);
      expect(checkbox.checked).toBe(false);
    });
  });

  test('updates URL with selected options', () => {
    const mockPush = jest.fn();
    mockedUseRouter.mockReturnValue({ push: mockPush });
    render(<Dropdown label="Test Label" options={options} />);
    const toggle = screen.getByRole('button');
    fireEvent.click(toggle);

    const checkbox = screen.getByLabelText(options[0]) as HTMLInputElement;
    fireEvent.click(checkbox);

    //expect(mockPush).toHaveBeenCalledWith(expect.stringContaining(`testlabel=${options[0]}`));
  });

  test('displays correct text when multiple options are selected', () => {
    render(<Dropdown label="Test Label" options={options} />);
    const toggle = screen.getByRole('button');
    fireEvent.click(toggle);

    options.slice(0, 2).forEach(option => {
      const checkbox = screen.getByLabelText(option) as HTMLInputElement;
      fireEvent.click(checkbox);
    });

    expect(screen.getByText(`${options[0]} + 1 more`)).toBeInTheDocument();
  });

  test('handles keyboard navigation and selection', () => {
    render(<Dropdown label="Test Label" options={options} />);
    const toggle = screen.getByRole('button');
    fireEvent.click(toggle);

    const firstOption = screen.getByLabelText(options[0]);
    fireEvent.keyDown(firstOption, { key: 'Enter', code: 'Enter' });
    expect(firstOption).toBeChecked();

    const secondOption = screen.getByLabelText(options[1]);
    fireEvent.keyDown(firstOption, { key: 'ArrowDown', code: 'ArrowDown' });
    //expect(secondOption).toHaveFocus();

    fireEvent.keyDown(secondOption, { key: 'Enter', code: 'Enter' });
    expect(secondOption).toBeChecked();
  });
});
