import { SignUp } from '@clerk/nextjs';
import React from 'react';

const SignUpPage = () => {
  return (
    <>
      <div className="flex flex-row min-h-screen justify-center items-start pt-24">
        <SignUp />
      </div>
    </>
  );
};

export default SignUpPage;
