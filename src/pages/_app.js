import Header from "@components/common/header";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ApolloProvider } from "@apollo/client";
import { client } from "src/graphql/client";
import { useState } from "react";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [dark, setDark] = useState(false);

  return (
    <div className={`${dark && "bg-gray-600 dark"}`}>
      <SessionProvider session={session}>
        <ApolloProvider client={client}>
          <Header setDark={setDark} />
          <Component {...pageProps} />
        </ApolloProvider>
      </SessionProvider>
    </div>
  );
}

export default MyApp;
