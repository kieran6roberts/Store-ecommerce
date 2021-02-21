import { Button,
    Link,    
    Menu,
    MenuButton,
    MenuItem,    
    MenuList } from "@chakra-ui/react";
    import NextLink from "next/link";
import * as React from "react";
import { IoChevronDownOutline } from "react-icons/io5";

import { IUser } from "@/components/Layout/Nav/Nav";

interface IAccountMenu {
    display: string[];
    user: IUser;
    variant?: string;
}

const AccountMenu: React.FC<IAccountMenu> = ({ display, user, variant = "outline" }) => {
    return (
        <Menu>
            <MenuButton 
            as={Button} 
            display={display}
            fontSize="xs"
            rightIcon={<IoChevronDownOutline />}
            transition="all 200ms"
            variant={variant}
            >
                Account
            </MenuButton>
            <MenuList 
            fontSize="xs">
            {user ? 
                <>
                <MenuItem>
                   <NextLink href="/api/logout">
                       <Link>
                           Logout
                       </Link>
                   </NextLink>
               </MenuItem>
                <MenuItem>
                    <NextLink href="/account">
                       <Link>
                           Account
                       </Link>
                    </NextLink>
               </MenuItem>
               </>
               :
                <MenuItem>
                    <NextLink href="/api/login">
                        <Link>
                            Login/Register
                        </Link>
                    </NextLink>
                </MenuItem>}
            </MenuList>
        </Menu>
    );
};

export default AccountMenu;
