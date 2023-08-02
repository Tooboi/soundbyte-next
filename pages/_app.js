import Head from 'next/head';
import 'tailwindcss/tailwind.css';

function App({ Component, pageProps }) {

  return (
    <>
      <Head>
        <title>SoundByte</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
        <Component {...pageProps} />
    </>
  );
}
export default App;