import React from 'react'

const Byte = ({ byteData }) => {
    const { songName, imageFile, audioFile, artist, likers, tags, comments } = byteData;
  return (
    <div className='border-2 border-stone-700 p-2 my-1 rounded-md'>
        <h1>{songName}</h1>
        <h2>{artist}</h2>
    </div>
  )
}

export default Byte