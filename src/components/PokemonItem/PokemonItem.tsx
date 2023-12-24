import { Pokemon } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import BadgeType from '../BadgeType/BadgeType';

interface PokemonItemProps {
  pokemon: Pokemon;
}

export default function PokemonItem({ pokemon }: PokemonItemProps) {
  const imageUrl =
    pokemon.sprites.other['official-artwork'].front_default ||
    pokemon.sprites.front_default ||
    '/images/placeholder.png';
  return (
    <Link href={`/pokemon/${pokemon.id}`} passHref>
      <div className="flex flex-col items-center justify-center p-4 bg-white border border-gray-300 rounded-lg shadow-md cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
        {imageUrl && (
          <div className="relative w-24 h-24">
            <Image
              src={imageUrl}
              alt={`Image of ${pokemon.name}`}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <span className="text-gray-500 text-sm">#{pokemon.id}</span>
        <h2 className="mt-2 text-lg font-bold capitalize">{pokemon.name}</h2>
        <div className="flex items-center justify-center mt-2 gap-1">
          {pokemon.types.map((type, index) => (
            <BadgeType type={type.type.name} key={index} />
          ))}
        </div>
      </div>
    </Link>
  );
}
