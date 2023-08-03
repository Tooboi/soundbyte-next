import Link from 'next/link';
import { currentUser, auth } from '@clerk/nextjs';
import Image from 'next/image';

export default async function Navbar() {
  const { userId } = auth();
  const user = await currentUser();
  console.log(user);

  return (
    <>
      <div className="text-stone-200 flex items-center">
        {!userId && <></>}
        {userId && (
          <>
            <Link href="profile" className="text-stone-200 hover:text-stone-300 mr-4">
              {user.username || user.firstName || 'Profile'}
            </Link>
            <div className="ml-auto">
              <Image src={user.profileImageUrl} alt={user.username} width={32} height={32} className="rounded-full" />
            </div>
          </>
        )}
      </div>
    </>
  );
}
