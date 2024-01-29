"use client";

import Avatar from "boring-avatars";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import CldImageWrapper from "../Wrappers/CldImageWrapper";
import Link from "next/link";

import {
  ArrowRightStartOnRectangleIcon,
  AdjustmentsHorizontalIcon,
  UserIcon,
} from "@heroicons/react/24/solid";

interface UserMenuButtonProps {
  session: Session | null;
}

export default function UserMenuButton({ session }: UserMenuButtonProps) {
  const profilePic = session?.user.profilePic || null;
  const email = session?.user.email || null;
  const username = session?.user.username || null;

  return (
    <div className="dropdown-end dropdown drop-shadow-lg">
      <div className="" role="button" tabIndex={0}>
        {profilePic !== null ? (
          <CldImageWrapper
            src={profilePic}
            alt="profilePic"
            sizes="100vw"
            aspectRatio="1:1"
            width={40}
            height={40}
            crop="fill"
            tabIndex={0}
            className="h-[40px] w-[40px] overflow-hidden rounded-full border-2 border-stone-700 transition-transform hover:scale-105 active:scale-100"
          />
        ) : (
          <div className="h-[40px] w-[40px] overflow-hidden rounded-full border-2 border-stone-700 transition-transform hover:scale-105 active:scale-100">
            <Avatar
              size={40}
              name={email || "soundbyte"}
              variant="beam"
              colors={["#eb7633", "#de5617", "#7b2718", "#602216", "#9c3116"]}
            />
          </div>
        )}
      </div>
      {session ? (
        <ul
          tabIndex={0}
          role="list"
          className="dropdown-content menu menu-sm z-30 mt-2 w-52 rounded-b-lg border-2 border-stone-700 bg-stone-900 p-2 shadow "
        >
          <li className="group rounded-lg transition-all hover:bg-stone-800 active:bg-stone-900 active:ring-2 active:ring-inset active:ring-stone-700">
            <Link
              href="/manage"
              className="z-30 flex items-center rounded-lg p-2 text-stone-300 transition group-hover:bg-stone-800 group-active:bg-stone-900"
              role="button"
            >
              <AdjustmentsHorizontalIcon className="h-6 w-6 text-stone-400 group-hover:text-byte-500" />
              <span className="ml-3 flex group-hover:text-stone-200">
                Manage
              </span>
            </Link>
          </li>
          <li className="group mb-2 rounded-lg transition-all hover:bg-stone-800 active:bg-stone-900 active:ring-2 active:ring-inset active:ring-stone-700">
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text  flex w-full items-center rounded-lg p-2 text-stone-300 transition "
            >
              <ArrowRightStartOnRectangleIcon className="h-6 w-6 text-stone-400 group-hover:text-byte-500" />

              <span className="ml-3 flex group-hover:text-stone-200">
                Sign Out
              </span>
            </button>
          </li>
          {username ? (
            <li className="flex w-full select-none border-t-2 border-stone-700 pb-2 pt-3 text-center text-sm">
              {username}
            </li>
          ) : (
            <></>
          )}
        </ul>
      ) : (
        <ul
          tabIndex={0}
          role="list"
          className="dropdown-content menu menu-sm z-30 mt-2 w-52 rounded-b-lg border-2 border-stone-700 bg-stone-900 p-2 shadow "
        >
          <li className="group rounded-lg transition-all hover:bg-stone-800 active:bg-stone-900 active:ring-2 active:ring-inset active:ring-stone-700">
            <button
              onClick={() => signIn()}
              className="text flex w-full items-center rounded-lg p-2 text-stone-300 transition active:bg-stone-900 group-hover:bg-stone-800"
            >
              <UserIcon className="h-6 w-6 text-stone-400 group-hover:text-byte-500 " />

              <span className="ml-3 hidden group-hover:text-stone-200 md:flex">
                Sign In
              </span>
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
