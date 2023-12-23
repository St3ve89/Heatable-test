import Link from 'next/link';
import Button from '../Button/Button';

interface PokemonNavigationProps {
  currentId: number;
}

export default function PokemonNavigation({
  currentId,
}: PokemonNavigationProps) {
  const maxId = 10277;
  const isAtEndOfMainSequence = currentId === 1025;
  const isAtStartOfExtendedSequence = currentId === 10001;

  const getNextId = () => {
    if (isAtEndOfMainSequence) return 10001;
    return currentId + 1 > maxId ? 1 : currentId + 1;
  };

  const getPreviousId = () => {
    if (isAtStartOfExtendedSequence) return 1025;
    return currentId - 1 < 1 ? maxId : currentId - 1;
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center w-full p-6 md:px-10 lg:px-40 ">
      <Link href={`/pokemon/${getPreviousId()}`}>
        <Button disabled={currentId === 1}>Previous</Button>
      </Link>

      <Link href={`/pokemon/${getNextId()}`}>
        <Button disabled={currentId === maxId}>Next</Button>
      </Link>
    </div>
  );
}
