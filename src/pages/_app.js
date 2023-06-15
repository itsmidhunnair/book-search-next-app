import Header from "@components/common/header";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ApolloProvider } from "@apollo/client";
import { client } from "src/graphql/client";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/router";
import Loader from "@components/common/loader";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [dark, setDark] = useState(true);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    const start = () => {
      console.log("start");
      setLoading(true);
    };
    const end = () => {
      console.log("finished");
      setLoading(false);
    };
    router.events.on("routeChangeStart", start);
    router.events.on("routeChangeError", end);
    router.events.on("routeChangeComplete", end);
    return () => {
      router.events.off("routeChangeStart", start);
      router.events.off("routeChangeComplete", end);
      router.events.off("routeChangeError", end);
    };
  }, [router]);

  return loading ? (
    <Loader />
  ) : (
    <>
      {dark && (
        <style jsx global>
          {`
            body {
              background: #4b5563;
            }
          `}
        </style>
      )}

      <div className={`${dark && "dark bg-gray-600"} h-full pb-5`}>
        <SessionProvider session={session}>
          <ApolloProvider client={client}>
            <ToastContainer
              position="top-center"
              autoClose={2000}
              hideProgressBar
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss={false}
              draggable
              pauseOnHover
              theme="light"
            />
            <Header setDark={setDark} dark={dark} />
            <Component {...pageProps} />
          </ApolloProvider>
        </SessionProvider>
      </div>
    </>
  );
}

export default MyApp;
