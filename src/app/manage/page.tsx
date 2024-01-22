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
              className="overflow-hidden rounded-lg"
            />
          ) : (
            <div className="overflow-hidden rounded-lg">
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
        <h1 className="text-center text-lg">{userEmail}</h1>
        <Link
          href="/manage/edit"
          className="group btn-sm btn absolute right-2 top-2 border-stone-500 bg-stone-800 hover:border-stone-400 hover:bg-stone-700"
        >
          <PencilSquareIcon className="mb-0 h-4 w-4 text-stone-500 group-hover:text-stone-400" />
          <span className="mt-0.5">Edit</span>
        </Link>
      </div>
    </div>
  );
}
