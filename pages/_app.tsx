import { ChakraProvider, CSSReset, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import * as React from "react";

const theme = extendTheme({
  components: {
    Button: {
      variants: {
        baseStyle: {
          fontWeight: "bold"
        }
      }
    }
  },
  styles: {
    global: {
      a: {
        color: "blue.300"
      }
    }
  }
});

const MyApp = ({ Component, pageProps }: AppProps): React.ReactElement => {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default MyApp;
