import { Flex, List } from "@chakra-ui/react";
import NextLink from "next/link";
import * as React from "react";

import DrawerTemplate from "@/components/DrawerTemplate/DrawerTemplate";
import AccountMenu from "@/components/Layout/AccountMenu/AccountMenu";
import CurrentUser from "@/components/Layout/CurrentUser/CurrentUser";
import { IUser } from "@/components/Layout/Nav/Nav";
import NavLinks from "../NavLinks/NavLinks";

interface ISidebar {
    isOpen: boolean;
    onClose: () => void;
    user: IUser;
    userLoading: boolean;
}

const Sidebar = ({ isOpen, onClose, user, userLoading }: ISidebar): React.ReactElement => {
    return (
        <DrawerTemplate 
        header="Next.js E-commerce"
        footer="Next.js e-commerce"
        isOpen={isOpen} 
        onClose={onClose} 
        placement="left"
        size="xs"
        user={user} 
        >
            <Flex>
                <AccountMenu 
                user={user} 
                display={["flex"]} 
                />
                <CurrentUser 
                user={user} 
                userLoading={userLoading} 
                />
            </Flex>
            <List 
            display="flex"
            flexDirection="column"
            >
                <NavLinks />
            </List>
        </DrawerTemplate>
    );
};

export default Sidebar;