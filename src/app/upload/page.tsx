import FormSubmitButton from "@/components/FormSubmitButton";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { CldImage, CldUploadButton, CldUploadWidget } from "next-cloudinary";
import CldUploadWrapper from "@/components/CldUploadWrapper";

// import CldUploadWrapper from "@/components/CldUploadWrapper";

export const metadata = {
  title: "Upload New Byte",
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

  redirect("/");
}

export default async function Upload() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/upload");
  }

  return (
    <div>
      <h1 className="mx-auto mb-3 text-lg font-bold">Upload New Byte</h1>

      <form action={uploadByte}>
        <input
          required
          name="songName"
          placeholder="Title"
          className="input mb-3 w-full rounded-lg border-2 border-byte-500 bg-transparent backdrop-blur-sm placeholder:text-stone-600 focus:border-byte-600 focus:ring-2 focus:ring-stone-600 focus:ring-offset-2 focus:ring-offset-stone-950"
        />
        <input
          required
          name="artist"
          placeholder="Artist TEMP"
          className="input mb-3 w-full rounded-lg border-2 border-byte-500 bg-transparent backdrop-blur-sm placeholder:text-stone-600 focus:border-byte-600 focus:ring-2 focus:ring-stone-600 focus:ring-offset-2 focus:ring-offset-stone-950"
        />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="mb-3 w-full rounded-lg  border-2 border-byte-500 bg-transparent backdrop-blur-sm placeholder:text-stone-600 focus:border-byte-600 focus:ring-2 focus:ring-stone-600 focus:ring-offset-2 focus:ring-offset-stone-950"
        />
        <CldUploadWrapper />
        <input
          required
          name="audioFile"
          placeholder="Audio File TEMP"
          type="url"
          className="input mb-3 w-full rounded-lg border-2 border-byte-500 bg-transparent backdrop-blur-sm placeholder:text-stone-600 focus:border-byte-600 focus:ring-2 focus:ring-stone-600 focus:ring-offset-2 focus:ring-offset-stone-950"
        />
        {/* <CldUploadWrapper onUploadSuccess={handleUploadSuccess} /> */}
        <FormSubmitButton className="text-byte-200">Upload</FormSubmitButton>
      </form>
    </div>
  );
}
