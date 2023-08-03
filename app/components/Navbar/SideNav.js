import { RocketLaunchIcon, WrenchScrewdriverIcon, UserGroupIcon, UserIcon, RectangleGroupIcon, PlusIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import Image from 'next/image';
import { auth } from '@clerk/nextjs';

import UserButton from '../Buttons/UserButton';
import UserTab from '../Buttons/UserTab';
import SignOutButton from '../Buttons/SignOutButton';
import LogoOrange from '../../../public/images/LogoText.svg';

const SideNav = () => {
  const { userId } = auth();

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-stone-800/80 backdrop-blur-md border-b-2 border-stone-700">
        <div className="px-3 py-2 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <Link href="/" className="flex ml-2 md:mr-24">
                <Image priority src={LogoOrange} alt="SoundByte" className="h-10 w-full mr-4" />
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
      <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-[4.2rem] md:w-64 h-screen mt-14 pt-4 bg-stone-800 border-r-2 border-stone-700 dark:bg-stone-800 dark:border-stone-700 transition-transform" aria-label="Sidebar">
        <div className="h-full px-3 pb-4 overflow-y-auto bg-stone-800 dark:bg-stone-800">
          {!userId && (
            <>
              <ul className="space-y-2 font-medium hidden md:block">
                <li>
                  <Link href="/discover" className="flex items-center p-2 text-stone-300 rounded-lg dark:text-white hover:bg-stone-600 active:bg-stone-700 transition invisible md:visible group">
                    <RocketLaunchIcon className="h-6 w-6 text-stone-400 group-hover:text-byte-500" />
                    <span className="ml-3 group-hover:text-stone-200 ">Discover</span>
                  </Link>
                </li>
              </ul>
              <ul className="space-y-2 font-medium md:hidden block">
                <li>
                  <Link href="/discover" className="flex items-center p-2 text-stone-300 rounded-lg dark:text-white hover:bg-stone-600 active:bg-stone-700 transition group">
                    <RocketLaunchIcon className="h-6 w-6 text-stone-400 group-hover:text-byte-500" />
                  </Link>
                </li>
              </ul>
            </>
          )}
          {userId && (
            <>
              <ul className="space-y-2 font-medium hidden md:block">
              
                <li>
                  <Link href="/discover" className="flex items-center p-2 text-stone-300 rounded-lg dark:text-white hover:bg-stone-600 active:bg-stone-700 transition invisible md:visible group">
                    <RocketLaunchIcon className="h-6 w-6 text-stone-400 group-hover:text-byte-500" />
                    <span className="ml-3 group-hover:text-stone-200 ">Discover</span>
                  </Link>
                </li>
                <li>
                  <Link href="/library" className="flex items-center p-2 text-stone-300 rounded-lg hover:bg-stone-600 active:bg-stone-700 transition invisible md:visible group">
                    <RectangleGroupIcon className="h-6 w-6 text-stone-400 group-hover:text-byte-500" />
                    <span className="ml-3 group-hover:text-stone-200 ">Library</span>
                  </Link>
                </li>
                <li>
                  <button type="button" class="w-full px-2 py-2 text-byte-300 inline-flex items-center bg-transparent hover:bg-byte-500 border border-byte-400 hover:border-byte-500 active:border-byte-600 focus:ring-0 active:outline-none active:bg-byte-600 rounded-lg text-center group transition">
                    <PlusIcon className="h-6 w-6 text-byte-300 group-hover:text-stone-100 group-active:text-stone-200" />
                    <span className="ml-3 group-hover:text-stone-100 group-active:text-stone-200">Upload</span>
                  </button>
                </li>
              </ul>
              <ul className="space-y-2 font-medium md:hidden block">
                <li>
                  <Link href="/discover" className="flex items-center p-2 text-stone-300 rounded-lg dark:text-white hover:bg-stone-600 active:bg-stone-700 transition group">
                    <RocketLaunchIcon className="h-6 w-6 text-stone-400 group-hover:text-byte-500" />
                  </Link>
                </li>
                <li>
                  <Link href="/library" className="flex items-center p-2 text-stone-300 rounded-lg dark:text-white hover:bg-stone-600 active:bg-stone-700 transition group">
                    <RectangleGroupIcon className="h-6 w-6 text-stone-400 group-hover:text-byte-500" />
                  </Link>
                </li>
                <li>
                  <button type="button" class="w-full px-2 py-2 text-byte-300 inline-flex items-center bg-transparent hover:bg-byte-500 border border-byte-400 hover:border-byte-500 active:border-byte-600 focus:ring-0 active:outline-none active:bg-byte-600 rounded-lg text-center group transition">
                    <PlusIcon className="h-6 w-6 text-byte-300 group-hover:text-stone-100 group-active:text-stone-200" />
                  </button>
                </li>
              </ul>
            </>
          )}
          {!userId && (
            <>
              <ul className="pt-4 mt-4 space-y-2 font-medium border-t-2 border-stone-700 dark:border-stone-700 hidden md:block">
                <li>
                  <Link href="/sign-up" className="flex items-center p-2 text-stone-300 rounded-lg dark:text-white hover:bg-stone-600 active:bg-stone-700 transition invisible md:visible group">
                    <UserGroupIcon className="h-6 w-6 text-stone-400 group-hover:text-byte-500" />
                    <span className="ml-3 group-hover:text-stone-200">Sign Up</span>
                  </Link>
                </li>
                <li>
                  <Link href="/sign-in" className="flex items-center p-2 text-stone-300 rounded-lg dark:text-white hover:bg-stone-600 active:bg-stone-700 transition invisible md:visible group">
                    <UserIcon className="h-6 w-6 text-stone-400 group-hover:text-byte-500" />
                    <span className="ml-3 group-hover:text-stone-200">Sign In</span>
                  </Link>
                </li>
              </ul>
              <ul className="pt-4 mt-4 space-y-2 font-medium border-t-2 border-stone-700 dark:border-stone-700 md:hidden block">
                <li>
                  <Link href="/sign-up" className="flex items-center p-2 text-stone-300 rounded-lg dark:text-white hover:bg-stone-600 active:bg-stone-700 transition group">
                    <UserGroupIcon className="h-6 w-6 text-stone-400 group-hover:text-byte-500" />
                  </Link>
                </li>
                <li>
                  <Link href="/sign-in" className="flex items-center p-2 text-stone-300 rounded-lg dark:text-white hover:bg-stone-600 active:bg-stone-700 transition group">
                    <UserIcon className="h-6 w-6 text-stone-400 group-hover:text-byte-500" />
                  </Link>
                </li>
              </ul>
            </>
          )}
          {userId && (
            <>
              <ul className="pt-4 mt-4 space-y-2 font-medium border-t-2 border-stone-700 dark:border-stone-700 hidden md:block">
              <li>
                  <Link href="/profile" className="flex items-center p-2 text-stone-300 rounded-lg dark:text-white hover:bg-stone-600 active:bg-stone-700 transition invisible md:visible group">
                    <UserTab />
                  </Link>
                </li>
                <li>
                  <Link href="/manage" className="flex items-center p-2 text-stone-300 rounded-lg dark:text-white hover:bg-stone-600 active:bg-stone-700 transition group">
                    <WrenchScrewdriverIcon className="h-6 w-6 text-stone-400 group-hover:text-byte-500" />
                    <span className="ml-3 group-hover:text-stone-200">Manage Account</span>
                  </Link>
                </li>
                <li>
                  <SignOutButton />
                </li>
              </ul>
              <ul className="pt-4 mt-4 space-y-2 font-medium border-t-2 border-stone-700 dark:border-stone-700 md:hidden block">
                <li>
                  <Link href="/manage" className="flex items-center p-2 text-stone-300 rounded-lg dark:text-white hover:bg-stone-600 active:bg-stone-700 transition group">
                    <WrenchScrewdriverIcon className="h-6 w-6 text-stone-400 group-hover:text-byte-500" />
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
