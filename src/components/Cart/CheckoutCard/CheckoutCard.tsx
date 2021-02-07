import { Button,
    Divider, 
    Flex,
    Heading, 
    Text, 
    VStack } from "@chakra-ui/react";
import * as React from "react";
import { BiLockAlt } from "react-icons/bi";

import { useStore, useStoreUpdate } from "@/hooks/useStorage";
import { IProductStorage } from "@/utils/storage";

const CheckoutCard = (): React.ReactElement => {

    const { subTotal } = useStore()!;
    const { updatePriceValue } = useStoreUpdate()!;

    React.useEffect(() => {
        console.log("checkout use effect");

        const updateCartTotal = () => {
            const itemPriceElments = document.querySelectorAll(".cart-item__total");
            const priceElementArray = Array.from(itemPriceElments);
            const mapPriceAsNumber = priceElementArray.map(element => {
                return {
                    price: parseInt(element.textContent?.replace("Total: £", ""))
                };
            });

            return mapPriceAsNumber.map(product => product.price)
            ?.reduce((accum, curValue) => accum + curValue, 0);
        };

        const qtyUpdateElements = document.querySelectorAll(".qty-change");
        const elementArray = Array.from(qtyUpdateElements);

        if (elementArray) {
            elementArray.forEach((element) => element.addEventListener("click", updateCartTotal));
        }

        return () => {
            if (elementArray) {
                elementArray.forEach(element => element.removeEventListener("click", updateCartTotal));
            }
        };

    }, []);

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
                <Text 
                id="cart-total"
                >
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