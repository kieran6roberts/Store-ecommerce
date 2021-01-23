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
    size?: string;
}

const DrawerTemplate = ({ 
    children, 
    header, 
    footer,
    isOpen,
    onClose,
    size = "sm" }: ICartDrawer): React.ReactElement => {

    return (
        <Drawer 
        isOpen={isOpen}
        onClose={onClose}
        placement="right"
        size={size}
        >
            <DrawerOverlay>
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        {header}
                    </DrawerHeader>
                    <DrawerBody>
                        {children}
                    </DrawerBody>
                    <DrawerFooter>
                        {footer}
                    </DrawerFooter>
                </DrawerContent>
            </DrawerOverlay>
        </Drawer>
    );
};

export default DrawerTemplate;