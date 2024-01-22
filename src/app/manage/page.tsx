import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { notFound, redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

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
      <h1>{user.email}</h1>
      <h1>{user.username || "No Username Yet"}</h1>
      {/* Use the 'user' variable in your component */}
    </div>
  );
}
