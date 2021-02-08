import { Button,
    Divider, 
    Flex,
    Heading, 
    Text, 
    VStack } from "@chakra-ui/react";
import * as React from "react";
import { BiLockAlt } from "react-icons/bi";

import useCalculateTotal from "@/hooks/useCalculateTotal";

const CheckoutCard = (): React.ReactElement => {
    const { total, handleTotalCalculation } = useCalculateTotal()!;

    React.useEffect(() => {
        const itemPriceElements = Array.from(document.querySelectorAll(".cart-item__total"));

        const handleUpdateTotal = (event: React.MouseEvent) => {
            if (!(event.target as HTMLButtonElement).classList.contains("qty-change")) {
                return;
            }

            handleTotalCalculation(itemPriceElements);
        };
        
        window.addEventListener("click", handleUpdateTotal);

        return () => {
          window.removeEventListener("click", handleUpdateTotal);
        };
    }); 

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
                    total:
                </Text>
                <Text 
                id="cart-total"
                >
                    £{total}
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
                    £{total > 30 ? "0" : "4.99"}
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
                    £{total < 30 ? total + 4.99 : total}
                </Text>
            </Flex>
            <Divider />
            <Button 
            colorScheme="blue"
            leftIcon={<BiLockAlt />}
            variant="solid"
            isDisabled={total === 0 ? true : false}
            >
                Proceed to Checkout
            </Button>
        </VStack>
    );
};

export default CheckoutCard;