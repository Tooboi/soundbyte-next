"use client";

import { CldImage, CldUploadButton, CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

type UploadResult = {
  info: {
    public_id: string;
    bytes: number;
    original_filename: string;
  };
  event: "success";
};

function formatBytes(fileSize: number): string {
  const sizes = ["B", "KB", "MB", "GB", "TB"];

  if (fileSize === 0) return "0 B";

  const i = parseInt(
    Math.floor(Math.log(fileSize) / Math.log(1024)).toString()
  );
  const formattedSize = Math.round(fileSize / Math.pow(1024, i));

  return `${formattedSize} ${sizes[i]}`;
}

export default function CldUploadAudioWrapper() {
  const [original_filename, setOriginal_filename] = useState("");
  const [publicId, setPublicId] = useState("");
  const [fileSize, setFileSize] = useState<number>(0);

  return (
    <div className="flex">
      <CldUploadButton
        className="btn mr-4 rounded-lg border-2 border-byte-700 bg-byte-600 hover:bg-byte-700 active:border-byte-800 active:bg-byte-950"
        uploadPreset="soundbyte-next-audio"
        onSuccess={(result: any) => {
          console.log(result.info);

          const original_filename = result.info.original_filename;
          const publicId = result.info.public_id;
          const fileSize = result.info.bytes;

          setOriginal_filename(original_filename);
          setPublicId(publicId);
          setFileSize(fileSize);
        }}
      >
        Add Audio
      </CldUploadButton>
      {/* <CldUploadWidget
        uploadPreset="soundbyte-next-audio"
        
        onSuccess={(result: any) => {
          console.log(result.info);

          const original_filename = result.info.original_filename;
          const publicId = result.info.public_id;
          const fileSize = result.info.bytes;

          setOriginal_filename(original_filename);
          setPublicId(publicId);
          setFileSize(fileSize);
        }}
      >
        {({ open }) => {
          return (
            <button
              className="btn mr-4 rounded-lg border-2 border-byte-700 bg-byte-600 hover:bg-byte-700 active:border-byte-800 active:bg-byte-950"
              onClick={() => open()}
              
            >
              Add Audio
            </button>
          );
        }}
      </CldUploadWidget> */}

      <>
        {original_filename ? (
          <div className="input-disabled select-none">
            <input
              required
              placeholder="Audio File"
              className="input-disabled input mb-3 hidden w-full select-none rounded-lg border-2 border-byte-500 bg-transparent text-stone-600 backdrop-blur-sm placeholder:text-stone-600 focus:border-byte-600 focus:ring-2 focus:ring-stone-600 focus:ring-offset-2 focus:ring-offset-stone-950"
              name="audioFile"
              value={publicId}
            />
            <h1>{original_filename}</h1>
            <h2>{formatBytes(fileSize)}</h2>
          </div>
        ) : (
          <div className="w-full rounded-lg border-2 border-byte-500"></div>
        )}
      </>
    </div>
  );
}
