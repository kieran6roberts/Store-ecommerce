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
        fontSize="sm"
        mr={4}
        rightIcon={<BsArrowDownShort />}
        size="sm"
        p={{xl: 8}}
        w={{base: "10rem", xl: "15rem"}}
        >
            {title}
        </MenuButton>
        <MenuList>
            {children}
        </MenuList>
    </Menu>;

export default CustomMenuButton;