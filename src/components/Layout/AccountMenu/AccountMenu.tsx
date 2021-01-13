import { Button,
    Link,    
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,    
    MenuList } from "@chakra-ui/react";
    import NextLink from "next/link";
import * as React from "react";
import { IoChevronDownOutline } from "react-icons/io5";

function AccountMenu({ display }: { display: string[]}): React.ReactElement {
    return (
        <Menu>
            <MenuButton as={Button} 
            display={display}
            fontSize="sm"
            rightIcon={<IoChevronDownOutline />}
            transition="all 200ms"
            variant="outline"
            >
                Account
            </MenuButton>
            <MenuList>
                <MenuItem>
                    <NextLink href="/login">
                        <Link>
                            Login
                        </Link>
                    </NextLink>
                    </MenuItem>

                    <MenuDivider />

                <MenuItem>
                    <NextLink href="/register">
                        <Link>
                            Register
                        </Link>
                    </NextLink>
                </MenuItem>
            </MenuList>
        </Menu>
    );
}

export default AccountMenu;
