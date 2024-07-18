"use client";
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PokemonCard from "@/components/molecules/pokemon-card";
import PaginationButtons from "@/components/molecules/pagination-buttons";
import { initialStatValues } from "@/components/atoms/dropdown";
import { CLEAR_FILTERS_BUTTON_TEXT } from "@/utils/constants";

interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  abilities: string[];
  imgUrl: string;
  types: string[];
  stats: { name: string; value: number }[];
  gender: string[];
}

interface PokemonListProps {
  data: {
    pokemons: Pokemon[];
    next: string | null;
    prev: string | null;
  };
  currentPage: number;
  query: string;
}

const PokemonList: React.FC<PokemonListProps> = ({
  data,
  currentPage,
  query,
}) => {
  const { pokemons, next, prev } = data;
  const router = useRouter();
  const searchParams = useSearchParams();

  const types = searchParams.get("type")
    ? searchParams
        .get("type")
        ?.split(",")
        .map((type) => type.toLowerCase())
    : [];
  const genders = searchParams.get("gender")
    ? searchParams
        .get("gender")
        ?.split(",")
        .map((gender) => gender.toLowerCase())
    : [];

  const statParams: { [key in keyof typeof initialStatValues]: string | null } =
    {
      hp: searchParams.get("hp"),
      attack: searchParams.get("attack"),
      defense: searchParams.get("defense"),
      "special-attack": searchParams.get("special-attack"),
      "special-defense": searchParams.get("special-defense"),
      speed: searchParams.get("speed"),
    };

  const filteredPokemons = pokemons.filter((pokemon) => {
    const matchesQuery =
      pokemon.name.toLowerCase().includes(query.toLowerCase()) ||
      pokemon.id.toString() === query;
    const matchesTypes =
      types?.length === 0 ||
      pokemon.types.some((type) => types?.includes(type));
    const matchesGenders =
      genders?.length === 0 ||
      pokemon.gender.some((gender) => genders?.includes(gender));

    const matchesStats = (
      Object.keys(statParams) as (keyof typeof initialStatValues)[]
    ).every((key) => {
      const paramValue = statParams[key];
      if (!paramValue) return true; // No filter applied
      const [min, max] = paramValue.split(",").map(Number);
      const pokemonStatValue = pokemon.stats.find(
        (stat) => stat.name === key
      )?.value;
      return (
        pokemonStatValue !== undefined &&
        pokemonStatValue >= min &&
        pokemonStatValue <= max
      );
    });

    return matchesQuery && matchesTypes && matchesGenders && matchesStats;
  });

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    router.push(`/?${params.toString()}`);
  };

  const handleClearFilters = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("type");
    params.delete("gender");
    Object.keys(initialStatValues).forEach((stat) => {
      params.delete(stat);
    });
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="px-4 md:px-8 lg:px-10 relative">
      <h1 className="sr-only">Pokemon List</h1>
      <div className="w-full flex justify-end mb-4">
        <button
          onClick={handleClearFilters}
          className="bg-darkblue text-white px-4 py-1 rounded-md hidden md:block text-sm"
        >
          {CLEAR_FILTERS_BUTTON_TEXT}
        </button>
      </div>
      <ul
        className="w-full grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-6 md:grid-cols-4 md:gap-8 lg:grid-cols-6 lg:gap-10 justify-items-center"
        role="list"
        aria-label="Pokemon List"
      >
        {filteredPokemons.map((pokemon) => (
          <PokemonCard
            imgUrl={pokemon.imgUrl}
            name={pokemon.name}
            id={pokemon.id}
            key={pokemon.id}
            types={pokemon.types}
          />
        ))}
      </ul>

      <nav aria-label="Pagination" className=" w-full flex justify-center">
        <PaginationButtons
          currentPage={currentPage}
          hasNextPage={!!next}
          onPageChange={handlePageChange}
        />
      </nav>
    </div>
  );
};

export default PokemonList;
