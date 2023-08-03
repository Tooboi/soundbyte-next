import { UserProfile } from '@clerk/nextjs';

const ProfilePage = () => {
  return (
    <>
      <div className="flex flex-row min-h-screen justify-center items-start">
        <UserProfile
          appearance={{
            elements: {
              navbar: 'hidden xl:block',
              rootBox: '',
              card: 'w-72 sm:w-[29rem] lg:w-[56rem] xl:w-full max-w-max ',
            },
          }}
        />
      </div>
    </>
  );
};

export default ProfilePage;
