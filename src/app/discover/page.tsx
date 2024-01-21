import ByteCard from "@/components/ByteCard";
import PaginationBar from "@/components/PaginationBar";
import { prisma } from "@/lib/db/prisma";

interface HomeProps {
  searchParams: { page: string };
}

export const metadata = {
  title: "Discover | SoundByte",
};

export default async function Discover({
  searchParams: { page = "1" },
}: HomeProps) {
  const currentPage = parseInt(page);

  const pageSize = 12;
  const heroItemCount = 0;

  const totalItemCount = await prisma.byte.count();

  const totalPages = Math.ceil((totalItemCount - heroItemCount) / pageSize);

  const bytes = await prisma.byte.findMany({
    orderBy: { id: "desc" },
    skip:
      (currentPage - 1) * pageSize + (currentPage === 1 ? 0 : heroItemCount),
    take: pageSize + (currentPage === 1 ? heroItemCount : 0),
  });

  return (
    <div className="flex flex-col max-w-4xl mx-auto">
      {bytes.map((byte) => (
        <ByteCard byte={byte} key={byte.id} />
      ))}

      <div className="flex w-full pt-4">
        {totalPages > 1 && (
          <PaginationBar currentPage={currentPage} totalPages={totalPages} />
        )}
      </div>
    </div>
  );
}
