import Link from 'next/link';
import { currentUser, auth } from '@clerk/nextjs';
import Image from 'next/image';

export default async function UserTab() {
  const { userId } = auth();
  const user = await currentUser();

  return (
    <>
      <Link href="/profile" className="flex items-center p-2 text-stone-300 rounded-lg dark:text-white hover:bg-stone-600 active:bg-stone-700 transition group">
        <div className="text-stone-200 flex items-center">
          {!userId && <></>}
          {userId && (
            <>
              <div className="ml-auto">
                <Image src={user.profileImageUrl} alt={user.username} width={24} height={24} className="rounded-full" />
              </div>
              <Link href="profile" className="text-stone-200 hover:text-stone-300 ml-3 hidden md:block">
                {user.username || user.firstName || 'Profile'}
              </Link>
            </>
          )}
        </div>
      </Link>
    </>
  );
}
