import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";

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
    const imageFile = formData.get("imageFile")?.toString();
    const audioFile = formData.get("audioFile")?.toString();
  
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