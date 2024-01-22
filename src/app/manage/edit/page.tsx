import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import FormSubmitButton from "@/components/FormSubmitButton";
import CldEditImageWrapper from "@/components/Wrappers/CldEditImageWrapper";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function saveProfile(formData: FormData) {
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
}

export default function ManageEditPage() {
  return (
    <div>
      <form
        action={saveProfile}
        className="mx-auto max-w-[856px] rounded-lg border-2 border-stone-700 bg-stone-900 p-6"
      >
        <h1 className="mb-4 w-full text-center text-xl font-medium text-stone-400">
          Edit Profile
        </h1>
        <div className="flex flex-col pb-4 xs:grid xs:grid-cols-8">
          <div className="col-span-3 px-2 pb-4 xs:pb-0 ">
            <div className="rounded-lg border-2 border-stone-700 bg-stone-950/50">
              <div className="p-2">
                <CldEditImageWrapper />
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
          </div>
        </div>
        <FormSubmitButton className="text-byte-200">Save</FormSubmitButton>
      </form>
    </div>
  );
}
