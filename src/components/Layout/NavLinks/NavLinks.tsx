import { Box,
    Flex, 
    Link, 
    ListItem, 
    Text, 
    Tooltip } from "@chakra-ui/react";
import NextLink from "next/link";
import * as React from "react";
import { AiOutlineHeart, AiOutlineShop } from "react-icons/ai";
import { IoCartOutline } from "react-icons/io5";

interface INavLinks {
    cartNumber: number;
    isStyled: boolean;
}

const NavLinks: React.FC<INavLinks> = ({ isStyled, cartNumber }) => (
    <>
    <ListItem>
        <NextLink 
        href="/store" 
        passHref
        >
            <Link 
            aria-label="store page"
            alignItems="center" 
            display="flex"
            fontSize="lg"
            >
                <Tooltip 
                fontSize="sm"
                label="Store" 
                >
                    <Box
                    alignSelf="center"
                    bgGradient="linear(45deg, orange.300, teal.300)"
                    borderRadius="sm"
                    fontSize="sm"
                    display="inline-flex"
                    p={[1, 1, 2, 2, 2, 4]}
                    >
                        <AiOutlineShop style={{ color: "white" }} />
                    </Box>
                </Tooltip>
                {isStyled ? 
                <Text 
                fontSize="sm"
                ml={4}
                >
                    Store
                </Text> : null}
            </Link>
        </NextLink>
    </ListItem>
    <ListItem>
        <NextLink 
        href="/cart" 
        passHref
        >
            <Link 
            aria-label="store page"
            alignItems="center" 
            display="flex"
            fontSize="lg"
            >
                <Tooltip 
                fontSize="sm"
                label="Cart" 
                >
                    <Box
                    alignSelf="center"
                    bgGradient="linear(45deg, blue.300, green.300)"
                    borderRadius="sm"
                    display="inline-flex"
                    fontSize="sm"
                    p={[1, 1, 2, 2, 2, 4]}
                    position="relative"
                    >
                        <IoCartOutline style={{ color: "white" }} />
                        {cartNumber ? 
                        <Flex
                        align="center"
                        bg="pink.400"
                        bottom={0}
                        borderRadius="50%"
                        className="cart-number"
                        color="white"
                        fontSize="xs"
                        h="1rem"
                        justify="center"
                        left={-2}
                        right={0}
                        top={-2}
                        position="absolute"
                        w="1rem"
                        >
                            {cartNumber}
                        </Flex> : null}
                    </Box>
                </Tooltip>
                {isStyled ? 
                <Text 
                fontSize="sm"
                ml={4}
                >
                    Cart
                </Text> : null}
            </Link>
        </NextLink>
    </ListItem>
    <ListItem display="block">
        <NextLink 
        href="/saved-products" 
        passHref
        >
            <Link 
            aria-label="saved products page"
            alignItems="center" 
            display="flex"
            fontSize="lg"
            >
                <Tooltip 
                fontSize="sm"
                label="Saved" 
                >
                    <Box
                    alignSelf="center"
                    bgGradient="linear(45deg, pink.300, purple.300)"
                    borderRadius="sm"
                    fontSize="sm"
                    display="inline-flex"
                    p={[1, 1, 2, 2, 2, 4]}
                    >
                        <AiOutlineHeart style={{ color: "white" }} />
                    </Box>
                </Tooltip>
                {isStyled ? 
                <Text 
                fontSize="sm"
                ml={4}
                >
                    Saved Items
                </Text> : null}
            </Link>
        </NextLink>
    </ListItem>
    </>
);

export default NavLinks;