import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Link from "next/link";
import Avatar from "boring-avatars";
import { CldImage } from "next-cloudinary";
import CldImageWrapper from "@/components/Wrappers/CldImageWrapper";

interface ManagePageProps {
  params: {
    id: string;
  };
}

export const metadata = {
  title: "Manage | SoundByte",
};

export default async function ManagePage({ params: { id } }: ManagePageProps) {
  
  // - Protect against non-logged-in user access
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/upload");
  }

  // - Get user email from session
  const userEmail = session.user?.email || undefined;
  const profilePic = session.user.profilePic || "zrijgz9naag2lgxzfu1z";
  
  

  // - Get user based on email
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  // Check if user with the specified ID exists
  if (!user) {
    notFound();
  }

  return (
    <div>
      <h1>{user.name}</h1>
      {session.user.profilePic !== null ? (
        <CldImageWrapper
            src={profilePic}
            alt="profilePic"
            sizes="100vw"
            aspectRatio="1:1"
            width={100}
            height={100}
            crop="fill"
            // className="aspect-square"
          />
      ) : (
        <Avatar
          size={36}
          name={user?.email || "soundbyte"}
          variant="beam"
          colors={["#eb7633", "#de5617", "#7b2718", "#602216", "#9c3116"]}
        />
      )}
      
      <h1>{user.email}</h1>
      <h1>{user.username || "No Username Yet"}</h1>
      <Link href="/manage/edit" className="btn">Edit</Link>
      {/* Use the 'user' variable in your component */}
    </div>
  );
}
