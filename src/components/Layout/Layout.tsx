import { Box, Flex, useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import * as React from "react";

import CartDrawer from "@/components/Cart/CartDrawer/CartDrawer";
import Footer from "@/components/Layout/Footer/Footer";
import Nav from "@/components/Layout/Nav/Nav";
import Sidebar from "@/components/Layout/Sidebar/Sidebar";
import { useStore } from "@/hooks/useStorage";
import { useGetUser } from "@/lib/user";

interface ILayout {
    children: React.ReactNode;
}

const Layout: React.FC<ILayout> = ({ children }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { profile, loading } = useGetUser();
    const { cartStorage } = useStore()!;
    const router = useRouter();

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
            userLoading={loading}
            />
            <CartDrawer />
            <Sidebar 
            cartLength={cartStorage?.length ?? 0}
            isOpen={isOpen}
            onClose={onClose}
            user={profile} 
            userLoading={loading}
            />
            <Box 
            as="main"
            flex="1"
            px={router.pathname !== "/" ? "2vw" : 0}
            >
                {children}
            </Box>
            <Footer user={profile} />
        </Flex>
    );
};

export default Layout;