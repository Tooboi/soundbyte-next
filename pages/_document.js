import Document, { Head, Html, Main, NextScript } from 'next/document';

export default class _Document extends Document {


  render() {
    return (
      <Html>
        <Head />
        <body className='bg-stone-900 text-stone-200'>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}