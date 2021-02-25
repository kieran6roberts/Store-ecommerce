import { Box, 
    Divider,
    Heading,
    List, 
    ListItem, 
    Text,
    useColorModeValue } from "@chakra-ui/react";
import { useRouter } from "next/router";
import * as React from "react";

import { generateItemKey } from "@/utils/generateItemKey";

const checkoutProcess = ["Cart", "Checkout", "Shipping", "Payment", "Review"];

const CartProcessIndicator: React.FC = () => {

    const mapCheckoutProgress = (): React.ReactNode => {
        return checkoutProcess.map((path: string, index) => {
            const capitalizedString = path.charAt(0).toLowerCase() + path.slice(1);

            return (
                <ListItem 
                display="inline-block"
                key={generateItemKey(path)} 
                >
                    <Text
                    display="inline-block" 
                    color={capitalizedString === useRouter().asPath.slice(1, useRouter().asPath.length) ? "blue.300" : useColorModeValue("gray.800", "gray.50")}>
                        {path} 
                    </Text>
                    <Text  
                    display="inline-block"
                    mx={1}
                    >
                        {index !== checkoutProcess.length - 1 ? ">" : null}
                    </Text>
                </ListItem>
            );
        });
    };


    return (
        <Box 
        as="header"
        mb={8}
        textAlign="center"
        w="full"
        >
            <Heading 
            as="h2"
            fontSize="md"
            >
                Checkout 
            </Heading>
            <Divider 
            mt={4} 
            mb={2}
            />
            <Heading 
            as="h3"
            fontSize="sm"
            mb={8}
            >
                Next.js e-commerce
            </Heading>
            <List
            as="ul"
            display="flex"
            justifyContent="center"
            fontSize="xs"
            mb={8}
            w="full"
            >
                {mapCheckoutProgress()}
            </List>
        </Box>
    );
};

export default CartProcessIndicator;