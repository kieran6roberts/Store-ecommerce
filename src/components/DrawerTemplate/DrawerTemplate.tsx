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
                    borderTop="1px solid gray"
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
                borderTop="1px solid gray"
                justifyContent="flex-start"
                >
                    {footer}
                </DrawerFooter>
            </DrawerContent>}
        </Drawer>
    );
};

export default DrawerTemplate;