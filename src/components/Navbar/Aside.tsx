"use client";

import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";

import {
  RocketLaunchIcon,
  HomeIcon,
  GlobeAltIcon,
  Cog8ToothIcon,
  ArrowRightStartOnRectangleIcon,
  RectangleStackIcon,
  WrenchScrewdriverIcon,
  AdjustmentsHorizontalIcon,
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
      className="fixed left-0 top-0 z-40 mt-14 h-screen w-16 border-r-2 border-stone-700 bg-stone-900 pt-4 transition-all md:w-56"
      aria-label="Sidebar"
    >
      <div className="h-full overflow-y-auto bg-stone-900 px-3 pb-4">
        <ul className="flex min-h-full flex-col items-stretch font-medium">
          {user ? (
            // - Logged in
            <>
              <li className="pb-2">
                <Link
                  href="/discover"
                  className="text group flex items-center rounded-lg p-2 text-stone-300 transition hover:bg-stone-800 active:bg-stone-900"
                >
                  <GlobeAltIcon className="h-6 w-6 text-stone-400 group-hover:text-byte-500" />

                  <span className="ml-3 hidden group-hover:text-stone-200 md:flex">
                    Discover
                  </span>
                </Link>
              </li>
              <li className="pb-4">
                <Link
                  href="/library"
                  className="text group flex items-center rounded-lg p-2 text-stone-300 transition hover:bg-stone-800 active:bg-stone-900"
                >
                  <RectangleStackIcon className="h-6 w-6 text-stone-400 group-hover:text-byte-500" />
                  <span className="ml-3 hidden group-hover:text-stone-200 md:flex">
                    Library
                  </span>
                </Link>
              </li>
              <li className="border-t-2 border-stone-700 pt-6">
                <Link
                  href="/upload"
                  className="group inline-flex w-full items-center rounded-lg border border-byte-400 bg-transparent px-2 py-[0.35rem] text-center text-byte-300 transition hover:border-byte-500 hover:bg-byte-500 focus:ring-0 active:border-byte-600 active:bg-byte-600 active:outline-none"
                >
                  <PlusIcon className="h-6 w-6 text-byte-300 group-hover:text-stone-100 group-active:text-stone-200" />
                  <span className="ml-3 hidden group-hover:text-stone-200 md:flex">
                    Upload
                  </span>
                </Link>
              </li>
              <li className="flex flex-1 "></li>
              <li className="pb-2">
                <Link
                  href="/manage"
                  className="text group flex items-center rounded-lg p-2 text-stone-300 transition hover:bg-stone-800 active:bg-stone-900"
                >
                  <AdjustmentsHorizontalIcon className="h-6 w-6 text-stone-400 group-hover:text-byte-500" />
                  <span className="ml-3 hidden group-hover:text-stone-200 md:flex">
                    Settings
                  </span>
                </Link>
              </li>
              <li className="mb-12">
                <button
                  onClick={() => signOut({ callbackUrl: "/" })}
                  className="text group flex w-full items-center rounded-lg p-2 text-stone-300 transition hover:bg-stone-800 active:bg-stone-900"
                >
                  <ArrowRightStartOnRectangleIcon className="h-6 w-6 text-stone-400 group-hover:text-byte-500" />

                  <span className="ml-3 hidden group-hover:text-stone-200 md:flex">
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
                  className="text group flex items-center rounded-lg p-2 text-stone-300 transition hover:bg-stone-800 active:bg-stone-900"
                >
                  <RocketLaunchIcon className="h-6 w-6 text-stone-400 group-hover:text-byte-500" />

                  <span className="ml-3 hidden group-hover:text-stone-200 md:flex">
                    Discover
                  </span>
                </Link>
              </li>
              <li>
                <button
                  onClick={() => signIn()}
                  className="text group flex w-full items-center rounded-lg p-2 text-stone-300 transition hover:bg-stone-800 active:bg-stone-900 "
                >
                  <UserIcon className="h-6 w-6 text-stone-400 group-hover:text-byte-500 " />

                  <span className="ml-3 hidden group-hover:text-stone-200 md:flex">
                    Sign In
                  </span>
                </button>
                {/* <Link
                  href="/auth/signin"
                  className="text group invisible flex items-center rounded-lg p-2 text-stone-300 transition hover:bg-stone-800 active:bg-stone-900 md:visible"
                >
                  <UserIcon className="h-6 w-6 text-stone-400 group-hover:text-byte-500" />

                  <span className="ml-3 group-hover:text-stone-200 ">
                    Sign In
                  </span>
                </Link> */}
                {/* <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signIn(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))}
    </> */}
              </li>
            </>
          )}
        </ul>
      </div>
    </aside>
  );
}
