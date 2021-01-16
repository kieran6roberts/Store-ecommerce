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
            <Products 
            loadMore={false}
            query={PRODUCT_STORAGE}
            variables={{ variables: { ids: queryVariables}}}
            />
        </Layout>
    );
};

export default savedProducts;