import {
  fetchPokemonDescription,
  fetchPokemonDetailsById,
  fetchPokemonEggGroups,
  fetchPokemonEvolutionChain,
  fetchPokemonGender,
  fetchPokemonWeakAgainst,
} from "../../../../api/api";
import PokemonDetail from "../../../../components/pages/pokemon-detail";
import React from "react";
import { Metadata, ResolvingMetadata } from "next";

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = parseInt(params.id, 10);

  const pokemonDetails = await fetchPokemonDetailsById(id);
  const description = await fetchPokemonDescription(id);

  // Optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${pokemonDetails.name} - Pokémon Details`,
    description:
      description ||
      `${pokemonDetails.name} is a Pokémon with unique characteristics.`,
    openGraph: {
      title: `${pokemonDetails.name} - Pokémon Details`,
      description:
        description ||
        `${pokemonDetails.name} is a Pokémon with unique characteristics.`,
      images: [pokemonDetails.imgUrl, ...previousImages],
    },
    icons: {
      icon: pokemonDetails.imgUrl,
    },
  };
}

const getData = async (id: number) => {
  const eggGroups = await fetchPokemonEggGroups(id);
  const pokemonbasicInfo = await fetchPokemonDetailsById(id);
  const genders = await fetchPokemonGender(id);
  const description = await fetchPokemonDescription(id);
  const weakAgainst = await fetchPokemonWeakAgainst(id);
  const evolutionChain = await fetchPokemonEvolutionChain(id);

  return {
    pokemonbasicInfo,
    description,
    genders,
    eggGroups,
    weakAgainst,
    evolutionChain,
  };
};

const page = async ({ params }: { params: { id: string } }) => {
  const id = parseInt(params.id, 10);
  const pokemonData = await getData(id);
  const { pokemonbasicInfo } = pokemonData;
  const faviconUrl = pokemonbasicInfo.imgUrl;

  const getPrevNextPokemonDetails = async () => {
    const prevId = id > 1 ? id - 1 : null;
    const nextId = id + 1;

    const prevPokemon = prevId ? await fetchPokemonDetailsById(prevId) : null;
    const nextPokemon = await fetchPokemonDetailsById(nextId);

    return {
      prevPokemon,
      nextPokemon,
    };
  };

  return (
    <div>
      <PokemonDetail
        data={pokemonData}
        id={params.id}
        prevNextData={await getPrevNextPokemonDetails()}
      ></PokemonDetail>
    </div>
  );
};

export default page;
