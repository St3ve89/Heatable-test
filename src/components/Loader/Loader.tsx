import Image from 'next/image';

export default function Loader() {
  return (
    <div className="flex flex-col items-center  h-screen">
      <Image
        src={'/images/loading.gif'}
        width={300}
        height={200}
        alt="Pikachu loading"
        priority
      />
      <h3>Loading...</h3>
    </div>
  );
}
