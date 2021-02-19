import { QueryLazyOptions } from "@apollo/client";
import { Flex, MenuItem } from "@chakra-ui/react";
import * as React from "react";

import CustomMenuButton from "@/components/CustomMenuButton/CustomMenuButton";
import { generateItemKey } from "@/utils/generateItemKey";

interface ICategories {
    __typename: string;
    name: string;
}

interface IFilter {
   categories: {
       categories: ICategories[]
   },
   handleCategoryFilter: (options?: QueryLazyOptions<Record<string, any>> | undefined) => void;
}


const Filter: React.FC<IFilter> = ({ categories: { categories }, handleCategoryFilter }): React.ReactElement => {
    return (
        <Flex justify="center">
            <CustomMenuButton title="Product Type">
                {categories.map((cat: ICategories) => 
                    <MenuItem 
                    key={generateItemKey(cat.name)}
                    onClick={() => handleCategoryFilter({
                        variables: {
                            name: cat.name
                        }
                    })}
                    >
                        {cat.name}
                    </MenuItem>
                )}
            </CustomMenuButton>
        </Flex>
    );
};

export default Filter;