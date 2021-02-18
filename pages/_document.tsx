import { ColorModeScript} from "@chakra-ui/react";
import Document, { DocumentContext, 
  Head, 
  Html, 
  Main, 
  NextScript } from "next/document";
import * as React from "react";

import { theme } from "@/pages/_app";

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head />
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
