import { Button, 
    Menu,
    MenuButton,  
    MenuList } from "@chakra-ui/react";
import * as React from "react";
import { BsArrowDownShort } from "react-icons/bs";

interface IMenuButton {
    title: string,
    children: React.ReactNode;
}

const CustomMenuButton: React.FC<IMenuButton> = ({ title, children}) => 
    <Menu>
        <MenuButton 
        as={Button}
        mr={4}
        rightIcon={<BsArrowDownShort />}
        size="sm"
        w="10rem"
        >
            {title ?? "Error"}
        </MenuButton>
        <MenuList>
            {children}
        </MenuList>
    </Menu>;

export default CustomMenuButton;