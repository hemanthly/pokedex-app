// StatsDD.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import StatsDD from './index';

// Mock useRouter
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    query: '',
    pathname: '',
    asPath: '',
  }),
}));

describe('StatsDD', () => {
  it('renders StatsDD component with label and options', () => {
    render(<StatsDD />);

    const dropdownLabel = screen.getByText('Stats');
    expect(dropdownLabel).toBeInTheDocument();

    fireEvent.click(dropdownLabel); // Open the dropdown

    const optionLabels = [
      "HP",
      "Attack",
      "Defense",
      "Speed",
      "Sp. Attack",
      "Sp. Def.",
    ];

    optionLabels.forEach((optionLabel) => {
      const option = screen.getByText(optionLabel);
      expect(option).toBeInTheDocument();
    });
  });

  // it('selects an option from the dropdown', () => {
  //   render(<StatsDD />);

  //   const dropdownLabel = screen.getByText('Stats');
  //   fireEvent.click(dropdownLabel); // Open the dropdown

  //   const optionToSelect = screen.getByText('Speed');
  //   fireEvent.click(optionToSelect); // Select an option

  //   // Check if the selected option is displayed after closing the dropdown
  //   fireEvent.click(dropdownLabel); // Close the dropdown

  //   expect(screen.getByText('Speed')).toBeInTheDocument();
  // });

  it('handles keyboard navigation in the dropdown', () => {
    render(<StatsDD />);

    const dropdownLabel = screen.getByText('Stats');
    fireEvent.click(dropdownLabel); // Open the dropdown

    const optionToSelect = screen.getByText('Attack');
    fireEvent.keyDown(dropdownLabel, { key: 'ArrowDown' }); // Navigate down
    fireEvent.keyDown(dropdownLabel, { key: 'Enter' }); // Select an option

    // Check if the selected option is displayed after closing the dropdown
    fireEvent.click(dropdownLabel); // Close the dropdown

    expect(screen.getByText('Attack')).toBeInTheDocument();
  });
});
