import { Flex, 
    HStack, 
    Link, 
    List, 
    ListItem, 
    Text, 
    useColorModeValue} from "@chakra-ui/react";
import NextLink from "next/link";
import * as React from "react";

import { IUser } from "@/components/Layout/Nav/Nav";

interface IFooter {
    user: IUser;
}

const Footer: React.FC<IFooter> = ({ user }) => {
    return (
        <Flex 
        as="footer" 
        alignItems="center"
        bg={useColorModeValue("gray.50", "gray.900")}
        direction="column"
        justifyContent="center"
        mt={12}
        p={[6, 6, 8, 12, 20]}
        >
            <Text 
            fontSize="md" 
            mb={6}
            >
                Kieran's Coffee Collection @2021
            </Text>
            <List 
            fontSize="sm"
            mt={{base: 2, xl: 8}}
            >
                <HStack 
                as="ul" 
                listStyleType="none"
                spacing={{base: 8, xl: 24}}
                >
                    <ListItem>
                        <NextLink href="/store">
                            <Link _hover={{
                                color: "pink.400"
                            }}>
                                Store
                            </Link>
                        </NextLink>
                    </ListItem>
                    <ListItem>
                        <NextLink href="/cart">
                            <Link _hover={{
                                color: "pink.400"
                            }}>
                                Cart
                            </Link>
                        </NextLink>
                    </ListItem>
                    <ListItem>
                        <NextLink href="/saved-products">
                            <Link _hover={{
                                color: "pink.400"
                            }}>
                                Saved Products
                            </Link>
                        </NextLink>
                    </ListItem>
                    <ListItem>
                        {user ? 
                        <NextLink href="/account">
                            <Link _hover={{
                                color: "pink.400"
                            }}>
                                Account
                            </Link>
                        </NextLink>
                        :
                        <NextLink href="/api/login">
                            <Link _hover={{
                                color: "pink.400"
                            }}>
                                Login
                            </Link>
                        </NextLink>
                        }
                    </ListItem>
                </HStack>
            </List>
        </Flex>
    );
};

export default Footer;