import { Box,
    Button, 
    Flex, 
    Stack, 
    StackDivider, 
    Text, 
    VStack } from "@chakra-ui/react";
import Image from "next/image";
import * as React from "react";
import { ImCancelCircle } from "react-icons/im";

import QuantityInput from "@/components/Products/QuantityInput/QuantityInput";
import { useStore, useStoreUpdate } from "@/hooks/useStorage";

interface ICartItem {
    category: string;
    description: string;
    id: string;
    name: string;
    price: number;
    quantity: number;
    calculateItemPrice: (event: React.MouseEvent<HTMLButtonElement>) => number;
}

const CartItem = ({ 
    calculateItemPrice,
    category,
    description, 
    id,
    name, 
    removeItem,
    price,
    quantity }: ICartItem): React.ReactElement => {

    const [ itemPrice, setItemPrice ] = React.useState(price);
    const { updatePriceValue } = useStoreUpdate()!;

    const updateUIWithPrice = (event) => setItemPrice(() => calculateItemPrice(event, price));

    return (
        <Stack
        border="1px solid gray"
        direction={["column", "column", "column", "row"]}
        display="flex"
        divider={<StackDivider borderColor="blue.100" />}
        fontSize="xs"
        maxW={[ "500px", "500px", "500px", "none" ]}
        mx="auto"
        p={4}
        spacing="20px"
        justify="space-between"
        w="full">
            <Box>
                <Image 
                alt="product image"
                height={100}
                src="/images/img.png"
                width={100}
                />
            </Box>
            <VStack 
            flex="1"
            spacing={2}
            >
                <Text fontSize="md">
                    {name}
                </Text>
                <Text fontSize="sm">
                    {category}
                </Text>
                <Text fontSize="xs">
                    {description}
                </Text>
            </VStack>
            <Flex 
            align="center"
            justify="center"
            direction="column"
            >
                <QuantityInput 
                id={id}
                updatePrice={updateUIWithPrice} />  
                <Button 
                aria-label="remove cart item"
                color="red.300"
                fontSize="xs"
                leftIcon={<ImCancelCircle />}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => removeItem(event)}
                mt={4}
                mx="auto"
                variant="outline"
                >
                    Remove
                </Button>
            </Flex>
            <Text 
            className="cart-item__total"
            flex="0.5"
            textAlign="center"
            >
                Total: £{itemPrice}
            </Text>
        </Stack>
    );
};

export default CartItem;