import { Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Heading,
    Input,
    Link,
    List,
    ListItem,
    StackDivider,
    VStack  } from "@chakra-ui/react";
import NextLink from "next/link";
import * as React from "react";

import AccountMenu from "@/components/Layout/AccountMenu/AccountMenu";
import { IUser } from "@/pages/index";

interface ISidebar {
    isOpen: boolean;
    onClose: () => void;
    user: IUser;
}

function Sidebar({ isOpen, onClose, user }: ISidebar): React.ReactElement {
    return (
        <Drawer isOpen={isOpen}
        onClose={onClose}
        placement="left">
            <DrawerOverlay>
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader mb={2}>
                        YourCoffeeShop
                    </DrawerHeader>
                    <DrawerBody>
                        <AccountMenu 
                        display={["flex", "flex", "none"]} 
                        user={user} 
                        />
                        <Heading 
                        as="h4" 
                        size="md"
                        mt={4}
                        >
                            Looking for something?
                        </Heading>
                        <Input 
                        my={4} 
                        placeholder="coffee beans..." 
                        />
                        <Heading 
                        as="h4" 
                        mb={4}
                        size="md"
                        >
                            Categories
                        </Heading>
                        <List>
                            <VStack 
                            align="left"
                            divider={<StackDivider borderColor="brand.200" />}
                            spacing={[1, 2, 3]}
                            >
                                <ListItem>
                                    <NextLink href="/">
                                        <Link>
                                            Coffee Beans
                                        </Link>
                                    </NextLink>
                                </ListItem>
                                <ListItem>
                                    <NextLink href="/">
                                        <Link>
                                            Ground Coffee
                                        </Link>
                                    </NextLink>
                                </ListItem>
                                <ListItem>
                                    <NextLink href="/">
                                        <Link>
                                            Coffee Capsules
                                        </Link>
                                    </NextLink>
                                </ListItem>
                                <ListItem>
                                    <NextLink href="/">
                                        <Link>
                                            Mugs & Cups
                                        </Link>
                                    </NextLink>
                                </ListItem>
                                <ListItem>
                                    <NextLink href="/">
                                        <Link>
                                            Other Miscellaneous
                                        </Link>
                                    </NextLink>
                                </ListItem>
                            </VStack>
                        </List>
                    </DrawerBody>
                    <DrawerFooter>
                        YourCoffeeShop @2021
                    </DrawerFooter>
                </DrawerContent>
            </DrawerOverlay>
        </Drawer>
    );
}

export default Sidebar;