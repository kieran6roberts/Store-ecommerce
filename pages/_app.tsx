import { ApolloProvider } from "@apollo/client";
import { ChakraProvider, CSSReset } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import * as React from "react";

import StorageProvider from "@/hooks/useStorage";
import { useApollo } from "@/lib/apolloClient";

const MyApp = ({ Component, pageProps }: AppProps): React.ReactElement => {
  const apolloClient = useApollo(pageProps.initialApolloState);
  
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider>
        <StorageProvider>
          <CSSReset />
          <Component {...pageProps} />
        </StorageProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
};

export default MyApp;
