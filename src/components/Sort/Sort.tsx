import { PRODUCT_SORT } from "@/queries/products";
import { Button, 
    Menu,
    MenuButton, 
    MenuItem, 
    MenuList } from "@chakra-ui/react";
import * as React from "react";
import { BsArrowDownShort } from "react-icons/bs";

interface ISort {

}

const Sort = ({ handleAscPrice }): React.ReactElement => {
   
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
                <MenuItem onClick={() => 
                    handleAscPrice({
                        variables: {
                            sort: "publishedAt_DESC",
                        }
                })}>
                    New
                </MenuItem>
                <MenuItem onClick={() => 
                    handleAscPrice({
                        variables: {
                            sort: "price_DESC",
                        },
                })}>
                    Price: High to Low
                </MenuItem>
                <MenuItem onClick={() => 
                    handleAscPrice({
                        variables: {
                            sort: "price_ASC",
                        },
                })}>
                    Price: Low to High
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

export default Sort;