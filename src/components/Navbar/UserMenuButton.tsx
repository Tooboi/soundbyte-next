"use client";

import Avatar from "boring-avatars";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import CldImageWrapper from "../Wrappers/CldImageWrapper";
import Link from "next/link";

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

interface UserMenuButtonProps {
  session: Session | null;
}

export default function UserMenuButton({ session }: UserMenuButtonProps) {
  const profilePic = session?.user.profilePic || null;
  const email = session?.user.email || null;

  return (
    <div className="dropdown-end dropdown">
      <div className="group" role="button" tabIndex={0}>
        {profilePic !== null ? (
          <CldImageWrapper
            src={profilePic}
            alt="profilePic"
            sizes="100vw"
            aspectRatio="1:1"
            width={36}
            height={36}
            crop="fill"
            tabIndex={0}
            className="h-full overflow-hidden rounded-full border-2 border-stone-700 transition-transform group-hover:scale-105 group-active:scale-100"
          />
        ) : (
          <div className="h-full overflow-hidden rounded-full border-2 border-stone-700 transition-transform group-hover:scale-105 group-active:scale-100">
            <Avatar
              size={36}
              name={email || "soundbyte"}
              variant="beam"
              colors={["#eb7633", "#de5617", "#7b2718", "#602216", "#9c3116"]}
            />
          </div>
        )}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-b-lg menu-sm z-30 mt-2 w-52 border-2 border-stone-700 bg-stone-900 p-2 shadow"
      >
        {session ? (
          <>
            <li className="">
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
            <li className="">
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
          </li>
        )}
      </ul>
    </div>
  );
}
