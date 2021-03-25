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

    const router = useRouter();

    const getParam = () => {
        const split = router.pathname.split("/");
        return split[split.length - 1];
    };

    const mapCheckoutProgress = (): React.ReactNode => {
        return checkoutProcess.map((path: string, index) => {
            const capitalizedString = path.charAt(0).toLowerCase() + path.slice(1);
            
            return (
                <ListItem 
                display="inline-block"
                fontSize="sm"
                key={generateItemKey(path)} 
                >
                    <Text
                    display="inline-block" 
                    color={capitalizedString === getParam() ? "blue.300" : useColorModeValue("gray.800", "gray.50")}>
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
        mb={4}
        textAlign="center"
        w="100%"
        >
            <Heading 
            as="h2"
            fontSize="md"
            >
                {getParam().charAt(0).toUpperCase() + getParam().slice(1)}
            </Heading>
            <Divider 
            my={{base: 4, xl: 8}}
            />
            <Heading 
            as="h3"
            fontSize="sm"
            mb={{base: 8, xl: 16}}
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