import { ApolloProvider } from "@apollo/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import * as React from "react";

import StorageProvider from "@/hooks/useStorage";
import { useApollo } from "@/lib/apolloClient";

const config = {
    initialColorMode: "light",
    useSystemColorMode: true
};

export const theme = extendTheme({ 
  config,
  styles: {
    global: {
      a: {
        fontSize: "sm",
      }
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: "bold",
        borderRadius: "md",
      },
      defaultProps: {
        variant: "outline"
      }
    },
    IconButton: {
      baseStyle: {
        border: "1px solid pink"
      }
    },
  }
});

const MyApp = ({ Component, pageProps }: AppProps): React.ReactElement => {
  const apolloClient = useApollo(pageProps.initialApolloState);
  
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider resetCSS={true} theme={theme}>
        <StorageProvider>
          <Component {...pageProps} />
        </StorageProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
};

export default MyApp;
