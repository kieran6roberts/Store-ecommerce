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
import { useStoreUpdate } from "@/hooks/useStorage";

interface ICartItem {
    category: string;
    description: string;
    hideEdit?: boolean;
    id: string;
    name: string;
    price: number;
}

const CartItem = ({ 
    category,
    description, 
    hideEdit,
    id,
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
                <Text fontSize="sm">
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
            <Flex 
            align="center"
            justify="center"
            direction="column"
            >
                <QuantityInput 
                id={id}
                handleInputChange={handleInputChange}
                handleQtyDecrease={handleQtyDecrease}
                handleQtyIncrease={handleQtyIncrease}
                />  
                <Button 
                aria-label="remove cart item"
                className="cart-item--remove"
                color="red.300"
                fontSize="xs"
                leftIcon={<ImCancelCircle />}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => removeCartValue(event)}
                mt={4}
                mx="auto"
                variant="outline"
                >
                    Remove
                </Button>
            </Flex> : null}
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