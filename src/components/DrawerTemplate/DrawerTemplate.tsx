import { Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay } from "@chakra-ui/react";
import * as React from "react";

interface ICartDrawer {
    children: React.ReactNode;
    header: string;
    footer: string;
    isOpen: boolean;
    onClose: () => void;
    placement: "top" | "left" | "right" | "bottom" | undefined;
    size?: string;
}

const DrawerTemplate = ({ 
    children, 
    header, 
    footer,
    isOpen,
    onClose,
    placement,
    size = "sm" }: ICartDrawer): React.ReactElement => {

    return (
        <Drawer 
        blockScrollOnMount={true}
        isOpen={isOpen}
        onClose={onClose}
        placement={placement}
        size={size}
        >
            <DrawerOverlay>
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader 
                    fontSize="md"
                    mb={4}
                    >
                        {header}
                    </DrawerHeader>
                    <DrawerBody>
                        {children}
                    </DrawerBody>
                    <DrawerFooter
                    bg="gray.900"
                    color="white"
                    fontWeight="700"
                    fontSize="xs"
                    justifyContent="flex-start"
                    >
                        {footer}
                    </DrawerFooter>
                </DrawerContent>
            </DrawerOverlay>
        </Drawer>
    );
};

export default DrawerTemplate;