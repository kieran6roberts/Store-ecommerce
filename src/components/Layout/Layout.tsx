import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import * as React from "react";

import Footer from "@/components/Layout/Footer/Footer";
import Nav from "@/components/Layout/Nav/Nav";
import Sidebar from "@/components/Layout/Sidebar/Sidebar";
import { useGetUser } from "@/lib/user";

interface ILayout {
    children: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { profile, loading } = useGetUser();
    console.log(profile);

    return (
        <Flex 
        as="div"
        direction="column"
        justify="space-between"
        minH="100vh"
        >
            <Nav 
            onOpen={onOpen} 
            user={profile} 
            />
            <Sidebar 
            isOpen={isOpen}
            onClose={onClose}
            user={profile} 
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