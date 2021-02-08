import { Button,
    Divider, 
    Flex,
    Heading, 
    Text, 
    VStack } from "@chakra-ui/react";
import * as React from "react";
import { BiLockAlt } from "react-icons/bi";

const CheckoutCard = (): React.ReactElement => {

    const [ cartTotal, setCartTotal ] = React.useState(0);
    
    React.useEffect(() => {
        const handleClick = () => {
            const itemPriceElements = Array.from(document.querySelectorAll(".cart-item__total"));

            const mappedPriceElements = itemPriceElements
                .map(element => parseInt(element.textContent?.replace("Total: £", "")))
                .reduce((accum, curValue) => accum + curValue, 0);
    
            setCartTotal(mappedPriceElements);
        };
        
        window.addEventListener("click", handleClick);
    
        return () => {
          window.removeEventListener("click", handleClick);
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
                    cartTotal:
                </Text>
                <Text 
                id="cart-total"
                >
                    £{cartTotal}
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
                    £{cartTotal > 30 ? "0" : "4.99"}
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
                    £{cartTotal < 30 ? cartTotal + 4.99 : cartTotal}
                </Text>
            </Flex>
            <Divider />
            <Button 
            colorScheme="blue"
            leftIcon={<BiLockAlt />}
            variant="solid"
            isDisabled={cartTotal === 0 ? true : false}
            >
                Proceed to Checkout
            </Button>
        </VStack>
    );
};

export default CheckoutCard;