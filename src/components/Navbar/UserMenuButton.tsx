"use client";

import Avatar from "boring-avatars";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import CldImageWrapper from "../Wrappers/CldImageWrapper";

interface UserMenuButtonProps {
  session: Session | null;
}

export default function UserMenuButton({ session }: UserMenuButtonProps) {
  const profilePic = session?.user.profilePic || null;
  const email = session?.user.email || null;

  return (
    // <div className="dropdown-end dropdown">
    <>
      {profilePic !== null ? (
        <CldImageWrapper
          src={profilePic}
          alt="profilePic"
          sizes="100vw"
          aspectRatio="1:1"
          width={36}
          height={36}
          crop="fill"
          className="overflow-hidden rounded-full h-full border-2 border-stone-700"
        />
      ) : (
        <Avatar
          size={36}
          name={email || "soundbyte"}
          variant="beam"
          colors={["#eb7633", "#de5617", "#7b2718", "#602216", "#9c3116"]}
        />
      )}
    </>
    // <label tabIndex={0} className="min-h-10 min-w-10 h-full">
    //   <Avatar
    //       size={36}
    //       name={user?.email || "soundbyte"}
    //       variant="beam"
    //       colors={["#eb7633", "#de5617", "#7b2718", "#602216", "#9c3116"]}
    //     />

    //   {/* {user?.image ? (
    //     <Image
    //       src={user?.image}
    //       alt="Profile picture"
    //       width={40}
    //       height={40}
    //       className="min-h-10 min-w-10 rounded-full"
    //     />
    //   ) : (

    //   )} */}
    // </label>
    //   <ul
    //     tabIndex={0}
    //     className="dropdown-content menu rounded-box menu-sm z-30 mt-3 w-52 bg-base-100 p-2 shadow"
    //   >
    //     <li>
    //       {user ? (
    //         <button onClick={() => signOut({ callbackUrl: "/" })}>
    //           Sign Out
    //         </button>
    //       ) : (
    //         <button onClick={() => signIn()}>Sign In</button>
    //       )}
    //     </li>
    //   </ul>
    // </div>
  );
}
