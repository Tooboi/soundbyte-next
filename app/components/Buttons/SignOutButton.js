'use client';

import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/solid';
import { useClerk } from '@clerk/clerk-react';

const SignOutButton = () => {
  const { signOut } = useClerk();

  return (
    <button onClick={() => signOut()} className="flex w-full items-center p-2 text-stone-300 rounded-lg dark:text-white hover:bg-stone-600 dark:hover:bg-stone-700 group">
      <ArrowRightOnRectangleIcon className="h-6 w-6 text-stone-400 group-hover:text-brand-500" />
      <span className="ml-3 group-hover:text-stone-300 hidden md:block">Logout</span>
    </button>
  );
};

export default SignOutButton;
