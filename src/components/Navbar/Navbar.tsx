import Link from "next/link";
import UserMenuButton from "./UserMenuButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

import LogoOrange from "@/components/SVG/LogoOrange";

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
    <nav className="h-15 fixed top-0 z-50 w-full border-b-2 border-stone-700 bg-stone-900">
      <div className="py-2 md:pl-1 lg:pr-1">
        <div className="flex items-center justify-between">
          <div className="flex justify-start rtl:justify-end">
            <Link href="/" className="ms-2 flex flex-none">
              <div className="mr-4 h-10 w-full">
                <LogoOrange />
              </div>
              <h1 className="hidden self-center whitespace-nowrap text-xl font-semibold text-stone-300 sm:text-2xl md:flex ">
                SoundByte
              </h1>
            </Link>
          </div>
          <form action={searchProducts} className="flex justify-center">
            <div className="form-control">
              <input
                name="searchQuery"
                placeholder="Search"
                className="input h-[2.5rem] w-[200px] border-2 border-stone-700 bg-transparent placeholder-stone-500 backdrop-blur-sm sm:w-full "
              />
            </div>
          </form>
          <div className="mr-2 grid w-[40px] h-[40px] content-center">
            <UserMenuButton session={session} />
          </div>
        </div>
      </div>
    </nav>
  );
}
