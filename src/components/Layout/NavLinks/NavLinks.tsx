import { 
    Box, 
    Link, 
    ListItem, 
    Text, 
    Tooltip } from "@chakra-ui/react";
import NextLink from "next/link";
import * as React from "react";
import { AiOutlineHeart, AiOutlineShop } from "react-icons/ai";
import { IoCartOutline, IoHelpCircleOutline } from "react-icons/io5";

interface INavLinks {
    isStyled: boolean;
}

const NavLinks: React.FC<INavLinks> = ({ isStyled }) => (
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
                    display="inline-flex"
                    mr={2}
                    p={1}
                    >
                        <AiOutlineShop style={{ color: "white" }} />
                    </Box>
                </Tooltip>
                {isStyled ? 
                <Text>
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
                    mr={2}
                    p={1}
                    >
                        <IoCartOutline style={{ color: "white" }} />
                    </Box>
                </Tooltip>
                {isStyled ? 
                <Text>
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
                    display="inline-flex"
                    mr={2}
                    p={1}
                    >
                        <AiOutlineHeart style={{ color: "white" }} />
                    </Box>
                </Tooltip>
                {isStyled ? 
                <Text>
                    Saved Items
                </Text> : null}
            </Link>
        </NextLink>
    </ListItem>
    </>
);

export default NavLinks;