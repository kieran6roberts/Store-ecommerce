import { ChakraProvider, CSSReset, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import * as React from "react";

const SITE_THEME = {
  colors: {
    brand: {
      300: "#2B5BB0",
      900: "#050B10",
      200: "#91ABC2",
      100: "#E8D0BF"
    }
  }
};

const theme = extendTheme({ SITE_THEME });

const MyApp = ({ Component, pageProps }: AppProps): React.ReactElement => {
  return (
    <ChakraProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default MyApp;
