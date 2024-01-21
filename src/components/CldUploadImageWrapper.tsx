"use client";

import Avatar from "boring-avatars";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { CldImage, CldUploadButton, CldUploadWidget } from "next-cloudinary";
import { useState } from "react";

type UploadResult = {
  info: {
    public_id: string;
  };
  event: "success";
};

export default function CldUploadImageWrapper() {
  const [imageId, setImageId] = useState("");
  const [buttonClassName, setButtonClassName] = useState(
    "btn-block btn rounded-lg border-2 border-byte-700 bg-byte-600 hover:bg-byte-700 active:border-byte-800 active:bg-byte-950 hover:border-byte-400 active:text-byte-400 text-byte-200"
  );

  return (
    <div className="h-full">
      <CldUploadWidget
        uploadPreset="soundbyte-next"
        options={{
          maxImageFileSize: 5 * 1024 * 1024, // 5 MB
          maxFiles: 1,
          sources: [
            "local",
            "dropbox",
            "google_drive",
            "instagram",
            "unsplash",
          ],
          autoMinimize: true,
        }}
        onSuccess={(result: any) => {
          const publicId = result.info.public_id;
          setImageId(publicId);
          setButtonClassName("hidden");
        }}
        // signatureEndpoint="<Endpoint (ex: /api/sign-cloudinary-params)>"
      >
        {({ open }) => {
          return (
            <button className={buttonClassName} onClick={() => open()}>
              Add Image
            </button>
          );
        }}
      </CldUploadWidget>

      {imageId ? (
        <div className="h-full ">
          <div className=" overflow-hidden">
            <CldImage
              alt="Thumbnail"
              src={imageId}
              width="256"
              height="256"
              crop="fill"
              aspectRatio="1:1"
              sizes="100vw"
              className="mx-auto rounded-lg border-2 border-stone-700"
            />
          </div>
          <input
            required
            placeholder={imageId}
            className="input-disabled input mb-3 hidden w-full rounded-lg border-2 border-byte-500 bg-transparent text-stone-600 backdrop-blur-sm placeholder:text-stone-600 focus:border-byte-600 focus:ring-2 focus:ring-stone-600 focus:ring-offset-2 focus:ring-offset-stone-950"
            name="publicId"
            value={imageId}
          />
        </div>
      ) : (
        <div className="mx-auto mt-2 max-w-[256px] rounded-lg border border-byte-600 bg-byte-950">
          <PhotoIcon className="mx-auto w-full text-byte-800/80" />
          <p className="mt-[-1rem] select-none pb-2 text-center text-xs text-byte-800/80 lg:text-sm">
            Max 5 MB
          </p>
        </div>
      )}
    </div>
  );
}