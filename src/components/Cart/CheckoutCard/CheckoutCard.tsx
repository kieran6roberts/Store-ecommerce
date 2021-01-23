import { Button,
    Divider, 
    Flex,
    Heading, 
    StackDivider, 
    Text, 
    VStack } from "@chakra-ui/react";
import * as React from "react";
import { BiLockAlt } from "react-icons/bi";

const CheckoutCard = (): React.ReactElement => {
    return (
        <VStack 
        as="article"
        border="1px solid black"
        flex="1"
        spacing="20px"
        p={6}
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
                    Subtotal
                </Text>
                <Text>
                    £19.99
                </Text>
            </Flex>
            <Flex 
            justify="space-between"
            w="full"
            >
                <Text>
                    Shipping Costs
                </Text>
                <Text>
                    £4.99
                </Text>
            </Flex>
            <Flex 
            justify="space-between"
            w="full"
            >
                <Text>
                    Total
                </Text>
                <Text>
                    £24.98
                </Text>
            </Flex>
            <Divider />
            <Button 
            colorScheme="blue"
            leftIcon={<BiLockAlt />}
            variant="solid"
            >
                Proceed to Checkout
            </Button>
        </VStack>
    );
};

export default CheckoutCard;