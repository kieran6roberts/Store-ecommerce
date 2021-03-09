import { Button,
    Divider, 
    Flex,
    Heading, 
    Text, 
    VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import * as React from "react";
import { BiLockAlt } from "react-icons/bi";

import useCalculateTotal from "@/hooks/useCalculateTotal";
import { useStoreUpdate } from "@/hooks/useStorage";

const CheckoutCard = (): React.ReactElement => {
    const { total, handleTotalCalculation } = useCalculateTotal()!;
    const { updateItemsQuantities } = useStoreUpdate()!;
    const [ isDisabled, setIsDisabled ] = React.useState(false);

    const router = useRouter();

    const handleCheckoutProceed = () => {
        const quantitiyElements: HTMLInputElement[] = Array.from(document.querySelectorAll(".item-qty"));
        const cartQuantities = quantitiyElements.map((input) => parseInt(input.value));

        updateItemsQuantities(cartQuantities);

        setCookie(null, "checkout-session", "active", {
            maxAge: 60,
            expires: new Date(Date.now() + 60),
            path: "/"
        });

        router.push("/checkout");
    };

    const handleToggleDisable = (value: boolean) => setIsDisabled(value);

    React.useEffect(() => {
        if (total <= 0) {
            handleToggleDisable(true);
        } else {
            handleToggleDisable(false);
        }
    }, [ total ]);

    React.useEffect(() => {
        const itemPriceElements = Array.from(document.querySelectorAll(".cart-item__total"));

        const handleUpdateTotal = (event: MouseEvent) => {
            if ((event.target as HTMLButtonElement).classList.contains("qty-change")
            || (event.target as HTMLButtonElement).classList.contains("cart-item--remove")) {
                handleTotalCalculation(itemPriceElements);
            }
        };
        
        window.addEventListener("click", handleUpdateTotal);

        return () => {
          window.removeEventListener("click", handleUpdateTotal);
        };
    }); 

    return (
        <VStack 
        as="article"
        borderRadius="md"
        flex="1"
        fontSize="xs"
        maxW="500px"
        maxH="400px"
        mb={["4rem", "4rem", "4rem", "0px"]}
        mx="auto"
        spacing="20px"
        shadow="base"
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
                    Items Total:
                </Text>
                <Text 
                id="cart-total"
                >
                    €{total.toFixed(2)}
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
                    FREE
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
                    €{total}
                </Text>
            </Flex>
            <Divider />
            <Button 
            colorScheme="blue"
            leftIcon={<BiLockAlt />}
            isDisabled={isDisabled}
            onClick={handleCheckoutProceed}
            variant="solid"
            >
                Proceed To Checkout
            </Button>
            <Text 
            color="pink.400"
            fontSize="xs"
            >
                Once the checkout process begins you will have an hour to complete
                your checkout otherwise you will be returned back to the cart to start over.
            </Text>
        </VStack>
    );
};

export default CheckoutCard;