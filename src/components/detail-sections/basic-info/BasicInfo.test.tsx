// BasicInfo.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
//import '@testing-library/jest-dom/extend-expect';
import BasicInfo, { BasicInfoProps, typeColors } from './index';

const mockProps: BasicInfoProps = {
  height: 100,
  weight: 600,
  genders: ['Male', 'Female'],
  eggGroups: ['Monster', 'Water 1'],
  abilities: ['Torrent', 'Rain Dish'],
  types: ['Water', 'Grass'],
  weakAgainst: ['Electric', 'Flying'],
};

describe('BasicInfo component', () => {

  test('renders weight correctly', () => {
    render(<BasicInfo {...mockProps} />);
    const weightElement = screen.getByText("60 kg");
    expect(weightElement).toBeInTheDocument();
  });

  test('renders genders correctly', () => {
    render(<BasicInfo {...mockProps} />);
    const gendersElement = screen.getByText("Male, Female");
    expect(gendersElement).toBeInTheDocument();
  });

  test('renders egg groups correctly', () => {
    render(<BasicInfo {...mockProps} />);
    const eggGroupsElement = screen.getByText("Monster, Water 1");
    expect(eggGroupsElement).toBeInTheDocument();
  });

  test('renders abilities correctly', () => {
    render(<BasicInfo {...mockProps} />);
    const abilitiesElement = screen.getByText("Torrent, Rain Dish");
    expect(abilitiesElement).toBeInTheDocument();
  });

  test('renders types correctly', () => {
    render(<BasicInfo {...mockProps} />);
    const waterTypeElement = screen.getByText("Water");
    const grassTypeElement = screen.getByText("Grass");
    expect(waterTypeElement).toBeInTheDocument();
    expect(grassTypeElement).toBeInTheDocument();
  });

  test('renders weak against types correctly', () => {
    render(<BasicInfo {...mockProps} />);
    const electricTypeElement = screen.getByText("Electric");
    const flyingTypeElement = screen.getByText("Flying");
    expect(electricTypeElement).toBeInTheDocument();
    expect(flyingTypeElement).toBeInTheDocument();
  });

  test('renders unknown type with default color', () => {
    const propsWithUnknown = {
      ...mockProps,
      types: [...mockProps.types, 'UnknownType'],
      weakAgainst: [...mockProps.weakAgainst, 'UnknownType'],
    };
    render(<BasicInfo {...propsWithUnknown} />);
    const unknownTypeElement = screen.getAllByText("UnknownType");
    unknownTypeElement.forEach((element) => {
      expect(element).toHaveClass(typeColors['unknown'] || 'bg-unknown');
    });
  });
});
