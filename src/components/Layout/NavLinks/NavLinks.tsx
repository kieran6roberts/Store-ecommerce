import { Link, ListItem, Tooltip } from "@chakra-ui/react";
import NextLink from "next/link";
import * as React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { IoCartOutline, IoHelpCircleOutline } from "react-icons/io5";

const NavLinks: React.FC = () => (
    <>
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
                    <span>
                        <IoCartOutline />
                    </span>
                </Tooltip>
            </Link>
        </NextLink>
    </ListItem>
    <ListItem 
    display={["none", "none", "block"]} 
    ml={12}
    >
        <NextLink 
        href="/help" 
        passHref
        >
            <Link 
            aria-label="help page"
            alignItems="center" 
            display="flex"
            fontSize="lg"
            >
                <Tooltip 
                fontSize="sm"
                label="Help" 
                >
                    <span>
                        <IoHelpCircleOutline />
                    </span>
                </Tooltip>
            </Link>
        </NextLink>
    </ListItem>
    <ListItem 
    display={["none", "none", "block"]} 
    mx={12} 
    >
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
                    <span>
                        <AiOutlineHeart />
                    </span>
                </Tooltip>
            </Link>
        </NextLink>
    </ListItem>
    </>
);

export default NavLinks;