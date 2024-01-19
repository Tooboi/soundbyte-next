import "./globals.css";
import { Rubik } from "next/font/google";
import SessionProvider from "./SessionProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import Link from "next/link";
import Navbar from "@/components/Navbar/Navbar";
import Aside from "@/components/Navbar/Aside"

const rubik = Rubik({ subsets: ["latin"] });

export const metadata = {
  title: "SoundByte",
  caption: "Share your audio with the world",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en"  className="">
      <body className={rubik.className}>
        <SessionProvider>
          <main className="m-auto min-h-screen min-w-[300px] max-w-7xl bg-stone-950 text-stone-300">
            <Navbar />
            <Aside session={session} />
            <div className="ml-16 p-4 md:ml-56">
              <div className="mt-14 rounded-lg ">{children}</div>
            </div>
          </main>
          {/* <Footer /> */}
        </SessionProvider>
      </body>
    </html>
  );
}
