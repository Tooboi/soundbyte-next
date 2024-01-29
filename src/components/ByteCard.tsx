import { Byte } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";
import CldImageWrapper from "@/components/Wrappers/CldImageWrapper";

interface ByteCardProps {
  byte: Byte;
}

export default function ByteCard({ byte }: ByteCardProps) {
  return (
    <Link
      href={"/bytes/" + byte.id}
      className="card my-2 w-full bg-stone-800/60 rounded-md transition-shadow hover:shadow-xl"
    >
      <div className="flex flex-row rounded-md border-2 border-stone-700 p-2">
        <div className="min-w-[100px] overflow-hidden rounded-md border-2 border-stone-700 ">
          <CldImageWrapper
            src={byte.imageFile}
            alt={byte.songName}
            sizes="100vw"
            width={100}
            height={100}
            aspectRatio="1:1"
            crop="fill"
            className="aspect-square"
          ></CldImageWrapper>
          {/* <Avatar size={100} name={songName} variant="marble" square={true} colors={['#e9713a', '#f59e0b', '#d97706', '#92400e']} /> */}
        </div>
        <div className="w-full rounded-md p-2">
          <div className="flex flex-row justify-between">
            <div className="flex flex-row gap-2">
              <div>
                {/* <PlayCircleIcon className="h-[36px] w-[36px] text-byte-500" /> */}
              </div>
              <div>
                <Link href={"/artist/" + byte.artist}>
                  <p className="text-xs text-stone-400 hover:text-stone-300">
                    {byte.artist}
                  </p>
                </Link>

                <p className="text-sm text-stone-200">{byte.songName}</p>
              </div>
            </div>
            <div className="">
              {/* <p className='bg-stone-800 rounded-full px-2'>#tag {tags}</p> */}
            </div>
          </div>
          <div></div>
          <div></div>
        </div>
      </div>
    </Link>
  );
}
