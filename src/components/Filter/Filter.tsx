import { Button, Flex, useDisclosure } from "@chakra-ui/react";
import * as React from "react";

import CustomMenuButton from "@/components/CustomMenuButton/CustomMenuButton";
import DrawerTemplate from "@/components/DrawerTemplate/DrawerTemplate";

const Filter = (): React.ReactElement => {

    const { isOpen, onOpen, onClose} = useDisclosure();
    
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
        <DrawerTemplate
        header="Filter"
        footer="Footer"
        isOpen={isOpen}
        onClose={onClose}
        >
            Body
        </DrawerTemplate>
        <Flex 
        display={["none", "none", "none", "none", "flex"]}
        justify="center"
        >
            <CustomMenuButton 
            listItems={["Coffee Beans", "Coffee Powder"]} 
            title="Product Type" 
            />
            <CustomMenuButton 
            listItems={["brand1", "brand2"]}
            title="Brand" 
            />
            <CustomMenuButton 
            listItems={["Less than £10", "Less than £20"]}
            title="Price" 
            />
        </Flex>
        </>
    );
};

export default Filter;