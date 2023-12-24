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
    <div className="flex  justify-between items-center w-full p-4 md:px-6 lg:px-8">
      <div className="flex-1 flex justify-center">
        <Link href={`/pokemon/${getPreviousId()}`}>
          <Button disabled={currentId === 1}>Previous</Button>
        </Link>
      </div>
      <div className="flex-1 flex justify-center">
        <Link href={`/`}>
          <Button>Go back</Button>
        </Link>
      </div>
      <div className="flex-1 flex justify-center">
        <Link href={`/pokemon/${getNextId()}`}>
          <Button disabled={currentId === maxId}>Next</Button>
        </Link>
      </div>
    </div>
  );
}
