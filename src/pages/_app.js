import Header from "@components/common/header";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ApolloProvider } from "@apollo/client";
import { client } from "src/graphql/client";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [dark, setDark] = useState(true);

  return (
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
