import { Box,
    Flex, 
    Stack, 
    Text, 
    useColorModeValue, 
    VStack } from "@chakra-ui/react";
import Image from "next/image";
import * as React from "react";

import RemoveButton from "@/components/Cart/RemoveButton/RemoveButton";
import QuantityInput from "@/components/Products/QuantityInput/QuantityInput";
import useCalculateTotal from "@/hooks/useCalculateTotal";
import { useStoreUpdate } from "@/hooks/useStorage";

interface ICartItem {
    category: string;
    description: string;
    hideEdit?: boolean;
    id: string;
    image: string;
    name: string;
    price: number;
}

const CartItem = ({ 
    description, 
    hideEdit,
    id,
    image,
    name, 
    price }: ICartItem): React.ReactElement => {

    const { removeCartValue } = useStoreUpdate()!;
    const { 
        handleQtyIncrease, 
        handleQtyDecrease,
        itemPrice } = useCalculateTotal(price);

    return (
        <Stack
        bg={useColorModeValue("gray.100", "gray.900")}
        borderRadius="md"
        direction={["column", "column", "column", "row"]}
        display="flex"
        maxW={[ "500px", "500px", "none" ]}
        mx="auto"
        p={{base: 2, xl: 8}}
        spacing="0"
        justify="space-between"
        w="100%">
            <Box m="auto">
                <Image 
                alt="product image"
                height={150}
                src={`/${image}`}
                width={200}
                />
            </Box>
            <VStack 
            flex="2"
            spacing={2}
            px="1rem"
            >
                <Text 
                fontSize="md"
                fontWeight="700"
                >
                    {name}
                </Text>
                <Text 
                fontSize="sm"
                mb={{base: 4}}
                >
                    {description}
                </Text>
            </VStack>
            {!hideEdit ? 
            <>
            <VStack 
            display="flex"
            align-items="center"
            justify-items="space-between"
            direction="column"
            mb={[4, 4, 4, 2]}
            px="1rem"
            spacing={4}
            >
                <QuantityInput 
                id={id}
                handleQtyDecrease={handleQtyDecrease}
                handleQtyIncrease={handleQtyIncrease}
                />  
                <RemoveButton callback={removeCartValue} /> 
            </VStack>
            <Flex 
            align="center"
            direction="column"
            justify="center"
            w={[ "100%", "100%", "100%", "15%" ]}
            >
                <Text 
                className="cart-item__total"
                textAlign="center"
                w="100%"
                >
                    Total: €{itemPrice ? (itemPrice / 100).toFixed(2) : 0}
                </Text>
            </Flex>
            </> : null}
        </Stack>
    );
};

export default CartItem;