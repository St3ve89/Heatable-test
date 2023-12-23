'use server';

import { Pokemon } from '@/types';

export const fetchPokemons = async ({
  query,
  url,
}: {
  query?: string;
  url?: string;
}): Promise<{ pokemons: (Pokemon | null)[]; nextUrl: string | null }> => {
  if (!query) {
    const endpoint =
      url || 'https://pokeapi.co/api/v2/pokemon?offset=0&limit=24';
    const response = await fetch(endpoint);
    const { results, next } = await response.json();

    const pokemons = await Promise.all(
      results.map(
        async ({ name }: { name: string }): Promise<Pokemon | null> => {
          try {
            const pokemonResponse = await fetchPokemonByNameOrId(name);
            return pokemonResponse || null;
          } catch (error) {
            console.error(`Error fetching details for pokemon ${name}:`, error);
            return null;
          }
        }
      )
    );

    return { pokemons: pokemons, nextUrl: next };
  }
  try {
    const pokemonResponse = await fetchPokemonByNameOrId(query);
    return { pokemons: [pokemonResponse], nextUrl: null };
  } catch (error) {
    console.error(`Error fetching details for pokemon ${query}:`, error);
    return { pokemons: [], nextUrl: null };
  }
};

export const fetchPokemonByNameOrId = async (
  pokemonName: string
): Promise<Pokemon | null> => {
  try {
    const pokemonResponse = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}/`
    );
    const pokemonData: Pokemon = await pokemonResponse.json();

    if (pokemonData) {
      return {
        id: pokemonData.id.toString(),
        name: pokemonData.name,
        height: pokemonData.height,
        weight: pokemonData.weight,
        sprites: {
          other: {
            'official-artwork': {
              front_default:
                pokemonData.sprites.other['official-artwork'].front_default,
            },
          },
        },
        types: pokemonData.types.map((t) => ({
          type: { name: t.type.name },
        })),
        stats: pokemonData.stats.map((stats) => ({
          base_stat: stats.base_stat,
          stat: {
            name: stats.stat.name,
          },
        })),
        abilities: pokemonData.abilities.map((ability) => ({
          ability: {
            name: ability.ability.name,
            url: ability.ability.url,
          },
          is_hidden: ability.is_hidden,
          slot: ability.slot,
        })),
      };
    }
    return null;
  } catch (error) {
    console.error(`Error fetching details for pokemon ${pokemonName}:`, error);
    return null;
  }
};
