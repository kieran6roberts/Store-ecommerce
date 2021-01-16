import { Button, Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import * as React from "react";

import Filter from "@/components/Filter/Filter";
import Layout from "@/components/Layout/Layout";
import Products from "@/components/Products/Products";
import Sort from "@/components/Sort/Sort";
import { PRODUCT_ALL } from "@/queries/products";

const Store: NextPage = () => {
  return (
    <Layout user={null}>
      <Flex 
      justify="center"
      mb={12}
      >
        <Sort />
        <Filter />
      </Flex>
      <Products 
      loadMore={true} 
      query={PRODUCT_ALL} 
      variables={{ variables: { offset: 0, limit: 0}}}
      />
    </Layout>
  );
};

export default Store;