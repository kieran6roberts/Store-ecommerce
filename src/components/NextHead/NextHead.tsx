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
        </Head>
    );
}

export default NextHead;
