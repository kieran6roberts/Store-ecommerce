import { Box, 
  Divider, 
  Flex,
  Heading, 
  ListItem,
  Stack,  
  StackDivider,  Text  } from "@chakra-ui/react";
import { NextPage } from "next";
import * as React from "react";

import CartItem from "@/components/Cart/CartItem/CartItem";
import CheckoutCard from "@/components/Cart/CheckoutCard/CheckoutCard";
import Layout from "@/components/Layout/Layout";
import { generateItemKey } from "@/utils/generateItemKey";
import { getStorage } from "@/utils/storage";

const Cart: NextPage = () => {

  const mapCartProductstoDOM = () => {
    const cartKey = "cart";

    const products = getStorage(cartKey);

    if (!products) {
      return (
        <Box h="75vh">
          <Text fontSize="lg">
            Cart is Empty
          </Text>
        </Box>
      );
    }

    return products.map((product) => 
      <li key={`${generateItemKey(product.name)}`}>
        <CartItem 
        name={product.name}
        price={product.price}
        />
      </li>
    );

  };

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