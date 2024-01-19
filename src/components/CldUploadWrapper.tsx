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
        uploadPreset="soundbyte-next"
        onSuccess={(result: any) => {
          const publicId = result.info.public_id;
          console.log("publicId: " + publicId);
          
          setImageId(publicId);
        }}
        // signatureEndpoint="<Endpoint (ex: /api/sign-cloudinary-params)>"
      />
      {imageId && (
        <>
          <CldImage
            alt="Thumbnail"
            src={imageId}
            width="256"
            height="256"
            sizes="100vw"
          />
          <input
            placeholder={imageId}
            className="input-disabled input text-stone-600 mb-3 w-full rounded-lg border-2 border-byte-500 bg-transparent backdrop-blur-sm placeholder:text-stone-600 focus:border-byte-600 focus:ring-2 focus:ring-stone-600 focus:ring-offset-2 focus:ring-offset-stone-950"
            name="publicId"
            value={imageId}
          />
        </>
      )}
    </div>
  );
}
