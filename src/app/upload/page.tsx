import FormSubmitButton from "@/components/FormSubmitButton";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { CldImage, CldUploadButton, CldUploadWidget } from "next-cloudinary";
import CldUploadImageWrapper from "@/components/CldUploadImageWrapper";
import CldUploadAudioWrapper from "@/components/CldUploadAudioWrapper";

export const metadata = {
  title: "Upload | SoundByte",
};

// - Upload function
async function uploadByte(formData: FormData) {
  "use server";

  // - Protect against non logged in user access
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/upload");
  }

  // - Get user email from session
  const userEmail = session.user?.email || undefined;

  // - Get userID from User via email
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  // - Collect form inputs
  const songName = formData.get("songName")?.toString();
  const artist = formData.get("artist")?.toString();
  const description = formData.get("description")?.toString();
  const imageFile = formData.get("publicId")?.toString();
  const audioFile = formData.get("audioFile")?.toString();
  // const cldPublicId = formData.get("publicId")?.toString();

  // - Check for empty inputs
  if (!songName || !artist || !description || !imageFile || !audioFile) {
    throw Error("Missing required fields");
  }

  // - Create DB entry and grab the byte id
  const createdByte = await prisma.byte.create({
    data: { songName, artist, description, imageFile, audioFile },
  });
  const createdByteId = createdByte.id;
  // console.log(createdByteId);

  // - Update user's bytes array
  await prisma.user.update({
    where: { id: user?.id },
    data: { bytes: { connect: [{ id: createdByteId }] } },
  });

  redirect("/discover");
}

export default async function Upload() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/upload");
  }

  return (
    <div className="w-full xl:pt-24 lg:pt-12 transition-all">
      

      <form action={uploadByte} className="max-w-[856px] mx-auto border-2 border-stone-700 rounded-lg p-6 bg-stone-900">
      {/* <h1 className="text-center w-full mb-4 text-xl font-medium text-stone-400">Upload New Byte</h1> */}
        <div>
          <div className="flex flex-col pb-4 xs:grid xs:grid-cols-8">
            <div className="col-span-3 px-2 pb-4 xs:pb-0 ">
              <div className="rounded-lg border-2 border-stone-700 bg-stone-950/50">
                <div className="p-2">
                  <CldUploadImageWrapper />
                </div>
              </div>
            </div>
            <div className="col-span-5 px-2">
              <input
                required
                name="songName"
                placeholder="Title"
                className="input mb-3 w-full rounded-lg border-2 border-byte-600 bg-stone-950/50 backdrop-blur-sm placeholder:text-stone-600 focus:border-byte-600 focus:ring-2 focus:ring-stone-600 focus:ring-offset-2 focus:ring-offset-stone-950"
              />
              <input
                required
                name="artist"
                placeholder="Artist TEMP"
                className="input mb-3 w-full rounded-lg border-2 border-byte-600 bg-stone-950/50 backdrop-blur-sm placeholder:text-stone-600 focus:border-byte-600 focus:ring-2 focus:ring-stone-600 focus:ring-offset-2 focus:ring-offset-stone-950"
              />
              <textarea
                required
                name="description"
                placeholder="Description"
                className="mb-3 w-full rounded-lg  border-2 border-byte-600 bg-stone-950/50 backdrop-blur-sm placeholder:text-stone-600 focus:border-byte-600 focus:ring-2 focus:ring-stone-600 focus:ring-offset-2 focus:ring-offset-stone-950"
              />
              <div>
                <CldUploadAudioWrapper />
              </div>
            </div>
          </div>

          <FormSubmitButton className="text-byte-200">Upload</FormSubmitButton>
        </div>
      </form>
    </div>
  );
}
