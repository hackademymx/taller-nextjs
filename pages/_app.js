import "../styles/globals.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  useEffect(() => {
    const handleStart = (url) => {
      setError(false);
      url !== router.pathname ? setLoading(true) : setLoading(false);
    };
    const handleComplete = () => {
      setError(false);
      setLoading(false);
    };
    const handleError = () => {
      setError(true);
      setLoading(false);
    };
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleError);
  }, [router]);
  // return <>{loading ? <h1>Cargando...</h1> : <Component {...pageProps} />}</>;
  if (loading) {
    return <h1>Cargando...</h1>;
  } else if (error) {
    return <h1>Error</h1>;
  } else {
    return <Component {...pageProps} />;
  }
}

export default MyApp;
