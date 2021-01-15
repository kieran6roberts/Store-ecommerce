import { Button, 
    Drawer, 
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    useDisclosure } from "@chakra-ui/react";
import * as React from "react";

const Filter = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
        <Button 
        onClick={onOpen}
        ml={4}
        w="10rem"
        >
            Filter
        </Button>
        <Drawer 
        isOpen={isOpen}
        onClose={onClose}
        placement="right"
        >
            <DrawerOverlay>
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>
                        Filter
                    </DrawerHeader>
                    <DrawerBody>

                    </DrawerBody>
                    <DrawerFooter>

                    </DrawerFooter>
                </DrawerContent>
            </DrawerOverlay>
        </Drawer>
        </>
    );
};

export default Filter;