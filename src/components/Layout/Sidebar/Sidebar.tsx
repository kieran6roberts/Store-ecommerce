import { Flex, useColorModeValue, VStack } from "@chakra-ui/react";
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
        header="Kieran's Coffee Collection"
        footer="Kieran's Coffee Collection @2021"
        isOpen={isOpen} 
        onClose={onClose} 
        placement="left"
        size="xs"
        >
            <Flex 
            bg={useColorModeValue("gray.50", "gray.800")}
            borderRadius="md"
            fontSize="xs"
            mb={6}
            p={2}
            >
                <AccountMenu 
                user={user} 
                display={["flex"]} 
                variant="solid"
                />
                <CurrentUser 
                justify="center"
                user={user} 
                userLoading={userLoading} 
                />
            </Flex>
            <VStack
            as="ul"
            align="flex-start"
            flexDirection="column"
            listStyleType="none"
            spacing={10}
            >
                <NavLinks isStyled={true} />
            </VStack>
        </DrawerTemplate>
    );
};

export default Sidebar;