import { Box,
    Button,
    Flex,
    Heading, 
    HStack, 
    IconButton, 
    Link, 
    List, 
    Text,    
    useColorMode,    
    useColorModeValue } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";
import * as React from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { GiHamburgerMenu } from "react-icons/gi";

import AccountMenu from "@/components/Layout/AccountMenu/AccountMenu";
import CurrentUser from "@/components/Layout/CurrentUser/CurrentUser";
import NavLinks from "@/components/Layout/NavLinks/NavLinks";
import { useStore } from "@/hooks/useStorage";

export interface IUser {
      name?: string,
      nickname?: string,
      picture?: string,
      updated_at?: string,
      email?: string,
      email_verified?: string,
      sub?: string
  }

interface INav { 
    onOpen: () => void;
    user: IUser;
    userLoading: boolean;
}

const Nav: React.FC<INav> = ({ onOpen, user, userLoading }) => {
    const router = useRouter();

    const { cartStorage } = useStore()!;
    const { colorMode, toggleColorMode } = useColorMode();
    
    return (
        <Flex
        direction="column"
        position="relative"
        mb={6}
        >
            <Flex 
            align="center"
            bgGradient="linear(45deg, blue.300, blue.400)"
            color="white"
            justify="center"
            h="2rem" 
            >
                <Text 
                fontSize="sm"
                fontWeight="700"
                textAlign="center"
                >
                    Welcome! Currently free shipping on all orders!
                </Text>
            </Flex>
            <Flex 
            as="nav"
            align="center"
            justify="space-between"
            pt={[2, 3, 4, 6]}
            px={[2, 3, 4, 6]}
            >
                <Heading 
                as="h2" 
                fontSize="lg"
                h="full"
                >
                    <NextLink 
                    href="/" 
                    passHref>
                        <Link>
                            Kieran's Coffee Collection
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
                    <HStack 
                    as="ul"
                    display={["none", "none", "flex"]}
                    listStyleType="none"
                    spacing={12}
                    mr={16}
                    >
                        <NavLinks isStyled={false} cartNumber={cartStorage.length} />
                    </HStack>
                    <AccountMenu 
                    display={["none", "none", "flex"]}
                    user={user} 
                    />
                    <Button 
                    aria-label="mobile navigation"
                    display={["flex", "flex", "none"]}
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
            bgGradient={useColorModeValue("linear(90deg, gray.50, gray.50)", "linear(90deg, gray.700, gray.700)")}
            fontSize="sm"
            justify="space-between"
            mt={4}
            pb={6}
            py={4}
            px={[2, 3, 4, 6]}
            >
                <Box 
                display={["none", "none", "block"]}
                flex="1"
                >
                    <Text>
                        <NextLink 
                        href="/" 
                        passHref>
                            <Link>
                                Home 
                            </Link>
                        </NextLink>
                        <span>
                            {router.pathname === "/store/products/[id]" ?
                             router.asPath.split("/").join(" > ").toLowerCase()
                            :
                            router.pathname.split("/").join(" > ").toLowerCase()}
                        </span>
                    </Text>
                </Box>
                <Flex 
                flex="2"
                justify={["flex-start", "flex-start", "center"]}
                >
                    <IconButton 
                    aria-label={`toggle color theme: ${colorMode}`} 
                    icon={colorMode === "light" ? <FiSun /> : <FiMoon />}
                    onClick={toggleColorMode}
                    size="md"
                    variant="outline"
                    
                    />
                </Flex>
                <CurrentUser 
                justify="flex-end"
                user={user} 
                userLoading={userLoading} 
                />
            </Flex>
        </Flex>
    );
};

export default Nav;