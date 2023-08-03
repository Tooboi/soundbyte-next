import Link from 'next/link';
import { UserButton, currentUser, auth } from '@clerk/nextjs';

export default async function Navbar() {
  const { userId } = auth();
  const user = await currentUser();
  console.log(userId);

  return (
    <>
      <nav className="bg-stone-800 py-4 px-6 flex items-center justify-between mb-5">
        <div className="flex items-center">
          <Link href="/">
            <div className="text-lg font-bold text-brand-500">SoundByte</div>
          </Link>
        </div>
        <div className="text-stone-200 flex items-center">
          {!userId && (
            <>
              <Link href="sign-in" className="text-stone-200 hover:text-stone-300 mr-4">
                Login
              </Link>
              <Link href="sign-up" className="text-stone-200 hover:text-stone-300 mr-4">
                Sign Up
              </Link>
            </>
          )}
          { userId && (
            <Link href='profile' className='text-stone-200 hover:text-stone-300 mr-4'>{user.username || user.firstName || 'Profile'}</Link>
          )}
          <div className='ml-auto'>
            <UserButton afterSignOutUrl='/' 
              userprofileMode='navigation'
            />
          </div>
        </div>
      </nav>
    </>
  );
};
