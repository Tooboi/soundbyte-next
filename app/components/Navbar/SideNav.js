import { RocketLaunchIcon, WrenchScrewdriverIcon, UserGroupIcon, UserIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { auth } from '@clerk/nextjs';

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
      <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-[4.2rem] md:w-64 h-screen pt-20 bg-stone-800 border-r-2 border-stone-700 dark:bg-stone-800 dark:border-stone-700 transition-transform" aria-label="Sidebar">
        <div className="h-full px-3 pb-4 overflow-y-auto bg-stone-800 dark:bg-stone-800">
          <ul className="space-y-2 font-medium hidden md:block">
            <li>
              <Link href="/discover" className="flex items-center p-2 text-stone-300 rounded-lg dark:text-white hover:bg-stone-600 dark:hover:bg-stone-700 invisible md:visible group">
                <RocketLaunchIcon className="h-6 w-6 text-stone-400 group-hover:text-brand-500" />
                <span className="ml-3 group-hover:text-stone-200 ">Discover</span>
              </Link>
            </li>
            <li>
              <Link href="/discover" className="flex items-center p-2 text-stone-300 rounded-lg dark:text-white hover:bg-stone-600 dark:hover:bg-stone-700 invisible md:visible group">
                <RocketLaunchIcon className="h-6 w-6 text-stone-400 group-hover:text-brand-500" />
                <span className="ml-3 group-hover:text-stone-200 ">Discover</span>
              </Link>
            </li>
            <li>
              <Link href="/discover" className="flex items-center p-2 text-stone-300 rounded-lg dark:text-white hover:bg-stone-600 dark:hover:bg-stone-700 invisible md:visible group">
                <RocketLaunchIcon className="h-6 w-6 text-stone-400 group-hover:text-brand-500" />
                <span className="ml-3 group-hover:text-stone-200 ">Discover</span>
              </Link>
            </li>
          </ul>
          <ul className="space-y-2 font-medium md:hidden block">
            <li>
              <Link href="/discover" className="flex items-center p-2 text-stone-300 rounded-lg dark:text-white hover:bg-stone-600 dark:hover:bg-stone-700 group">
                <RocketLaunchIcon className="h-6 w-6 text-stone-400 group-hover:text-brand-500" />
              </Link>
            </li>
            <li>
              <Link href="/discover" className="flex items-center p-2 text-stone-300 rounded-lg dark:text-white hover:bg-stone-600 dark:hover:bg-stone-700 group">
                <RocketLaunchIcon className="h-6 w-6 text-stone-400 group-hover:text-brand-500" />
              </Link>
            </li>
            <li>
              <Link href="/discover" className="flex items-center p-2 text-stone-300 rounded-lg dark:text-white hover:bg-stone-600 dark:hover:bg-stone-700 group">
                <RocketLaunchIcon className="h-6 w-6 text-stone-400 group-hover:text-brand-500" />
              </Link>
            </li>
          </ul>
          {!userId && (
            <>
            <ul className="pt-4 mt-4 space-y-2 font-medium border-t-2 border-stone-700 dark:border-stone-700 hidden md:block">
              <li>
                <Link href="/sign-up" className="flex items-center p-2 text-stone-300 rounded-lg dark:text-white hover:bg-stone-600 dark:hover:bg-stone-700 invisible md:visible group">
                  <UserGroupIcon className="h-6 w-6 text-stone-400 group-hover:text-brand-500" />
                  <span className="ml-3 group-hover:text-stone-200">Sign Up</span>
                </Link>
              </li>
              <li>
                <Link href="/sign-in" className="flex items-center p-2 text-stone-300 rounded-lg dark:text-white hover:bg-stone-600 dark:hover:bg-stone-700 invisible md:visible group">
                  <UserIcon className="h-6 w-6 text-stone-400 group-hover:text-brand-500" />
                  <span className="ml-3 group-hover:text-stone-200">Sign In</span>
                </Link>
              </li>
            </ul>
            <ul className="pt-4 mt-4 space-y-2 font-medium border-t-2 border-stone-700 dark:border-stone-700 md:hidden block">
              <li>
                <Link href="/sign-up" className="flex items-center p-2 text-stone-300 rounded-lg dark:text-white hover:bg-stone-600 dark:hover:bg-stone-700 group">
                  <UserGroupIcon className="h-6 w-6 text-stone-400 group-hover:text-brand-500" />
                </Link>
              </li>
              <li>
                <Link href="/sign-in" className="flex items-center p-2 text-stone-300 rounded-lg dark:text-white hover:bg-stone-600 dark:hover:bg-stone-700 group">
                  <UserIcon className="h-6 w-6 text-stone-400 group-hover:text-brand-500" />
                </Link>
              </li>
            </ul>
            </>
          )}
          {userId && (
            <>
            <ul className="pt-4 mt-4 space-y-2 font-medium border-t-2 border-stone-700 dark:border-stone-700 hidden md:block">
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
            <ul className="pt-4 mt-4 space-y-2 font-medium border-t-2 border-stone-700 dark:border-stone-700 md:hidden block">
              <li>
                <Link href="/manage" className="flex items-center p-2 text-stone-300 rounded-lg dark:text-white hover:bg-stone-600 dark:hover:bg-stone-700 group">
                  <WrenchScrewdriverIcon className="h-6 w-6 text-stone-400 group-hover:text-brand-500" />
                </Link>
              </li>
              <li>
                <SignOutButton />
              </li>
            </ul>
            </>
          )}
        </div>
      </aside>
    </>
  );
};

export default SideNav;
