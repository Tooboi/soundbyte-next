import { useState } from 'react';
import Head from 'next/head';
import { UserProvider } from '@auth0/nextjs-auth0';
import { UserProvider as AtlasUserProvider } from '../context/UserContext';
import 'tailwindcss/tailwind.css';

export default function App(props) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>SoundByte</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <UserProvider>
        <AtlasUserProvider>
          <Component {...pageProps} />
        </AtlasUserProvider>
      </UserProvider>
    </>
  );
}
