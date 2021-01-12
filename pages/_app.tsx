import { ChakraProvider, CSSReset, extendTheme, theme } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import * as React from "react";

const SITE_THEME = {
  ...theme,
  colors: {
    ...theme.colors,
    brand: {
      100: "#E8D0BF",
      200: "#91ABC2",
      300: "#2B5BB0",
      400: "#050B10",
    }
  }
};

const CustomTheme = extendTheme({ SITE_THEME });

function MyApp({ Component, pageProps }: AppProps): React.ReactElement {
  return (
    <ChakraProvider theme={CustomTheme}>
      <CSSReset />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
