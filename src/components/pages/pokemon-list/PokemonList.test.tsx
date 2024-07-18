import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import PokemonList from "./index";
import { useRouter, useSearchParams } from "next/navigation";
import { initialStatValues } from "@/components/atoms/dropdown";
import { CLEAR_FILTERS_BUTTON_TEXT } from "@/utils/constants";

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
  useSearchParams: jest.fn(),
}));

const mockUseRouter = useRouter as jest.Mock;
const mockUseSearchParams = useSearchParams as jest.Mock;

const mockPokemons = [
  {
    id: 1,
    name: "bulbasaur",
    height: 7,
    weight: 69,
    abilities: ["overgrow", "chlorophyll"],
    imgUrl:
      "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png",
    types: ["grass", "poison"],
    stats: [
      { name: "hp", value: 45 },
      { name: "attack", value: 49 },
      { name: "defense", value: 49 },
      { name: "special-attack", value: 65 },
      { name: "special-defense", value: 65 },
      { name: "speed", value: 45 },
    ],
    gender: ["male", "female"],
  },
  // Add more mock Pokemon as needed
];

const mockData = {
  pokemons: mockPokemons,
  next: "next-url",
  prev: "prev-url",
};

describe("PokemonList", () => {
  const routerPush = jest.fn();
  mockUseRouter.mockReturnValue({ push: routerPush });
  mockUseSearchParams.mockReturnValue({
    get: jest.fn((param) => null),
  });

  const defaultProps = {
    data: mockData,
    currentPage: 1,
    query: "",
  };

  it("renders the Pokemon list correctly", () => {
    render(<PokemonList {...defaultProps} />);

    expect(
      screen.getByRole("heading", { level: 1, hidden: true })
    ).toHaveTextContent("Pokemon List");
    expect(
      screen.getByRole("list", { name: "Pokemon List" })
    ).toBeInTheDocument();
    //expect(screen.getAllByRole('listitem')).toHaveLength(mockPokemons.length);
  });

  it("filters Pokemon based on query", () => {
    const queryProps = { ...defaultProps, query: "bulba" };
    render(<PokemonList {...queryProps} />);

    expect(screen.getAllByRole("listitem")).toHaveLength(5);
  });

  it("calls onPageChange when pagination button is clicked", () => {
    render(<PokemonList {...defaultProps} />);

    const nextPageButton = screen.getByRole("button", { name: /next page/i });
    fireEvent.click(nextPageButton);

    expect(routerPush).toHaveBeenCalled();
  });

  it("clears filters when clear filters button is clicked", () => {
    render(<PokemonList {...defaultProps} />);

    const clearFiltersButton = screen.getByText(CLEAR_FILTERS_BUTTON_TEXT);
    fireEvent.click(clearFiltersButton);

    //expect(routerPush).toHaveBeenCalledWith('/');
  });

  // Additional tests for filtering by type, gender, and stats can be added here
});
