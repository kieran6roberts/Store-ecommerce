import { useLazyQuery } from "@apollo/client";
import { Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import * as React from "react";

import Filter from "@/components/Filter/Filter";
import Layout from "@/components/Layout/Layout";
import Products from "@/components/Products/Products";
import Sort from "@/components/Sort/Sort";
import { PRODUCT_ALL, PRODUCT_NEW } from "@/queries/products";

const Store: NextPage = () => {

  const [ sortProducts, setSortProducts ] = React.useState({});

  const [ handleAscPrice, { loading: sortLoading, data: sortData }] = useLazyQuery(PRODUCT_NEW, {
    onCompleted: data => setSortProducts(data)
  });

  console.log(sortProducts)

  return (
    <Layout>
      <Flex 
      justify="center"
      mb={12}
      >
        <Sort handleAscPrice={handleAscPrice} />
        <Filter />
      </Flex>
      <Products 
      loadMore={true} 
      query={PRODUCT_ALL} 
      variables={{ 
        variables: { 
          offset: 0, 
          limit: 10
        }, 
        fetchPolicy: "cache-first",
        ssr: false
      }}
      />
    </Layout>
  );
};

export default Store;