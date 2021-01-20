import { Heading, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import * as React from "react";

import Layout from "@/components/Layout/Layout";
import Products from "@/components/Products/Products";
import { PRODUCT_STORAGE } from "@/queries/products";
import { getStorage } from "@/utils/storage";

const mapQuery = () => {
    const storage = getStorage("saved-products");
    return storage?.map(product => product.id);
};

const savedProducts: NextPage = () => {
    const queryVariables = mapQuery();

    return (
        <Layout>
            {queryVariables?.length ? 
            <Products 
            loadMore={false}
            query={PRODUCT_STORAGE}
            variables={{ variables: { ids: queryVariables }}}
            />
            :
            <header>
                <Heading 
                fontSize="lg"
                mb={12}
                >
                    Empty
                </Heading>
                <Text fontSize="sm">
                    Saved products will appear here
                </Text>
            </header>
            }
        </Layout>
    );
};

export default savedProducts;