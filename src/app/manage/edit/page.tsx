import { authOptions } from "../../api/auth/[...nextauth]/route";
import FormSubmitButton from "@/components/FormSubmitButton";
import CldEditImageWrapper from "@/components/Wrappers/CldEditImageWrapper";
import CldImageWrapper from "@/components/Wrappers/CldImageWrapper";
import { prisma } from "@/lib/db/prisma";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import Avatar from "boring-avatars";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Edit Profile | SoundByte",
};

async function saveProfile(formData: FormData) {
  "use server";

  // - Protect against non logged in user access
  const session = await getServerSession(authOptions);
  console.log(session);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/upload");
  }

  // - Get updated user info from form
  const userEmail = session.user.email || undefined;
  const profilePic = formData.get("profilePic")?.toString();
  const userName = formData.get("username")?.toString();
  const name = formData.get("name")?.toString();

  // - Get userID from User via email
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  // - Update user information in the database
  const updatedUser = await prisma.user.update({
    where: { id: user?.id },
    data: { name, username: userName, profilePic },
  });
}

export default async function ManageEditPage() {
  // - Protect against non logged in user access
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/upload");
  }

  // - Get user info from session
  const userEmail = session.user.email || undefined;
  const profilePic = session.user.profilePic || "";
  const userName = session.user.username || "";
  const name = session.user.name || "";

  const handleFormSubmit = async (event: any) => {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);

    // Call the saveProfile function to update user information
    await saveProfile(formData);

    // Optionally, you can redirect the user to another page after the update
    redirect("/manage");
  };

  return (
    <div>
      <form
      onSubmit={handleFormSubmit}
        className="mx-auto max-w-[856px] rounded-lg border-2 border-stone-700 bg-stone-900 p-6"
      >
        <h1 className="mb-4 w-full text-center text-xl font-medium text-stone-400">
          Edit Profile
        </h1>
        <div className="flex flex-col pb-4 xs:grid xs:grid-cols-8">
          <div className="col-span-3 px-2 pb-4 xs:pb-0 ">
            <div className="rounded-lg border-2 border-stone-700 bg-stone-950/50">
              <div className="p-2">
                <CldEditImageWrapper session={session} />
              </div>
            </div>
          </div>
          <div className="col-span-5 px-2">
            <label htmlFor="name" className="text-stone-400">
              Name
            </label>
            <input
              id="name"
              required
              name="name"
              placeholder={name}
              className="input mb-3 w-full rounded-lg border-2 border-byte-600 bg-stone-950/50 backdrop-blur-sm placeholder:text-stone-600 focus:border-byte-600 focus:ring-2 focus:ring-stone-600 focus:ring-offset-2 focus:ring-offset-stone-950"
            />
            <label htmlFor="username" className="text-stone-400">
              Username
            </label>
            <input
              required
              id="username"
              name="username"
              placeholder={userName || "Add username"}
              className="input mb-3 w-full rounded-lg border-2 border-byte-600 bg-stone-950/50 backdrop-blur-sm placeholder:text-stone-600 focus:border-byte-600 focus:ring-2 focus:ring-stone-600 focus:ring-offset-2 focus:ring-offset-stone-950"
            />
          </div>
        </div>
        <div className="flex w-full flex-col justify-between gap-2 xs:flex-row">
          <Link
            href={"/manage"}
            className="btn mx-auto w-28 rounded-lg border-2 border-byte-700 bg-byte-600 text-byte-200 hover:border-byte-400 hover:bg-byte-700 active:border-byte-800 active:bg-byte-950 active:text-byte-400 xs:mx-0"
          >
            Cancel
          </Link>
          <FormSubmitButton className="btn mx-auto w-56 rounded-lg border-2 border-byte-700 bg-byte-600 text-byte-200 hover:border-byte-400 hover:bg-byte-700 active:border-byte-800 active:bg-byte-950 active:text-byte-400 xs:mx-0">
            Save
          </FormSubmitButton>
        </div>
      </form>
    </div>
  );
}
