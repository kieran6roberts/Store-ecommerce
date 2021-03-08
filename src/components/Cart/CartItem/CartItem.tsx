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
    category,
    description, 
    hideEdit,
    id,
    image,
    name, 
    price }: ICartItem): React.ReactElement => {

    const [ itemPrice, setItemPrice ] = React.useState(price);
    const { removeCartValue } = useStoreUpdate()!;

    const handleQtyIncrease = (event: React.MouseEvent<HTMLButtonElement>) => {
        const inputElement = (event.target as HTMLButtonElement).previousElementSibling as HTMLInputElement;
        setItemPrice(parseInt(inputElement.value) * price);
      };
  
    const handleQtyDecrease = (event: React.MouseEvent<HTMLButtonElement>) => {
        const inputElement = (event.target as HTMLButtonElement).nextElementSibling as HTMLInputElement;
        setItemPrice(parseInt(inputElement.value) * price);
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setItemPrice(parseInt((event.target as HTMLInputElement).value) * price);
    };

    return (
        <Stack
        bg={useColorModeValue("gray.100", "gray.700")}
        borderRadius="md"
        direction={["column", "column", "column", "row"]}
        display="flex"
        fontSize="xs"
        maxW={[ "500px", "500px", "500px", "none" ]}
        mx="auto"
        p={4}
        spacing="0"
        justify="space-between"
        w="full">
            <Box m="auto">
                <Image 
                alt="product image"
                height={130}
                src={`/${image}`}
                width={170}
                />
            </Box>
            <VStack 
            flex="2"
            spacing={2}
            px="1rem"
            >
                <Text 
                fontSize="sm"
                fontWeight="700"
                >
                    {name}
                </Text>
                <Text fontSize="xs">
                    {category}
                </Text>
                <Text fontSize="xs">
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
                handleInputChange={handleInputChange}
                handleQtyDecrease={handleQtyDecrease}
                handleQtyIncrease={handleQtyIncrease}
                />  
                <RemoveButton callback={removeCartValue} /> 
            </VStack>
            <Flex 
            align="center"
            direction="column"
            justify="center"
            >
                <Text 
                className="cart-item__total"
                flex="1"
                textAlign="center"
                >
                    Total: €{(itemPrice / 100).toFixed(2)}
                </Text>
            </Flex>
            </> : null}
        </Stack>
    );
};

export default CartItem;