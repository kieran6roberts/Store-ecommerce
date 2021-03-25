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
        <CustomMenuButton title="Product Type" p={{xl: 8}}>
            {categories.map(({ name }: ICategories) => 
                <MenuItem 
                fontSize="sm"
                key={generateItemKey(name)}
                onClick={() => handleCategoryFilter({
                    variables: {
                        name: name
                    }
                })}
                px={{base: 2, xl: 20}}
                py={{base: 2, xl: 8}}
                >
                    {name}
                </MenuItem>
            )}
        </CustomMenuButton>
    </Flex>
);


export default Filter;