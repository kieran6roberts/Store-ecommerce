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


const Filter: React.FC<IFilter> = ({ categories: { categories }, handleCategoryFilter }) => (
    <Flex justify="center">
        <CustomMenuButton title="Product Type">
            {categories.map(({ name }: ICategories) => 
                <MenuItem 
                key={generateItemKey(name)}
                onClick={() => handleCategoryFilter({
                    variables: {
                        name: name
                    }
                })}
                >
                    {name}
                </MenuItem>
            )}
        </CustomMenuButton>
    </Flex>
);


export default Filter;