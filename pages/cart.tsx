import { Box, 
  Divider, 
  Flex,
  Heading, 
  Stack,  
  StackDivider,
  Text } from "@chakra-ui/react";
import { NextPage } from "next";
import * as React from "react";

import CartItem from "@/components/Cart/CartItem/CartItem";
import CheckoutCard from "@/components/Cart/CheckoutCard/CheckoutCard";
import Layout from "@/components/Layout/Layout";
import { useStore } from "@/hooks/useStorage";
import { generateItemKey } from "@/utils/generateItemKey";

const Cart: NextPage = () => {
  const { cartStorage } = useStore();

  const mapCartProductstoDOM = () => {
    if (cartStorage.length) {
      return cartStorage.map((product: any) => 
        <li 
        id={product.id}
        key={`${generateItemKey(product.id)}`}>
          <CartItem 
          category={product.category}
          description={product.description}
          name={product.name}
          price={product.price}
          />
        </li>
      );
    } else {
      return <Text fontSize="sm">No items in bag. Get shopping</Text>;
    }
  };

  return (
    <Layout>
      <Box 
      as="section"
      px={2}
      >
        <Heading 
        as="h1"
        fontSize="lg"
        pb={4}
        >
          Items in Your Bag
        </Heading>
        <Divider />
        <Flex 
        direction={["column-reverse", "column-reverse", "column-reverse", "row"]}
        pt={2}
        >
          <Stack 
          as="ul"
          divider={<StackDivider borderColor="blue.200" />}
          flex="3"
          listStyleType="none"
          mr={["0px", "0px", "0px", "0.5rem"]}
          >
           {mapCartProductstoDOM()}
          </Stack>
          <CheckoutCard />
        </Flex>
      </Box>
    </Layout>
  );
};

export default Cart;