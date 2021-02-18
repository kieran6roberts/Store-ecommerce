import { Box,
    Button,
    Flex,
    Heading, 
    IconButton, 
    Link, 
    List, 
    ListItem, 
    Text,    
    Tooltip,
    useColorMode } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { AiOutlineHeart } from "react-icons/ai";
import { FiMoon, FiSun } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCartOutline, IoHelpCircleOutline } from "react-icons/io5";

import AccountMenu from "@/components/Layout/AccountMenu/AccountMenu";
import CurrentUser from "@/components/Layout/CurrentUser/CurrentUser";

export interface IUser {
    user: {
      name?: string,
      nickname?: string,
      picture?: string,
      updated_at?: string,
      email?: string,
      email_verified?: string,
      sub?: string
    }
  }

interface INav { 
    onOpen: () => void;
    user: IUser;
    userLoading: boolean;
}

const Nav: React.FC<INav> = ({ onOpen, user, userLoading }) => {
    const router = useRouter();

    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Flex
        direction="column"
        position="relative"
        pt={[2, 3, 4, 6]}
        px={[2, 3, 4, 6]}
        >
            <Flex 
            as="nav"
            align="center"
            justify="space-between"
            >
                <Heading 
                as="h1" 
                fontSize="lg"
                >
                    <NextLink 
                    href="/" 
                    passHref>
                        <Link>
                            Next.js e-commerce
                        </Link>
                    </NextLink>
                </Heading>
                <List 
                alignItems="center"
                display="flex" 
                flex="1"
                fontSize="sm"
                justifyContent="flex-end"
                >
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
                    <AccountMenu 
                    display={["none", "none", "flex"]}
                    user={user} 
                    />
                    <Button 
                    aria-label="mobile navigation"
                    colorScheme="blue"
                    fontSize="xs"
                    onClick={onOpen}
                    ml={12}
                    variant="outline" 
                    >
                        <GiHamburgerMenu style={{ marginRight: "6px" }} />
                        <Text color="brand.300">
                            Menu
                        </Text>
                    </Button>
                </List>
            </Flex>
            <Flex 
            alignItems="center"
            fontSize="sm"
            justify="space-between"
            borderTop="1px solid gray"
            borderBottom="1px solid gray"
            mt={4}
            mb={8}
            py={4}
            >
                <Box>
                    <Text>
                        <NextLink 
                        href="/" 
                        passHref>
                            <Link>
                                Home 
                            </Link>
                        </NextLink>
                        <span>
                            {router.asPath.split("/").join(" > ").toLowerCase()}
                        </span>
                    </Text>
                </Box>
                <IconButton 
                aria-label={`toggle color theme: ${colorMode}`} 
                onClick={toggleColorMode}
                icon={colorMode === "light" ? <FiSun /> : <FiMoon />}
                size="md"
                variant="outline"
                />
                <CurrentUser 
                user={user} 
                userLoading={userLoading} 
                />
            </Flex>
        </Flex>
    );
};

export default Nav;