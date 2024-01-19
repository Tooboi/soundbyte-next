import { prisma } from "@/lib/db/prisma"
import { notFound } from "next/navigation"
import CldImageWrapper from "@/components/CldImageWrapper";

interface BytePageProps {
    params: {
        id: string,
    }
}

export default async function BytePage(
    {params: {id}} : BytePageProps
) {
    const byte = await prisma.byte.findUnique({where: {id}})
    if (!byte) notFound();

    return(
        <div className="flex flex-col">
            <CldImageWrapper
            src={byte.imageFile}
            alt={byte.songName}
            sizes="100vw"
            width={256}
            height={256}
            aspectRatio="1:1"
            crop="fill"
            className="aspect-square"
          ></CldImageWrapper>
            <h1>{byte.songName}</h1>
            <h1>{byte.artist}</h1>
            <p>{byte.description}</p>
            <audio src={byte.audioFile} controls ></audio>
        </div>
    )
}