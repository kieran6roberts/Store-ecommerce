import { Button,
    Divider, 
    Flex,
    Heading, 
    Text, 
    VStack } from "@chakra-ui/react";
import * as React from "react";
import { BiLockAlt } from "react-icons/bi";

import { useStore, useStoreUpdate } from "@/hooks/useStorage";

const CheckoutCard = (): React.ReactElement => {

    const { cartStorage, subTotal } = useStore();
    const { updatePriceValue } = useStoreUpdate();

    React.useEffect(() => {
        console.log("update total on cart page");
        updatePriceValue(cartStorage);
    }, [ cartStorage ]);

    return (
        <VStack 
        as="article"
        border="1px solid black"
        flex="1"
        fontSize="xs"
        maxW="500px"
        maxH="400px"
        mb={["4rem", "4rem", "4rem", "0px"]}
        mx="auto"
        spacing="20px"
        p={3}
        w="full"
        >
            <Heading 
            as="h3"
            fontSize="lg"
            mb={8}
            w="full"
            >
                Order Summary
            </Heading>
            <Flex 
            justify="space-between"
            w="full"
            >
                <Text>
                    Subtotal:
                </Text>
                <Text>
                    £{subTotal}
                </Text>
            </Flex>
            <Flex 
            justify="space-between"
            w="full"
            >
                <Text>
                    Shipping Costs:
                </Text>
                <Text id="shipping-costs">
                    £{subTotal > 30 ? "0" : "4.99"}
                </Text>
            </Flex>
            <Flex 
            justify="space-between"
            w="full"
            >
                <Text>
                    Total:
                </Text>
                <Text>
                    £{subTotal < 30 ? subTotal + 4.99 : subTotal}
                </Text>
            </Flex>
            <Divider />
            <Button 
            colorScheme="blue"
            leftIcon={<BiLockAlt />}
            variant="solid"
            isDisabled={subTotal === 0 ? true : false}
            >
                Proceed to Checkout
            </Button>
        </VStack>
    );
};

export default CheckoutCard;