import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import * as React from "react";

import Footer from "@/components/Layout/Footer/Footer";
import Nav from "@/components/Layout/Nav/Nav";
import Sidebar from "@/components/Layout/Sidebar/Sidebar";
import { IUser } from "@/pages/index";

interface ILayout {
    children: React.ReactNode;
    user: IUser;
}

const Layout: React.FC<ILayout> = ({ children, user }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Flex 
        as="div"
        direction="column"
        justify="space-between"
        minH="100vh"
        >
            <Nav 
            onOpen={onOpen} 
            user={user} 
            />
            <Sidebar 
            isOpen={isOpen}
            onClose={onClose}
            user={user} 
            />
            <Box 
            as="main"
            flex="1"
            p="1rem"
            >
                {children}
            </Box>
            <Footer />
        </Flex>
    );
};

export default Layout;