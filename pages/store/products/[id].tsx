import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import * as React from "react";

import Layout from "@/components/Layout/Layout";
import { initApollo } from "@/lib/apolloClient";
import { PRODUCT_INFO, PRODUCT_NAMES } from "@/queries/products";

interface IProductName {
    name: string,
    __typename: string
}

const Products: NextPage = ({ initialApolloState }) => {
    console.log(initialApolloState);

    return (
        <Layout user={null}>

        </Layout>
    );
};


export const getStaticPaths: GetStaticPaths = async () => {
    const apolloClient = initApollo();

    const { data: { products }} = await apolloClient.query({
        query: PRODUCT_NAMES
    });

    const paths = products.map((product: IProductName) => ({
        params: { id: encodeURIComponent(product.name)}
    }));

    return { 
        paths,
        fallback: false
    };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const apolloClient = initApollo();

    await apolloClient.query({
        query: PRODUCT_INFO,
        variables: { name: params?.id }
    });

    return {
        props: {
            initialApolloState: apolloClient.cache.extract()
        },
        revalidate: 1
    };
};

export default Products;