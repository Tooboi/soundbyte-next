import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react'
import { ClerkProvider } from '@clerk/nextjs';
export default class _Document extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body className="bg-stone-900 text-stone-200">
          <ClerkProvider>
            <Main />
          </ClerkProvider>
          <NextScript />
        </body>
      </Html>
    );
  }
}
