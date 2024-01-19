import ByteCard from "@/components/ByteCard";
import { prisma } from "@/lib/db/prisma";
import { Metadata } from "next";

interface SearchPageProps {
  searchParams: { query: string };
}

export function generateMetadata({
  searchParams: { query },
}: SearchPageProps): Metadata {
  return {
    title: `Search: ${query} - SoundByte`,
  };
}

export default async function SearchPage({
  searchParams: { query },
}: SearchPageProps) {
  const bytes = await prisma.byte.findMany({
    where: {
      OR: [
        { songName: { contains: query, mode: "insensitive" } },
        { artist: { contains: query, mode: "insensitive" } },
      ],
    },
    orderBy: { id: "desc" },
  });

  if (bytes.length === 0) {
    return <div className="text-center">No bytes found</div>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
      {bytes.map((byte) => (
        <ByteCard byte={byte} key={byte.id} />
      ))}
    </div>
  );
}