"use client";

import { GlobeAltIcon } from "@heroicons/react/20/solid";

export default function ErrorPage() {
  return (
    <div className="flex w-full">
      <div className="mx-auto flex flex-col pt-24">
        <p className="text-center text-xl text-stone-400">Oops our bad</p>
        <GlobeAltIcon className="mx-auto h-24 w-24 text-stone-700" />
        <p className="text-xenter text-xl text-stone-400">
          Please refresh the page
        </p>
      </div>
    </div>
  );
}
