import Image from "next/image";
import Link from "next/link";
import UserMenuButton from "./UserMenuButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import LogoOrange from "@/assets/LogoOrange.svg";

async function searchProducts(formData: FormData) {
  "use server";

  const searchQuery = formData.get("searchQuery")?.toString();

  if (searchQuery) {
    redirect("/search?query=" + searchQuery);
  }
}

export default async function Navbar() {
  const session = await getServerSession(authOptions);

  return (
    <nav className="fixed top-0 z-50 w-full border-b-2 border-stone-700 bg-stone-800/70 backdrop-blur-md">
      <div className="px-3 py-2 lg:px-5 lg:pl-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-start rtl:justify-end flex-1">
            <Link href="/" className="ms-2 flex md:me-24">
              <Image
                priority
                src={LogoOrange}
                alt="SoundByte"
                className="mr-4 h-10 w-full"
              />
              <h1 className="self-center whitespace-nowrap text-xl font-semibold text-stone-300 sm:text-2xl hidden sm:flex ">
                SoundByte
              </h1>
            </Link>
          </div>
            <form action={searchProducts}>
              <div className="form-control mr-8">
                <input
                  name="searchQuery"
                  placeholder="Search"
                  className="input justify-end h-[2.5rem] w-full max-w-full border-2 border-stone-700 bg-transparent placeholder-stone-500 backdrop-blur-sm "
                />
              </div>
            </form>
            {/* <UserMenuButton session={session} /> */}
          
          <UserMenuButton session={session} />
        </div>
      </div>
    </nav>
  );
}
