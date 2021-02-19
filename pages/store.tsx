import { useLazyQuery, useQuery } from "@apollo/client";
import { Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import * as React from "react";

import Filter from "@/components/Filter/Filter";
import Layout from "@/components/Layout/Layout";
import Products from "@/components/Products/Products";
import Sort from "@/components/Sort/Sort";
import { GET_CATEGORY,
  PRODUCT_ALL, 
  PRODUCT_CATEGORIES, 
  PRODUCT_SORT } from "@/queries/products";
 
const Store: NextPage = () => {

  const [ sortProducts, setSortProducts ] = React.useState([]);

  const { data: categories, error, loading: loadingCategories } = useQuery(PRODUCT_CATEGORIES);

  const [ handleAscPrice, { loading: sortError }] = useLazyQuery(PRODUCT_SORT, {
    fetchPolicy: "no-cache",
    onCompleted: data => setSortProducts(data),
  });
  
  const [ handleCategoryFilter, { loading: filterLoading }] = useLazyQuery(GET_CATEGORY, {
    fetchPolicy: "no-cache",
    onCompleted: data => setSortProducts(data),
  });

  if (loadingCategories) {
    return <Flex>Loading Products</Flex>;
  }

  return (
    <Layout>
      <Flex 
      justify="center"
      mb={12}
      >
        <Sort handleAscPrice={handleAscPrice} />
        <Filter categories={categories ?? []} handleCategoryFilter={handleCategoryFilter} />
      </Flex>
      <Products 
      products={sortProducts}
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