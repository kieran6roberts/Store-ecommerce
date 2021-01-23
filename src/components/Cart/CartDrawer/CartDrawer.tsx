import { Button, useDisclosure } from "@chakra-ui/react";
import * as React from "react";
import { BsArrowBarLeft } from "react-icons/bs";

import DrawerTemplate from "@/components/DrawerTemplate/DrawerTemplate";

const CartDrawer = (): React.ReactElement => {

    const { isOpen, onOpen, onClose} = useDisclosure();

    return (
        <>
        <Button 
        leftIcon={<BsArrowBarLeft />}
        onClick={onOpen}
        w="5rem"
        ml="auto"
        mr={4}
        variant="ghost"
        >
            Cart
        </Button>
        <DrawerTemplate
        header="What's in your bag"
        footer="Footer"
        isOpen={isOpen}
        onClose={onClose}
        size="md"
        >
            Cart
        </DrawerTemplate>
        </>
    );
};

export default CartDrawer;