import { Flex, useDisclosure } from "@chakra-ui/react";
import * as React from "react";

import Footer from "@/components/Layout/Footer/Footer";
import Nav from "@/components/Layout/Nav/Nav";
import Sidebar from "@/components/Layout/Sidebar/Sidebar";

function Layout({ children }: { children: React.ReactNode }): React.ReactElement {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <Flex as="div"
        direction="column"
        justify="space-between"
        minH="100vh"
        >
            <Nav onOpen={onOpen} />
            <Sidebar isOpen={isOpen}
            onClose={onClose}
            />
            {children}
            <Footer />
        </Flex>
    );
}

export default Layout;