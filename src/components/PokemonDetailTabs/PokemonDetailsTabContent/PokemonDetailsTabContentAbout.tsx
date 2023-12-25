import { Pokemon } from '@/types';
import { convertPokemonSize } from '@/utils';

interface PokemonDetailsTabContentAboutProps {
  pokemon: Pokemon;
}

export default function PokemonDetailsTabContentAbout({
  pokemon,
}: PokemonDetailsTabContentAboutProps) {
  const { height, weight } = convertPokemonSize({
    height: pokemon.height,
    weight: pokemon.weight,
  });

  return (
    <div>
      <p className="text-xs sm:text-sm mb-2">
        <strong>Height:</strong> {height.feet} ft {height.inches} in
      </p>
      <p className="text-xs sm:text-sm mb-2">
        <strong>Weight:</strong> {weight.kg} kg ({weight.lbs}
        lbs)
      </p>
      <div className="flex items-center text-xs sm:text-sm mb-2 gap-1">
        <strong>Abilities: </strong>
        <div className="flex gap-2 capitalize">
          {pokemon.abilities
            .map((ability) => ability.ability.name.replace('-', ' '))
            .join(', ')}
        </div>
      </div>
    </div>
  );
}
