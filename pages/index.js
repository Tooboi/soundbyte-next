import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';
import Flutters from '../components/Flutters/Flutters';
import CreateFlutter from '../components/Flutters/CreateFlutter';
import HeaderSearch from '../components/Header/HeaderSearch';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [flutters, setFlutters] = useState([]);
  const [page, setPage] = useState('Home');

  useEffect(() => {
    (async () => {
      const getFlutters = await fetch('/api/soundbyte');
      const getFluttersJson = await getFlutters.json();
      setFlutters(getFluttersJson);

      setIsLoading(false);
    })();
  }, []);

  return (
    <>
      <HeaderSearch />
      <Navbar page={page} setPage={setPage} />
      <CreateFlutter setFlutters={setFlutters} />
      <Flutters flutters={flutters} setFlutters={setFlutters} />
    </>
  );
}
