import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import * as React from "react";

const SITE_THEME = {
  brand: {
    pri: "#2B5BB0",
    darker: "#050B10",
    lighter: "#91ABC2",
    acc: "#E8D0BF"
  }
};

const theme = extendTheme({ SITE_THEME });

const MyApp = ({ Component, pageProps }: AppProps): React.ReactElement => {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default MyApp;
