import Head from "next/head";
import * as React from "react";

interface PAGE_HEAD { 
    title: string, 
    description: string,
    currentURL: string 
}

function NextHead({ 
    title, 
    description, 
    currentURL }: PAGE_HEAD): React.ReactElement {
    return(
        <Head>
            <title key="title">{title}</title>
            <meta charSet="UTF-8" content="text/html" key="charset" />
            <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
            <meta name="description" content={description} key="description" />

            <meta name="twitter:card" content="summary" key="twcard" />
            <meta name="twitter:creator" content="@Kieran6dev" key="twhandle" />

            <meta property="og:title" content={title} key="ogtitle"/>
            <meta property="og:description" content={description} key="ogdescription" />
            <meta property="og:type" content="website" key="ogtype" />
            <meta property="og:url" content={currentURL} key="ogurl" />

            <link rel="apple-touch-icon" sizes="180x180" href="./apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="./favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="./favicon-16x16.png" />
            <link rel="shortcut icon" href="./favicon.ico" />

            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta name="theme-color" content="#ffffff" />
        </Head>
    );
}

export default NextHead;
