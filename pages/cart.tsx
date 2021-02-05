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
import { IProductStorage } from "@/utils/storage";

export type ItemsPrices = {
  id: string;
  price: number;
}[] | null;

const Cart: NextPage = () => {
  const { cartStorage } = useStore()!;

  const [ itemsPrices, setItemsPrices ] = React.useState<ItemsPrices>(() => {
    if (!cartStorage) {
      return null;
    } else {
      return cartStorage.map(item => ({ 
        id: item.id, 
        price: item.price,
        quantity: 1
      }));
    }
  });
  
  console.log(itemsPrices);


  const calculateItemPrice = (event: React.MouseEvent<HTMLInputElement>): number => {
    const evTargetAsElement = event.target as HTMLButtonElement;
    let productQuantityInput: HTMLInputElement | null;

    if (evTargetAsElement.nextElementSibling instanceof HTMLInputElement) {
        productQuantityInput = evTargetAsElement.nextElementSibling as HTMLInputElement;
    } else {
        productQuantityInput = evTargetAsElement.previousElementSibling as HTMLInputElement;
    }

    return productQuantityInput.value ? parseInt(productQuantityInput.value) : 0;

};

    const updateItemPrice = (event: React.MouseEvent<HTMLInputElement>, id: string) => {
      const inputAsNumber = calculateItemPrice(event);

      const newQuantity = document.querySelector(`#Qty-${id}`)?.textContent;
      
      setItemsPrice(inputAsNumber * cost);
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
          updatePrice={(event) => updateItemPrice(event, product.id)}
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
          <CheckoutCard itemsPrices={itemsPrices}/>
        </Flex>
      </Box>
    </Layout>
  );
};

export default Cart;