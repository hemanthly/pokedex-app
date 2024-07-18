// TypeDD.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TypeDD from './index';

// Mock Dropdown component
jest.mock('../../Atoms/Dropdown', () => {
  return jest.fn(({ label, options }) => (
    <div>
      <label>{label}</label>
      <select data-testid="dropdown" onChange={(e) => {}}>
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  ));
});

describe('TypeDD', () => {
  it('renders TypeDD component with label and options', () => {
    render(<TypeDD />);

    const dropdownLabel = screen.getByText('Type');
    expect(dropdownLabel).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('dropdown')); // Open the dropdown

    const optionLabels = ["Normal", "Fighting", "Flying", "Poison", "Ground", "Rock"];

    optionLabels.forEach((optionLabel) => {
      const option = screen.getByText(optionLabel);
      expect(option).toBeInTheDocument();
    });
  });

  it('selects an option from the dropdown', () => {
    render(<TypeDD />);

    fireEvent.click(screen.getByText('Type')); // Open the dropdown

    const optionToSelect = screen.getByText('Flying');
    fireEvent.click(optionToSelect); // Select an option

    // Check if the selected option is displayed after closing the dropdown
    fireEvent.click(screen.getByText('Type')); // Close the dropdown

    expect(screen.getByText('Flying')).toBeInTheDocument();
  });

  it('handles keyboard navigation in the dropdown', () => {
    render(<TypeDD />);

    fireEvent.click(screen.getByText('Type')); // Open the dropdown

    const optionToSelect = screen.getByText('Ground');
    fireEvent.keyDown(screen.getByTestId('dropdown'), { key: 'ArrowDown' }); // Navigate down
    fireEvent.keyDown(screen.getByTestId('dropdown'), { key: 'Enter' }); // Select an option

    // Check if the selected option is displayed after closing the dropdown
    fireEvent.click(screen.getByText('Type')); // Close the dropdown

    expect(screen.getByText('Ground')).toBeInTheDocument();
  });
});
