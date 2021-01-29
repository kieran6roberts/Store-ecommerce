import { Button, 
    Menu,
    MenuButton, 
    MenuItem, 
    MenuList } from "@chakra-ui/react";
import * as React from "react";
import { BsArrowDownShort } from "react-icons/bs";

const Sort = (): React.ReactElement => {
    return (
        <Menu>
            <MenuButton 
            as={Button}
            mr={4}
            rightIcon={<BsArrowDownShort />}
            w="10rem"
            >
                Sort
            </MenuButton>
            <MenuList>
                <MenuItem>
                    New
                </MenuItem>
                <MenuItem>
                    Price: High to Low
                </MenuItem>
                <MenuItem>
                    Price: Low to High
                </MenuItem>
                <MenuItem>
                    Rating: High to Low
                </MenuItem>
                <MenuItem>
                    Rating: Low to High
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

export default Sort;