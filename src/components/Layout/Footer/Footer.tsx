import { Flex, 
    HStack, 
    Link, 
    List, 
    ListItem, 
    Text } from "@chakra-ui/react";
import NextLink from "next/link";
import * as React from "react";

function Footer(): React.ReactElement {
    return (
        <Flex as="footer" 
        alignItems="center"
        direction="column"
        justifyContent="center"
        p={[4, 4, 6, 8]}
        >
            <Text fontSize="md" mb={6}>
                YourCoffeeShop @2021
            </Text>
            <List display="flex" fontSize="sm">
                <HStack spacing="12">
                    <ListItem>
                        <NextLink href="/products">
                            <Link>
                                Products
                            </Link>
                        </NextLink>
                    </ListItem>
                    <ListItem>
                        <NextLink href="/cart">
                            <Link>
                                Cart
                            </Link>
                        </NextLink>
                    </ListItem>
                    <ListItem>
                        <NextLink href="/account">
                            <Link>
                                Account
                            </Link>
                        </NextLink>
                    </ListItem>
                    <ListItem>
                        <NextLink href="/help">
                            <Link>
                                Help
                            </Link>
                        </NextLink>
                    </ListItem>
                </HStack>
            </List>
        </Flex>
    );
}

export default Footer;