import { Link } from 'next/link';
import React from 'react'

const Navbar = () => {
  return (
    <>
      <nav className="bg-blue-600 py-5 px-6 flex items-center justify-between mb-5">
        <div className="flex items-center">
          <Link href="/" alt="soundbyte">
            <div className="text-lg font-bold text-white">SoundByte</div>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
