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

import { IUser } from "@/pages/index";

interface IAccountMenu {
    display: string[],
    user: IUser
}

function AccountMenu({ display, user }: IAccountMenu): React.ReactElement {
    console.log(user);
    return (
        <Menu>
            <MenuButton 
            as={Button} 
            display={display}
            fontSize="sm"
            rightIcon={<IoChevronDownOutline />}
            transition="all 200ms"
            variant="outline"
            >
                Account
            </MenuButton>
            <MenuList>
                {user ? 
                <MenuItem>
                   <NextLink href="/api/logout">
                       <Link>
                           Logout
                       </Link>
                   </NextLink>
               </MenuItem>
               :
                <>
                <MenuItem>
                    <NextLink href="/api/login">
                        <Link>
                            Login
                        </Link>
                    </NextLink>
                </MenuItem>

                <MenuDivider />

                <MenuItem>
                    <NextLink href="/api/login">
                        <Link>
                            Register
                        </Link>
                    </NextLink>
                </MenuItem>
                </>}
            </MenuList>
        </Menu>
    );
}

export default AccountMenu;
