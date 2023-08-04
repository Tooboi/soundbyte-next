import Link from 'next/link';
import { currentUser, auth } from '@clerk/nextjs';
import Image from 'next/image';

export default async function UserTab() {
  const { userId } = auth();
  const user = await currentUser();

  return (
    <>
      <div className="text-stone-200 flex items-center">
        {!userId && <></>}
        {userId && (
          <>
            <div className="ml-auto">
              <Image src={user.profileImageUrl} alt={user.username} width={24} height={24} className="rounded-full" />
            </div>
            <Link href="profile" className="text-stone-200 hover:text-stone-300 ml-3">
              {user.username || user.firstName || 'Profile'}
            </Link>
          </>
        )}
      </div>
    </>
  );
}
