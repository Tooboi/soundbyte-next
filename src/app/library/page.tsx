import { prisma } from "@/lib/db/prisma";
import { notFound, redirect } from "next/navigation";
import CldImageWrapper from "@/components/Wrappers/CldImageWrapper";
import { getServerSession } from "next-auth";
import ByteCard from "@/components/ByteCard";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const metadata = {
  title: "Library | SoundByte",
};

export default async function Library() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/upload");
  }

  const userId = session.user.id;

  // Fetch bytes for the current user
  const userBytes = await prisma.byte.findMany({
    where: {
      userId: userId,
    },
    orderBy: { id: "desc" },
  });

  return (
    <div className="mx-auto flex max-w-4xl flex-col">
      <div className="px-4 pb-4 pt-2">
        <h1 className="px-4 text-2xl">My Bytes</h1>
        {userBytes.length > 0 ? (
          userBytes.map((byte) => <ByteCard byte={byte} key={byte.id} />)
        ) : (
          <div className="px-4 pb-4 pt-2">
            <p className="px-4 text-xl text-center">Nothing to see here. Upload a new byte!</p>
          </div>
        )}
      </div>
    </div>
  );
}
