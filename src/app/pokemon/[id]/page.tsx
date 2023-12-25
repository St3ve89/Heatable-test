import { fetchPokemonByNameOrId } from '@/actions';
import PokemonDetailCard from '@/components/PokemonDetailCard/PokemonDetailCard';
import PokemonNavigation from '@/components/PokemonNavigation/PokemonNavigation';
import { getColorsByPokemonType } from '@/utils';
import { notFound } from 'next/navigation';

interface PokemonDetailPageProps {
  params: {
    id: string;
  };
}
export default async function PokemonDetailPage({
  params,
}: PokemonDetailPageProps) {
  const { id } = params;
  const pokemon = await fetchPokemonByNameOrId(id);

  if (!pokemon) {
    return notFound();
  }

  let background;

  if (pokemon) {
    background = getColorsByPokemonType(pokemon.types[0].type.name).background;
    if (pokemon.types.length >= 2) {
      background = `linear-gradient(
          to right,
          ${
            getColorsByPokemonType(pokemon.types[0].type.name).backgroundColor
          } 50%,
          ${
            getColorsByPokemonType(pokemon.types[1].type.name).backgroundColor
          } 50%
      )`;
    }
  }

  return (
    <div
      className="flex items-center justify-center min-h-screen flex-col"
      style={{ background }}
    >
      <PokemonNavigation currentId={+id} />
      <PokemonDetailCard pokemon={pokemon} />
    </div>
  );
}
