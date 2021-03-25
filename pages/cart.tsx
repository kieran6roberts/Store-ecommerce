import { 
  Box, 
  Divider, 
  Flex,
  Heading, 
  Stack,  
  StackDivider,
  Text, 
  useColorModeValue} from "@chakra-ui/react";
import { NextPage } from "next";
import * as React from "react";

import CheckoutCard from "@/components/Cart/CheckoutCard/CheckoutCard";
import Layout from "@/components/Layout/Layout";
import NextHead from "@/components/NextHead/NextHead";
import { useStore } from "@/hooks/useStorage";
import { mapCartStorage } from "@/utils/mapCartStorage";

export type ItemsPrices = {
  id: string;
  price: number;
}[] | null;

const Cart: NextPage = () => {
  
  const { cartStorage } = useStore()!;

  return (
    <>
    <NextHead 
    currentURL="http://localhost:3000/cart" 
    description="User coffee cart full of high quality coffee products" 
    title="Cart" 
    />
    <Layout>
      <Box 
      as="section"
      px={2}
      >
        <Text
        bg="pink.400"
        borderRadius="sm"
        color="white"
        fontSize="sm"
        mb={8}
        p={2}
        textAlign="center"
        >
          We are currently only shipping to a limited number of countries. These countries are 
          France, Germany, Ireland, The Netherlands and The United Kingdom.
        </Text>
        <Heading 
        as="h1"
        fontSize="lg"
        pb={4}
        >
          Items in Your Bag
        </Heading>
        <Divider my={{base: 2, xl: 8}} />
        <Flex 
        direction={["column-reverse", "column-reverse", "column-reverse", "row"]}
        pt={2}
        >
          <Stack 
          as="ul"
          divider={<StackDivider borderColor={useColorModeValue("pink.50", "gray.600")} />}
          flex="3"
          maxW="2000px"
          listStyleType="none"
          mr={["0px", "0px", "0px", "0.5rem"]}
          >
           {cartStorage?.length ? 
           mapCartStorage(cartStorage, false)
          :
          <Text 
          borderRadius="md"
          bg={useColorModeValue("gray.100", "gray.900")}
          p={4}
          >
            Cart is Empty
          </Text>}
          </Stack>
          <CheckoutCard />
        </Flex>
      </Box>
    </Layout>
    </>
  );
};

export default Cart;