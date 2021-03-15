import { ApolloProvider } from "@apollo/client";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import * as React from "react";

import CheckoutDataProvider from "@/hooks/useCheckoutData";
import StorageProvider from "@/hooks/useStorage";
import { useApollo } from "@/lib/apolloClient";

interface IProviders {
    components: React.JSXElementConstructor<React.PropsWithChildren<any>>[];
    children: React.ReactNode;
}

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

const Providers = ({ components, children }: IProviders) => (
    <>
        {components.reduceRight((acc, Comp) => <Comp>{acc}</Comp>, children)}
    </>
);

const MyApp = ({ Component, pageProps }: AppProps): React.ReactElement => {
  const apolloClient = useApollo(pageProps.initialApolloState);
  
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider resetCSS={true} theme={theme}>
        <Providers components={[ CheckoutDataProvider, StorageProvider ]}>
            <Component {...pageProps} />
        </Providers>
      </ChakraProvider>
    </ApolloProvider>
  );
};

export default MyApp;
