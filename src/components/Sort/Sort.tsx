import { QueryLazyOptions } from "@apollo/client";
import { Button, 
    Menu,
    MenuButton, 
    MenuItem, 
    MenuList } from "@chakra-ui/react";
import * as React from "react";
import { BsArrowDownShort } from "react-icons/bs";

interface ISort {
    handleAscPrice: (options?: QueryLazyOptions<Record<string, any>> | undefined) => void;
}

const Sort: React.FC<ISort> = ({ handleAscPrice }): React.ReactElement => {
   
    return (
        <Menu>
            <MenuButton 
            as={Button}
            mr={4}
            rightIcon={<BsArrowDownShort />}
            size="sm"
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
                    All: Price: High to Low
                </MenuItem>
                <MenuItem onClick={() => 
                    handleAscPrice({
                        variables: {
                            sort: "price_ASC",
                        },
                })}>
                    All: Price: Low to High
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

export default Sort;