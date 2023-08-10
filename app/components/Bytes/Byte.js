import Avatar from 'boring-avatars';
import { PlayCircleIcon } from '@heroicons/react/24/solid';
import Image from 'next/image';
import React from 'react';

const Byte = ({ byteData }) => {
  const { songName, imageFile, audioFile, artist, likers, tags, comments } = byteData;
  return (
    <div className="border-2 border-stone-700 p-2 my-1 rounded-md flex flex-row gap-2">
      <div className="border-2 border-stone-700 rounded-md overflow-hidden min-w-[100px]">
        {/* <Image src={imageFile} alt='Image' width={100} height={100}></Image> */}
        <Avatar size={100} name={songName} variant="marble" square={true} colors={['#e9713a', '#f59e0b', '#d97706', '#92400e']} />
      </div>
      <div className="p-2 rounded-md w-full">
        <div className="flex flex-row justify-between">
          <div className="flex flex-row gap-2">
            <div>
              <PlayCircleIcon className="h-[36px] w-[36px] text-byte-500" />
            </div>
            <div>
              <p className="text-xs text-stone-400">{artist}</p>
              <p className="text-sm text-stone-200">{songName}</p>
            </div>
          </div>
          <div className=''>
            <p className='bg-stone-800 rounded-full px-2'>#tag {tags}</p>
          </div>
        </div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Byte;
