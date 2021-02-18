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
    overlay: boolean;
    size?: string;
}

const DrawerTemplate = ({ 
    children, 
    header, 
    footer,
    isOpen,
    onClose,
    overlay = true,
    size = "sm" }: ICartDrawer): React.ReactElement => {

    return (
        <Drawer 
        blockScrollOnMount={true}
        isOpen={isOpen}
        onClose={onClose}
        placement="right"
        size={size}
        >
            {overlay ? 
            <DrawerOverlay>
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        {header}
                    </DrawerHeader>
                    <DrawerBody>
                        {children}
                    </DrawerBody>
                    <DrawerFooter
                    justifyContent="flex-start"
                    >
                        {footer}
                    </DrawerFooter>
                </DrawerContent>
            </DrawerOverlay>
            : 
            <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>
                    {header}
                </DrawerHeader>
                <DrawerBody>
                    {children}
                </DrawerBody>
                <DrawerFooter 
                color="gray.800"
                fontSize="xs"
                bgGradient="linear(90deg, blue.200, pink.100)"
                justifyContent="flex-start"
                >
                    {footer}
                </DrawerFooter>
            </DrawerContent>}
        </Drawer>
    );
};

export default DrawerTemplate;