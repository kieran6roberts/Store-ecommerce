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
      },
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
  },
  breakpoints: {
    sm: "30em",
    md: "50em",
    lg: "74em",
    xl: "100em",
    xxl: "140em",
  },
  fontSizes: {
    xs: "clamp(0.7rem, 1vw, 1rem)",
    sm: "clamp(0.85rem, 1.1vw, 1.3rem)",
    md: "clamp(1.1rem, 1.4vw, 1.6rem)",
    lg: "clamp(2rem, 3vw, 3rem)",
    xl: "clamp(2.4rem, 3.2vw, 3.3rem)"
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
