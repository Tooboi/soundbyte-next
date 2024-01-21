"use client";

import Avatar from "boring-avatars";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";

interface UserMenuButtonProps {
  session: Session | null;
}

export default function UserMenuButton({ session }: UserMenuButtonProps) {
  const user = session?.user;

  return (
    // <div className="dropdown-end dropdown">
    <label tabIndex={0} className="min-h-10 min-w-10 h-full">
      {user?.image ? (
        <Image
          src={user?.image}
          alt="Profile picture"
          width={40}
          height={40}
          className="min-h-10 min-w-10 rounded-full"
        />
      ) : (
        <Avatar
          size={40}
          name={user?.name || "SOUNDBYTE"}
          variant="marble"
          colors={["#e9713a", "#db4a1a", "#b93413", "#7d2412"]}
        />
      )}
    </label>
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
