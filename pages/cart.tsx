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
import { useStore, useStoreUpdate } from "@/hooks/useStorage";
import { generateItemKey } from "@/utils/generateItemKey";
import { IProductStorage } from "@/utils/storage";

export type ItemsPrices = {
  id: string;
  price: number;
}[] | null;

const Cart: NextPage = () => {
  const { cartStorage } = useStore()!;
  const { 
    setCartStorage, 
    updatePriceValue, 
    removeCartValue } = useStoreUpdate()!;

    const [ qtyChange, setQtyChange ] = React.useState(0);

    const calculateItemPrice = (event: React.MouseEvent<HTMLInputElement>, itemPrice: number): number => {
      const evTargetAsElement = event.target as HTMLButtonElement;
      let productQuantityInput: HTMLInputElement | null;

      if (evTargetAsElement.nextElementSibling instanceof HTMLInputElement) {
          productQuantityInput = evTargetAsElement.nextElementSibling as HTMLInputElement;
      } else {
          productQuantityInput = evTargetAsElement.previousElementSibling as HTMLInputElement;
      }

      const quantityAsNumber = productQuantityInput.value ? parseInt(productQuantityInput.value) : 0;

      return quantityAsNumber * itemPrice;
  };

  const mapCartProductstoDOM = () => {
    if (cartStorage && cartStorage.length) {
      return cartStorage.map((product: IProductStorage) => 
        <li 
        id={product.id}
        key={`${generateItemKey(product.id)}`}>
          <CartItem 
          category={product.category}
          description={product.description}
          id={product.id}
          name={product.name}
          price={product.price}
          calculateItemPrice={(event) => calculateItemPrice(event, product.price)}
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