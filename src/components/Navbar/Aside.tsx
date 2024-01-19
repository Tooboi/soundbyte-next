"use client";

import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";

import {
  RocketLaunchIcon,
  ArrowRightStartOnRectangleIcon,
  RectangleStackIcon,
  WrenchScrewdriverIcon,
  UserGroupIcon,
  UserIcon,
  RectangleGroupIcon,
  PlusIcon,
} from "@heroicons/react/24/solid";

interface AsideProps {
  session: Session | null;
}

export default function Aside({ session }: AsideProps) {
  const user = session?.user;
  return (
    <aside
      id="logo-sidebar"
      className="fixed left-0 top-0 z-40 mt-14 h-screen w-[4rem] border-r-2 border-stone-700 bg-stone-900 pt-4 transition-all md:w-56"
      aria-label="Sidebar"
    >
      <div className="h-full overflow-y-auto bg-stone-900 px-3 pb-4">
        <ul className="space-y-2 font-medium">
          {user ? (
            // - Logged in
            <>
              <li>
                <Link
                  href="/discover"
                  className="text group invisible flex items-center rounded-lg p-2 text-stone-300 transition hover:bg-stone-800 active:bg-stone-900 md:visible"
                >
                  <RocketLaunchIcon className="h-6 w-6 text-stone-400 group-hover:text-byte-500" />

                  <span className="ml-3 group-hover:text-stone-200 ">
                    Discover
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/library"
                  className="text group invisible flex items-center rounded-lg p-2 text-stone-300 transition hover:bg-stone-800 active:bg-stone-900 md:visible"
                >
                  <RectangleGroupIcon className="h-6 w-6 text-stone-400 group-hover:text-byte-500" />
                  <span className="ml-3 group-hover:text-stone-200 ">
                    Library
                  </span>
                </Link>
              </li>
              <li>
                <Link
                  href="/upload"
                  className="group inline-flex w-full items-center rounded-lg border border-byte-400 bg-transparent px-2 py-2 text-center text-byte-300 transition hover:border-byte-500 hover:bg-byte-500 focus:ring-0 active:border-byte-600 active:bg-byte-600 active:outline-none"
                >
                  <PlusIcon className="h-6 w-6 text-byte-300 group-hover:text-stone-100 group-active:text-stone-200" />
                  <span className="ml-3 group-hover:text-stone-100 group-active:text-stone-200">
                    Upload
                  </span>
                </Link>
                {/* <button type="button" className="w-full px-2 py-2 text-byte-300 inline-flex items-center bg-transparent hover:bg-byte-500 border border-byte-400 hover:border-byte-500 active:border-byte-600 focus:ring-0 active:outline-none active:bg-byte-600 rounded-lg text-center group transition"></button> */}
              </li>
              <li>
                <Link
                  href="/manage"
                  className="text group invisible flex items-center rounded-lg p-2 text-stone-300 transition hover:bg-stone-800 active:bg-stone-900 md:visible"
                >
                  <WrenchScrewdriverIcon className="h-6 w-6 text-stone-400 group-hover:text-byte-500" />
                  <span className="ml-3 group-hover:text-stone-200 ">
                    Settings
                  </span>
                </Link>
              </li>
              <li>
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text group invisible flex w-full items-center rounded-lg p-2 text-stone-300 transition hover:bg-stone-800 active:bg-stone-900 md:visible"
                >
                  <ArrowRightStartOnRectangleIcon className="h-6 w-6 text-stone-400 group-hover:text-byte-500" />

                  <span className="ml-3 group-hover:text-stone-200 ">
                    Sign Out
                  </span>
                </button>
              </li>
            </>
          ) : (
            // - logged out
            <>
              <li>
                <Link
                  href="/discover"
                  className="text group invisible flex items-center rounded-lg p-2 text-stone-300 transition hover:bg-stone-800 active:bg-stone-900 md:visible"
                >
                  <RocketLaunchIcon className="h-6 w-6 text-stone-400 group-hover:text-byte-500" />

                  <span className="ml-3 group-hover:text-stone-200 ">
                    Discover
                  </span>
                </Link>
              </li>
              <li>
                <button
                  onClick={() => signIn()}
                  className="text group invisible flex w-full items-center rounded-lg p-2 text-stone-300 transition hover:bg-stone-800 active:bg-stone-900 md:visible"
                >
                  <UserIcon className="h-6 w-6 text-stone-400 group-hover:text-byte-500" />

                  <span className="ml-3 group-hover:text-stone-200 ">
                    Sign In
                  </span>
                </button>
              </li>
            </>
          )}
        </ul>
      </div>
    </aside>
  );
}
