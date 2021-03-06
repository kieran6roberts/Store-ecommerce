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
import NextHead from "@/components/NextHead/NextHead";
import Products, { IProductQuery } from "@/components/Products/Products";
import Sort from "@/components/Sort/Sort";
import { initApollo } from "@/lib/apolloClient";
import { 
  GET_CATEGORY,
  PRODUCT_ALL, 
  PRODUCT_CATEGORIES, 
  PRODUCT_SORT } from "@/queries/products";

 
const Store: NextPage = () => {

  const [ sortProducts, setSortProducts ] = React.useState<IProductQuery[] | []>([]);

  const { data: categories } = useQuery(PRODUCT_CATEGORIES);

  const [ handleAscPrice ] = useLazyQuery(PRODUCT_SORT, {
    fetchPolicy: "no-cache",
    onCompleted: data => setSortProducts(data.products)
  });
  
  const [ handleCategoryFilter ] = useLazyQuery(GET_CATEGORY, {
    fetchPolicy: "no-cache",
    onCompleted: data => setSortProducts(data.products)
  });

  React.useEffect(() => {
    const resetCache = async () => {
      const apollo = initApollo();
      await apollo.resetStore();
      return;
    };

    resetCache();
  }, []);


  return (
    <>
    <NextHead 
    currentURL="http://localhost:3000/store" 
    description="Our coffee store housing the freshest and most delicious coffee beans as well as hand crafted mugs & cups" 
    title="Coffee Beans, Mugs & Cups" 
    />
    <Layout>
      <Box 
      as="header"
      mb={8}
      textAlign="center"
      >
        <Heading 
        as="h1"
        fontSize="lg"
        my={{base: 6, xl: 20}}
        >
          Welcome to our store!
        </Heading>
        <Text 
        fontSize="sm"
        maxW="1200px"
        mx="auto"
        mb={{base: 6, xl: 20}}
        >
          Our focus is to bring you the very best in the world of coffee. Everything from
          fresh coffee beans, the best coffee powders and capsules as well as other miscellaneous
          items such as cups and mugs. Take a look to see if anything takes your fancy.
        </Text>
      </Box>
      <Flex 
      justify="center"
      mb={{base: 12, xl: 24}}
      >
        <Sort handleAscPrice={handleAscPrice} />
        <Filter 
        categories={categories ?? { categories: [] } } 
        handleCategoryFilter={handleCategoryFilter} 
        />
      </Flex>
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
        ssr: false,
      }}
      />
    </Layout>
    </>
  );
};

export default Store;