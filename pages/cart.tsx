import { Box, 
  Divider, 
  Flex,
  Heading, 
  Stack,  
  StackDivider } from "@chakra-ui/react";
import { NextPage } from "next";
import * as React from "react";

import CheckoutCard from "@/components/Cart/CheckoutCard/CheckoutCard";
import Layout from "@/components/Layout/Layout";
import { useStore } from "@/hooks/useStorage";
import { mapCartStorage } from "@/utils/mapCartStorage";

export type ItemsPrices = {
  id: string;
  price: number;
}[] | null;

const Cart: NextPage = () => {
  const { cartStorage } = useStore()!;

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
          divider={<StackDivider borderColor="pink.50" />}
          flex="3"
          listStyleType="none"
          mr={["0px", "0px", "0px", "0.5rem"]}
          >
           {mapCartStorage(cartStorage, false)}
          </Stack>
          <CheckoutCard />
        </Flex>
      </Box>
    </Layout>
  );
};

export default Cart;