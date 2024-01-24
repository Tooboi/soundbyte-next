"use client"

import React, { useState } from 'react';

interface UsernameInputWrapperProps {
  session: any;
  isValid: boolean;
}

export default function UsernameInputWrapper({
    session,
    isValid,
  }: UsernameInputWrapperProps) {
    const userName = session.user?.username || '';
    const [isValidClass, setIsValidClass] = useState("text-red-500")
    if (isValid) {
      setIsValidClass("hidden")
    }

  return (
    <>
      <label htmlFor="username" className="text-stone-400 pl-2">
        Username
      </label>
      <input
        id="username"
        name="username"
        placeholder={userName || 'Add username'}
        className={`input mb-3 w-full rounded-lg border-2 border-byte-600 bg-stone-950/50 backdrop-blur-sm placeholder:text-stone-600 focus:border-byte-600 focus:ring-2 focus:ring-stone-600 focus:ring-offset-2 focus:ring-offset-stone-950 ${
          !isValid ? '' : 'border-amber-600'
        }`}
      />
      
      {isValid == true && (
        <p className={isValidClass}>Username is taken</p>
      )}
    </>
  );
}
