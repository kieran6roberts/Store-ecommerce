import {  } from "@chakra-ui/react";
import NextLink from "next/link";
import * as React from "react";

import DrawerTemplate from "@/components/DrawerTemplate/DrawerTemplate";
import AccountMenu from "@/components/Layout/AccountMenu/AccountMenu";
import CurrentUser from "@/components/Layout/CurrentUser/CurrentUser";
import { IUser } from "@/components/Layout/Nav/Nav";

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
            <AccountMenu user={user} display={["flex"]} />
            <CurrentUser user={user} userLoading={userLoading} />
        </DrawerTemplate>
    );
};

export default Sidebar;