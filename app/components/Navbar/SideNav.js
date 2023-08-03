import { RocketLaunchIcon, WrenchScrewdriverIcon, UserGroupIcon, UserIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { currentUser, auth } from '@clerk/nextjs';
import React from 'react';

import UserButton from '../Buttons/UserButton';
import SignOutButton from '../Buttons/SignOutButton';

const SideNav = () => {
  const { userId } = auth();

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-stone-800 border-b-2 border-stone-700 dark:bg-stone-800 dark:border-stone-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-stone-500 rounded-lg sm:hidden hover:bg-stone-100 focus:outline-none focus:ring-2 focus:ring-stone-200 dark:text-stone-400 dark:hover:bg-stone-700 dark:focus:ring-stone-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z" />
                </svg>
              </button>
              <Link href="/" className="flex ml-2 md:mr-24">
                <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="FlowBite Logo" />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap  text-stone-300 dark:text-white">SoundByte</span>
              </Link>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ml-3">
                <div className="ml-auto">
                  <UserButton afterSignOutUrl="/" showName="true" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-stone-800 border-r-2 border-stone-700 sm:translate-x-0 dark:bg-stone-800 dark:border-stone-700" aria-label="Sidebar">
        <div className="h-full px-3 pb-4 overflow-y-auto bg-stone-800 dark:bg-stone-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link href="/discover" className="flex items-center p-2 text-stone-300 rounded-lg dark:text-white hover:bg-stone-600 dark:hover:bg-stone-700 group">
                <RocketLaunchIcon className="h-6 w-6 text-stone-400 group-hover:text-brand-500" />
                <span className="ml-3 group-hover:text-stone-200">Discover</span>
              </Link>
            </li>
            <li>
              <Link href="/discover" className="flex items-center p-2 text-stone-300 rounded-lg dark:text-white hover:bg-stone-600 dark:hover:bg-stone-700 group">
                <RocketLaunchIcon className="h-6 w-6 text-stone-400 group-hover:text-brand-500" />
                <span className="ml-3 group-hover:text-stone-200">Discover</span>
              </Link>
            </li>
            <li>
              <Link href="/discover" className="flex items-center p-2 text-stone-300 rounded-lg dark:text-white hover:bg-stone-600 dark:hover:bg-stone-700 group">
                <RocketLaunchIcon className="h-6 w-6 text-stone-400 group-hover:text-brand-500" />
                <span className="ml-3 group-hover:text-stone-200">Discover</span>
              </Link>
            </li>
          </ul>
          {!userId && (
            <ul className="pt-4 mt-4 space-y-2 font-medium border-t-2 border-stone-700 dark:border-stone-700">
              <li>
                <Link href="/sign-up" className="flex items-center p-2 text-stone-300 rounded-lg dark:text-white hover:bg-stone-600 dark:hover:bg-stone-700 group">
                  <UserGroupIcon className="h-6 w-6 text-stone-400 group-hover:text-brand-500" />
                  <span className="ml-3 group-hover:text-stone-200">Sign Up</span>
                </Link>
              </li>
              <li>
                <Link href="/sign-in" className="flex items-center p-2 text-stone-300 rounded-lg dark:text-white hover:bg-stone-600 dark:hover:bg-stone-700 group">
                  <UserIcon className="h-6 w-6 text-stone-400 group-hover:text-brand-500" />
                  <span className="ml-3 group-hover:text-stone-200">Sign In</span>
                </Link>
              </li>
            </ul>
          )}
          {userId && (
            <ul className="pt-4 mt-4 space-y-2 font-medium border-t-2 border-stone-700 dark:border-stone-700">
              <li>
                <Link href="/manage" className="flex items-center p-2 text-stone-300 rounded-lg dark:text-white hover:bg-stone-600 dark:hover:bg-stone-700 group">
                  <WrenchScrewdriverIcon className="h-6 w-6 text-stone-400 group-hover:text-brand-500" />
                  <span className="ml-3 group-hover:text-stone-200">Manage Account</span>
                </Link>
              </li>
              <li>
                <SignOutButton />
              </li>
            </ul>
          )}
        </div>
      </aside>
    </>
  );
};

export default SideNav;
