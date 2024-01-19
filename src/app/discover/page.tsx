import ByteCard from "@/components/ByteCard";
import { prisma } from "@/lib/db/prisma";

export default async function Discover() {
  const bytes = await prisma.byte.findMany({
    orderBy: { id: "desc" },
  });
  return (
    <div className="flex flex-col">
      {bytes.map((byte) => (
        <ByteCard byte={byte} key={byte.id} />
      ))}
    </div>
  );
}
