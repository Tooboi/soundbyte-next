import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar/Navbar';

export default function Home() {
  //   const [isLoading, setIsLoading] = useState(true);
  //   const [flutters, setFlutters] = useState([]);
    const [page, setPage] = useState("Home");

  //   useEffect(() => {
  //     (async () => {
  //       const getFlutters = await fetch("/api/flutter");
  //       const getFluttersJson = await getFlutters.json();
  //       setFlutters(getFluttersJson);

  //       setIsLoading(false);
  //     })();
  //   }, []);

  return (
    <div>
      {/* <Navbar /> */}
      <div>index</div>
    </div>
  );
}
