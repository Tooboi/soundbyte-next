import Image from "next/image";
import Link from "next/link";
import UserMenuButton from "./UserMenuButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import LogoOrange from "@/assets/LogoOrange.svg";


export default async function Navbar() {
  const session = await getServerSession(authOptions);
  

  return (
      <nav className="fixed top-0 z-50 w-full border-b-2 border-stone-700 bg-stone-800/70 backdrop-blur-md">
        <div className="px-3 py-2 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <Link href="/" className="ms-2 flex md:me-24">
                <Image
                  priority
                  src={LogoOrange}
                  alt="SoundByte"
                  className="mr-4 h-10 w-full"
                />
                <h1 className="self-center whitespace-nowrap text-xl font-semibold text-stone-300 sm:text-2xl">
                  SoundByte
                </h1>
              </Link>
            </div>
            <UserMenuButton session={session} />
          </div>
        </div>
      </nav>
  );
}
