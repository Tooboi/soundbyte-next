import React from 'react'
import { currentUser, auth } from '@clerk/nextjs';

export default async function ProfilePage() {
    const user = await currentUser();
  return (
    <>
    <h1 className='text-2xl font-bold mb-5'>{user.username}</h1>
    <p className='mb-5'>welcome to the profile page</p>
</>
  )
}
