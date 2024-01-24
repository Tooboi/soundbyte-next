import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";
import Avatar from "boring-avatars";
import { CldImage } from "next-cloudinary";
import CldImageWrapper from "@/components/Wrappers/CldImageWrapper";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

interface ManagePageProps {
  params: {
    id: string;
  };
}

export const metadata = {
  title: "Manage | SoundByte",
};

export default async function ManagePage({ params: { id } }: ManagePageProps) {
  // - Protect against non-logged-in user access
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/upload");
  }

  // - Get user info from session
  const userEmail = session.user.email || undefined;
  const profilePic = session.user.profilePic || "";
  const userName = session.user.username || "";
  const name = session.user.name || "";

  return (
    <div className="w-full transition-all lg:pt-12 xl:pt-24">
      <div className="relative mx-auto max-w-[856px] rounded-lg border-2 border-stone-700 bg-stone-900 p-6">
        <h1 className="text-center text-3xl">{name}</h1>
        <h1 className="mb-8 text-center text-xl text-stone-400">
          {userName || "Add a username"}
        </h1>
        <div className="mb-8 flex justify-center">
          {session.user.profilePic !== "" ? (
            <CldImageWrapper
              src={profilePic}
              alt="profilePic"
              sizes="100vw"
              aspectRatio="1:1"
              width={256}
              height={256}
              crop="fill"
              className="overflow-hidden rounded-lg border-2 border-stone-700"
            />
          ) : (
            <div className="overflow-hidden rounded-lg border-2 border-stone-700">
              <Avatar
                size={256}
                name={userEmail || "soundbyte"}
                variant="beam"
                square={true}
                colors={["#eb7633", "#de5617", "#7b2718", "#602216", "#9c3116"]}
              />
            </div>
          )}
        </div>
        <h1 className="text-center text-lg text-stone-400">{userEmail}</h1>
        <Link
          href="/manage/edit"
          className="group absolute right-2 top-2 grid content-center rounded-md border border-stone-500 bg-stone-800 px-1 py-0.5 transition-all hover:border-stone-400 hover:bg-stone-700"
        >
          <div className="flex flex-row">
            <PencilSquareIcon className="mb-0 mr-1 h-4 w-4 text-stone-500 group-hover:text-stone-400" />
            <span className=" mt-0.5 text-xs text-stone-400">Edit</span>
          </div>
        </Link>
      </div>
    </div>
  );
}
