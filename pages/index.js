import { useState, useEffect } from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { useSetUser } from "../context/UserContext";
import Navbar from "../components/Navbar/Navbar";
import Flutters from "../components/Flutters/Flutters";
import CreateFlutter from "../components/Flutters/CreateFlutter";
import HeaderSearch from "../components/Header/HeaderSearch";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [flutters, setFlutters] = useState([]);
  const [page, setPage] = useState('Home');
  const setUser = useSetUser();

  useEffect(() => {
    (async () => {
      const getUser = await fetch("/api/user");
      const getUserJson = await getUser.json();
      setUser(getUserJson);

      const getFlutters = await fetch("/api/byte");
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

export const getServerSideProps = withPageAuthRequired();