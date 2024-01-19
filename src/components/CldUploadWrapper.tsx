"use client";

import { CldImage, CldUploadButton } from "next-cloudinary";
import { useState } from "react";

type UploadResult = {
  info: {
    public_id: string;
  };
  event: "success";
};

// interface CldUploadWrapperProps {
//   onUploadSuccess: (publicId: string) => void;
// }

export default function CldUploadWrapper() {
  const [imageId, setImageId] = useState("");

  return (
    <div className="">
      <CldUploadButton
        className="btn-block btn rounded-lg border-2 border-byte-700 bg-byte-600 hover:bg-byte-700 active:border-byte-800 active:bg-byte-950"
        uploadPreset="soundbyte-next"
        onSuccess={(result: any) => {
          const publicId = result.info.public_id;
          console.log("publicId: " + publicId);

          setImageId(publicId);
        }}
        // signatureEndpoint="<Endpoint (ex: /api/sign-cloudinary-params)>"
      >
        Upload Image
      </CldUploadButton>
      {imageId && (
        <>
          <div className=" overflow-hidden  pb-2 pt-4">
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
        </>
      )}
    </div>
  );
}
