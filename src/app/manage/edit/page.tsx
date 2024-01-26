import { authOptions } from "../../api/auth/[...nextauth]/route";
import FormSubmitButton from "@/components/FormSubmitButton";
import CldEditImageWrapper from "@/components/Wrappers/CldEditImageWrapper";
import { prisma } from "@/lib/db/prisma";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

export const metadata = {
  title: "Edit Profile | SoundByte",
};

async function ValidateUsername(formData: FormData): Promise<boolean> {
  "use server";

  // - Protect against non logged in user access
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/upload");
  }

  // - Get updated user info from form and session
  const userEmail = session.user.email || undefined;
  const userName = formData.get("username")?.toString();
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  const existingUser = await prisma.user.findFirst({
    // Exclude the current user and find first record with matching username
    where: { username: userName, id: { not: user?.id } },
  });
// if (existingUser === null) {return}
  return existingUser === null;
}

async function saveProfile(formData: FormData) {
  "use server";

  // Validate the username
  const isUsernameValid = await ValidateUsername(formData);

  if (isUsernameValid !== true) {
    // console.log("Username is not valid. Aborting save.");
    // const isValid = isUsernameValid;
    // console.log("Username valid: " + isValid);

    return; // Do not proceed with the save if the username is not valid
  }

  // - Protect against non logged in user access
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/upload");
  }

  // - Get updated user info from form and session
  const userEmail = session.user.email || undefined;
  const profilePic = formData.get("profilePic")?.toString();
  const userName = formData.get("username")?.toString();
  const name = formData.get("name")?.toString();

  // - Get userID from User via email
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  // - Check if the form inputs have changed
  const shouldUpdate = (field: string, value: string | undefined) => {
    const userValue = (user as any)[field];
    // Check if the value is not undefined and not an empty string
    return (
      value !== undefined &&
      value.trim() !== "" &&
      value !== (user as any)[field]
    );
  };

  // - Update user information in the database
  const updatedUser = await prisma.user.update({
    where: { id: user?.id },
    data: {
      name: shouldUpdate("name", name) ? name : undefined,
      username: shouldUpdate("username", userName) ? userName : undefined,
      profilePic: shouldUpdate("profilePic", profilePic)
        ? profilePic
        : undefined,
    },
  });

  redirect("/manage");
}

export default async function ManageEditPage({
  isUsernameValid,
}: {
  isUsernameValid: boolean;
}) {
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
                <CldEditImageWrapper session={session} />
              </div>
            </div>
          </div>
          <div className="col-span-5 px-2">
            <label htmlFor="name" className="pl-2 text-stone-400">
              Name
            </label>
            <input
              id="name"
              name="name"
              placeholder={name}
              className="input mb-3 w-full rounded-lg border-2 border-byte-600 bg-stone-950/50 backdrop-blur-sm placeholder:text-stone-600 focus:border-byte-600 focus:ring-2 focus:ring-stone-600 focus:ring-offset-2 focus:ring-offset-stone-950"
            />
            <label htmlFor="username" className="pl-2 text-stone-400">
              Username
            </label>
            <input
              id="username"
              name="username"
              placeholder={userName || "Add username"}
              className="input mb-1 w-full rounded-lg border-2 border-byte-600 bg-stone-950/50 backdrop-blur-sm placeholder:text-stone-600 focus:border-byte-600 focus:ring-2 focus:ring-stone-600 focus:ring-offset-2 focus:ring-offset-stone-950"
            />
            <p className="pl-2 text-xs text-stone-600">
              If username is taken you won&#39;t be able to save
            </p>
            <p className="pl-2 text-xs text-stone-600">
              This will be displayed on your bytes
            </p>
            {/* <UsernameInputWrapper session={session} isValid={isUsernameValid} /> */}
            {/* {isUsernameValid && <p>Username unavailable</p>} */}
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
      <p className="pt-2 text-center text-xs text-stone-600">
        Some details may take a minute to update in the database
      </p>
      <p className="text-center text-xs text-stone-600">
        Refresh page after saving if you don&#39;t see anything
      </p>
    </div>
  );
}
