import { useLazyQuery, useQuery } from "@apollo/client";
import { 
  Box,
  Flex, 
  Heading, 
  Text } from "@chakra-ui/react";
import { NextPage } from "next";
import * as React from "react";

import Filter from "@/components/Filter/Filter";
import Layout from "@/components/Layout/Layout";
import Products, { IProductQuery } from "@/components/Products/Products";
import Sort from "@/components/Sort/Sort";
import { GET_CATEGORY,
  PRODUCT_ALL, 
  PRODUCT_CATEGORIES, 
  PRODUCT_SORT } from "@/queries/products";

 
const Store: NextPage = () => {

  const [ sortProducts, setSortProducts ] = React.useState<{ products: IProductQuery[] | [] } | []>([]);

  const { data: categories, error, loading: loadingCategories } = useQuery(PRODUCT_CATEGORIES);

  const [ handleAscPrice, { loading: sortError }] = useLazyQuery(PRODUCT_SORT, {
    fetchPolicy: "no-cache",
    onCompleted: data => setSortProducts(data)
  });
  
  const [ handleCategoryFilter, { loading: filterLoading }] = useLazyQuery(GET_CATEGORY, {
    fetchPolicy: "no-cache",
    onCompleted: data => setSortProducts(data)
  });

  if (loadingCategories) {
    return <Flex>Loading Products</Flex>;
  }

  return (
    <Layout>
      <Box 
      as="header"
      mb={8}
      textAlign="center"
      >
        <Heading 
        as="h1"
        mb={6}
        >
          Welcome to our store!
        </Heading>
        <Text 
        maxW="800px"
        mx="auto"
        >
          Our focus is to bring you the very best in the world of coffee. Everything from
          fresh coffee beans, the best coffee powders and capsules as well as other miscellaneous
          items such as cups and mugs. Take a look to see if anything takes your fancy.
        </Text>
      </Box>
      <Flex 
      justify="center"
      mb={12}
      >
        <Sort handleAscPrice={handleAscPrice} />
        <Filter 
        categories={categories ?? []} 
        handleCategoryFilter={handleCategoryFilter} 
        />
      </Flex>
      {sortProducts.products?.length === 0 ? 
      <Text 
      color="pink.100"
      textAlign="center"
      >
        No Products Matching this search
      </Text>
      :
      <Products 
      sortProducts={sortProducts}
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
    }
    </Layout>
  );
};

export default Store;