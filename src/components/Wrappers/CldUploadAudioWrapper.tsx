"use client";

import { CldUploadWidget } from "next-cloudinary";
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
  const sizes = ["B", "KB", "MB"];

  if (fileSize === 0) return "0 B";

  const i = Math.floor(Math.log(fileSize) / Math.log(1024));
  const formattedSize = (fileSize / Math.pow(1024, i)).toFixed(1);

  // Check if the decimal part is .0, and remove it in that case
  const formattedSizeWithoutDecimal = formattedSize.endsWith(".0")
    ? formattedSize.split(".")[0]
    : formattedSize;

  return `${formattedSizeWithoutDecimal} ${sizes[i]}`;
}

export default function CldUploadAudioWrapper() {
  const [original_filename, setOriginal_filename] = useState("");
  const [secureUrl, setSecureUrl] = useState("");
  const [fileSize, setFileSize] = useState<number>(0);
  const [buttonClassName, setButtonClassName] = useState(
    "btn btn-block block mr-4 rounded-lg border-2 border-byte-700 bg-byte-600 hover:bg-byte-700 active:border-byte-800 active:bg-byte-950 hover:border-byte-400 active:text-byte-400 text-byte-200"
  );
  // const [buttonClassName, setButtonClassName] = useState(
  //   "btn btn-block block mr-4 rounded-lg border text-byte-300 border-byte-300 hover:bg-byte-950 active:bg-byte-900"
  // );

  const [ruleClassName, setRuleClassName] = useState(
    "select-none pt-2 text-xs text-stone-600 lg:text-sm"
  );
  const [divClassName, setDivClassName] = useState("flex w-full flex-col");
  const maxFileSize = 26250000; // 25MB in B

  return (
    <div className="flex w-full">
      <div className={divClassName}>
        <CldUploadWidget
          uploadPreset="soundbyte-next-audio"
          options={{
            maxVideoFileSize: maxFileSize,
            maxFiles: 1,
            sources: ["local", "dropbox", "google_drive"],
            autoMinimize: true,
          }}
          onSuccess={(result: any) => {
            const original_filename = result.info.original_filename;
            const secureUrl = result.info.secure_url;
            const fileSize = result.info.bytes;

            setOriginal_filename(original_filename);
            setSecureUrl(secureUrl);
            setFileSize(fileSize);
            setButtonClassName("hidden");
            setRuleClassName("hidden");
            setDivClassName("flex");
          }}
        >
          {({ open }) => {
            return (
              <button className={buttonClassName} onClick={() => open()}>
                Add Audio
              </button>
            );
          }}
        </CldUploadWidget>
        <div className="flex justify-between px-0 md:px-2">
          <p className={ruleClassName}>Max {formatBytes(maxFileSize)}</p>
          <p className={ruleClassName}>MP3 - FLAC - WAV</p>
        </div>
      </div>

      {original_filename ? (
        <div className="flex flex-1 flex-col">
          <input
            required
            placeholder="Audio File"
            className="input-disabled input mb-3 hidden w-full select-none rounded-lg border-2 border-byte-500 bg-transparent text-stone-600 backdrop-blur-sm placeholder:text-stone-600 focus:border-byte-600 focus:ring-2 focus:ring-stone-600 focus:ring-offset-2 focus:ring-offset-stone-950"
            name="audioFile"
            value={secureUrl}
          />
          <h1 className="lg:text-md select-none pt-2 text-sm text-stone-400">
            {original_filename}
          </h1>
          <h2 className="select-none pt-2 text-xs text-stone-600 lg:text-sm">
            {formatBytes(fileSize)}
          </h2>
        </div>
      ) : (
        <>
          {/* <div className="w-full rounded-lg border-2 border-byte-500"></div> */}
        </>
      )}
    </div>
  );
}
