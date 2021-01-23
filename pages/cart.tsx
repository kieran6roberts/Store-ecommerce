import { Box, 
  Divider, 
  Flex,
  Heading, 
  StackDivider,
  VStack  } from "@chakra-ui/react";
import { NextPage } from "next";
import * as React from "react";

import CartItem from "@/components/Cart/CartItem/CartItem";
import CheckoutCard from "@/components/Cart/CheckoutCard/CheckoutCard";
import Layout from "@/components/Layout/Layout";

const Cart: NextPage = () => {
  return (
    <Layout>
      <Box 
      as="section"
      px={2}
      >
        <Heading 
        as="h1"
        fontSize="md"
        pb={4}
        >
          Items in Your Bag
        </Heading>
        <Divider />
        <Flex 
        direction={["column", "column", "column", "row"]}
        pt={2}
        >
          <VStack 
          as="ul"
          divider={<StackDivider borderColor="blue.200" />}
          flex="2"
          >
            <CartItem />
          </VStack>
          <CheckoutCard />
        </Flex>
      </Box>
    </Layout>
  );
};

export default Cart;