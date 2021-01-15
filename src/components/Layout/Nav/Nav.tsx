import { Button, 
    Flex,
    Heading, 
    Link, 
    List, 
    ListItem, 
    Text } from "@chakra-ui/react";
import NextLink from "next/link";
import * as React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCartOutline,     
    IoHelpCircleOutline } from "react-icons/io5";

import AccountMenu from "@/components/Layout/AccountMenu/AccountMenu";
import CurrentUser from "@/components/Layout/CurrentUser/CurrentUser";
import { IUser } from "@/pages/index";

interface INav { 
    onOpen: () => void,
    user: IUser
}

const Nav: React.FC<INav> = ({ onOpen, user }) => {
    return (
        <Flex
        direction="column"
        position="relative"
        pb={4}
        >
            <Flex 
            as="nav"
            align="center"
            justify="space-between"
            p={[2, 3, 4, 6]}
            >
                <Heading 
                as="h1" 
                fontSize="lg"
                >
                    <NextLink href="/">
                        <Link>
                            YourCoffeeShop
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
                    <ListItem mx={[1, 2, 4]}>
                        <NextLink href="/cart">
                            <Link 
                            alignItems="center" 
                            display="flex"
                            >
                                <IoCartOutline style={{ marginRight: "8px" }} />
                                Cart
                            </Link>
                        </NextLink>
                    </ListItem>
                    <ListItem 
                    display={["none", "none", "block"]} 
                    mr={12} 
                    ml={4}
                    >
                        <NextLink href="/help">
                            <Link 
                            alignItems="center" 
                            display="flex"
                            >
                                <IoHelpCircleOutline style={{ marginRight: "8px" }} />
                                Help
                            </Link>
                        </NextLink>
                    </ListItem>
                    <AccountMenu 
                    display={["none", "none", "flex"]}
                    user={user} 
                    />
                    <Button 
                    fontSize="xs"
                    onClick={onOpen}
                    ml={8}
                    variant="outline" 
                    >
                        <GiHamburgerMenu style={{ marginRight: "6px" }} />
                        <Text color="brand.300">
                            Menu
                        </Text>
                    </Button>
                </List>
            </Flex>
            <CurrentUser user={user} />
        </Flex>
    );
};

export default Nav;