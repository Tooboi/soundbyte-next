import { SignIn } from '@clerk/nextjs';
import React from 'react';

const SignInPage = () => {
  return (
    <>
      <div className='flex flex-row min-h-screen justify-center items-start pt-24'>
        <SignIn />
      </div>
    </>
  );
};

export default SignInPage;
