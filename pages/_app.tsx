import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import * as React from "react";

const MyApp = ({ Component, pageProps }: AppProps): React.ReactElement => {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
};

export default MyApp;
