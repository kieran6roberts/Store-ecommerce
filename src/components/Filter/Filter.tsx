import { Button,
    Drawer, 
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    Flex, 
    useDisclosure } from "@chakra-ui/react";
import * as React from "react";

import CustomMenuButton from "@/components/CustomMenuButton.tsx/CustomMenuButton";

const Filter = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
        <Button 
        display={["block", "block", "block", "block", "none"]}
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
        <Flex 
        display={["none", "none", "none", "none", "flex"]}
        justify="center"
        >
            <CustomMenuButton title="Product Type" listItems={["Coffee Beans", "Coffee Powder"]} />
            <CustomMenuButton title="Brand" listItems={["brand1", "brand2"]}/>
            <CustomMenuButton title="Price" listItems={["Less than £10", "Less than £20"]}/>
        </Flex>
        </>
    );
};

export default Filter;