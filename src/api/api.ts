import { EvolutionChain, EvolutionChainResponse } from '@/types';
import { genderFromGenderRate } from '@/utils/utils';
import { getRequest, postRequest } from './request.js';

const BASE_URL = 'https://pokeapi.co/api/v2';
const defaultImageUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/72.svg";

export const fetchPokemonGender = async (id: number) => {
  const data = await getRequest(`${BASE_URL}/pokemon-species/${id}`);
  return genderFromGenderRate(data.gender_rate);
};

export const fetchPokemonDetailsById = async (id: number) => {
  const data = await getRequest(`${BASE_URL}/pokemon/${id}`);

  return {
    id: data.id,
    name: data.name,
    height: data.height,
    weight: data.weight,
    abilities: data.abilities.map((a: any) => a.ability.name),
    imgUrl: data.sprites.other.dream_world.front_default || defaultImageUrl,
    types: data.types.map((t: any) => t.type.name),
    stats: data.stats.map((s: any) => ({ name: s.stat.name, value: s.base_stat })),
  };
};


export const fetchPokemonDetails = async (url : string) => {
  const data = await getRequest(url);
  return {
    id: data?.id,
    name: data?.name,
    height: data?.height,
    weight: data?.weight,
    abilities: data?.abilities?.map((a : any) => a.ability.name),
    imgUrl: data?.sprites?.other?.dream_world.front_default || defaultImageUrl,
    types: data?.types?.map((t : any) => t.type.name),
    stats: data?.stats?.map((s : any) => ({ name: s.stat.name, value: s.base_stat })),
  };
};

export const fetchPokemonList = async (page = 1, limit = 100) => {
  const offset = (page - 1) * limit;
  const res = await getRequest(`${BASE_URL}/pokemon`, {}, { offset, limit });
  const pokemonResults = res?.results;

  const fetchedPokemons = await Promise.all(
    pokemonResults?.map(async (pokemon: any) => {
      const pokemonDetails = await fetchPokemonDetails(pokemon?.url);
      const gender = await fetchPokemonGender(pokemonDetails?.id);

      return {
        ...pokemonDetails,
        gender,
      };
    })
  );

  return { pokemons: fetchedPokemons, next: res.next, prev: res.previous };
};

export const fetchPokemonEggGroups = async (id : number) => {
  const data = await getRequest(`${BASE_URL}/pokemon-species/${id}`);
  return data?.egg_groups?.map((g : any) => g.name);
};

export const fetchPokemonWeakAgainst = async (id : number) => {
  try {
    const pokemonData = await getRequest(`${BASE_URL}/pokemon/${id}`);
    const types = pokemonData?.types?.map((t : any) => t.type.name);
    const weaknesses = new Set();
    for (const type of types) {
      const typeData = await getRequest(`${BASE_URL}/type/${type}`);
      typeData.damage_relations.double_damage_from.forEach((t: any) => weaknesses.add(t.name));
    }
    return Array.from(weaknesses);
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    throw error;
  }
};

export const fetchPokemonDescription = async (id : number) => {
  try {
    const data = await getRequest(`${BASE_URL}/pokemon-species/${id}`);
    // const description = data.flavor_text_entries.find(
    //   (entry : { language: { name: string } }) => entry.language.name === 'en'
    // )?.flavor_text;
    // return description;
    const description = data.flavor_text_entries.filter((entry)=> entry.language.name === 'en'
        
    ).map((entry)=>entry.flavor_text).slice(0, 15).join(' ');

    return description;
  } catch (error) {
    console.error('Error fetching Pokemon description:', error);
    throw error;
  }
};

export const fetchPokemonEvolutionChain = async (id : number) => {
  try {
    const speciesData = await getRequest(`${BASE_URL}/pokemon-species/${id}`);
    const evolutionchainData = await getRequest(speciesData.evolution_chain.url);
    const { chain } = evolutionchainData;
    const extractEvolutionChain : any = async (chain : EvolutionChain) => {
      const currentSpecies = { name: chain.species.name, url: chain.species.url };
      const nextEvolutions : any = await Promise.all(chain.evolves_to.flatMap(async (nextChain) => {
        return await extractEvolutionChain(nextChain);
      }));
      const currentSpeciesUrlParts = currentSpecies.url.split('/');
      const currentSpeciesId = currentSpeciesUrlParts[currentSpeciesUrlParts.length - 2];
      const currentPokemon = await fetchPokemonDetailsById(Number(currentSpeciesId));
      return [currentPokemon, ...nextEvolutions.flat()];
    };
    return await extractEvolutionChain(chain);
  } catch (error) {
    console.error('Error fetching evolution chain:', error);
    return [];
  }
};
