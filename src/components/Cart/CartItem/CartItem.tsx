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

const CartItem = ({ name, price }): React.ReactElement => {
    return (
        <Stack
        border="1px solid gray"
        direction={["column", "column", "column", "row"]}
        display="flex"
        divider={<StackDivider borderColor="blue.100" />}
        fontSize="xs"
        maxW={["500px", "500px", "500px", "none"]}
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
                    Product Category
                </Text>
                <Text fontSize="xs">
                    Product Description
                </Text>
            </VStack>
            <Flex 
            align="center"
            justify="center"
            direction="column">
                <QuantityInput />  
                <Button 
                color="red.300"
                fontSize="xs"
                leftIcon={<ImCancelCircle />}
                mt={4}
                mx="auto"
                variant="outline"
                >
                    Remove
                </Button>
            </Flex>
            <Text 
            flex="0.5"
            textAlign="center"
            >
                Total: £{price}
            </Text>
        </Stack>
    );
};

export default CartItem;