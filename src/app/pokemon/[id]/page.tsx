import { fetchPokemonByNameOrId } from '@/actions';
import BadgeType from '@/components/BadgeType/BadgeType';
import PokemonNavigation from '@/components/PokemonNavigation/PokemonNavigation';
import StatItem from '@/components/StatItem/StatItem';
import { getColorsByPokemonType } from '@/utils';
import Image from 'next/image';
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
  let background;

  if (!pokemon) {
    return notFound();
  }

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
      <div className="p-4 mx-auto bg-gray-200 rounded-lg shadow-md lg:p-8 border border-black">
        <div className="flex flex-col items-center space-y-4">
          <h1 className="text-2xl font-semibold capitalize text-center">
            {pokemon?.name}
          </h1>
        </div>

        {pokemon?.sprites?.other['official-artwork'].front_default && (
          <Image
            src={pokemon?.sprites?.other['official-artwork'].front_default}
            alt={pokemon?.name}
            width={256}
            height={256}
          />
        )}

        <div className="flex items-center justify-center mt-2 gap-1">
          {pokemon?.types.map((type, index) => (
            <BadgeType type={type.type.name} key={index} />
          ))}
        </div>

        <div className="flex flex-row justify-center items-start space-x-6 mt-4">
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-semibold text-gray-600 mb-2">Height</h2>
            <p className="text-sm">{pokemon?.height! / 10}m</p>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-semibold text-gray-600 mb-2">Weight</h2>
            <p className="text-sm">{pokemon?.weight! / 10}kg</p>
          </div>
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-semibold text-gray-600 mb-2">
              Abilities
            </h2>
            {pokemon?.abilities.map((item, index) => (
              <p key={index} className="text-sm capitalize">
                {item.ability.name.replace('-', ' ')}
              </p>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <h2 className="text-sm font-semibold text-gray-600">Stats</h2>
          {pokemon?.stats.map((item, index) => (
            <StatItem
              key={index}
              item={item}
              type={pokemon.types[0].type.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}