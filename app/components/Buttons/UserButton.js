import Link from 'next/link';
import { currentUser, auth } from '@clerk/nextjs';
import Image from 'next/image';

export default async function UserButton() {
  const { userId } = auth();
  const user = await currentUser();

  return (
    <>
      <div className="text-stone-200 flex items-center">
        {!userId && <></>}
        {userId && (
          <>
            {/* <Link href="profile" className="text-stone-200 hover:text-stone-300 mr-4 font-medium text-lg">
              {user.username || user.firstName || 'Profile'}
            </Link> */}
            <div className="ml-auto">
              <Image src={user.profileImageUrl} alt={user.username} width={40} height={40} className="rounded-full border-2 border-stone-600" />
            </div>
          </>
        )}
      </div>
    </>
  );
}
