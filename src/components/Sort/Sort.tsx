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
            fontSize="sm"
            mr={4}
            rightIcon={<BsArrowDownShort />}
            size="sm"
            p={{xl: 8}}
            w={{base: "10rem", xl: "15rem"}}
            >
                Sort
            </MenuButton>
            <MenuList>
                <MenuItem 
                fontSize="sm"
                onClick={() => 
                    handleAscPrice({
                        variables: {
                            sort: "publishedAt_DESC",
                        }
                })}
                px={{base: 2, xl: 20}}
                py={{base: 2, xl: 8}}
                >
                    New
                </MenuItem>
                <MenuItem 
                fontSize="sm"
                onClick={() => 
                    handleAscPrice({
                        variables: {
                            sort: "price_DESC",
                        },
                })}
                px={{base: 2, xl: 20}}
                py={{base: 2, xl: 8}}
                >
                    All: Price: High to Low
                </MenuItem>
                <MenuItem 
                fontSize="sm"
                onClick={() => 
                    handleAscPrice({
                        variables: {
                            sort: "price_ASC",
                        },
                })}
                px={{base: 2, xl: 20}}
                py={{base: 2, xl: 8}}
                >
                    All: Price: Low to High
                </MenuItem>
            </MenuList>
        </Menu>
    );
};

export default Sort;