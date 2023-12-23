import Image from 'next/image';
import Link from 'next/link';

const Navbar = () => {
  return (
    <header className="bg-[#212121] border-b-5 border-[#111]">
      <nav className="flex flex-row flex-wrap justify-between items-center gap-1 p-6 md:px-10 lg:px-40">
        <div className="flex justify-center items-center">
          <Link href="/" aria-label="Go to Home">
            <div className="flex justify-center items-end border-b-2 border-transparent hover:border-[#fbc418] transition duration-400">
              <Image
                src="/images/pokedex.png"
                width={160}
                height={60}
                alt="Pokédex logo"
              />
            </div>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;