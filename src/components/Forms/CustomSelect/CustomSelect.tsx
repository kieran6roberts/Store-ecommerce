import { FormControl,
    FormLabel,
    Select } from "@chakra-ui/react";
import * as React from "react";

import { generateItemKey } from "@/utils/generateItemKey";

interface ICustomSelect {
    name: string;
    options: Array<string>;
}

const CustomSelect: React.FC<ICustomSelect> = ({ name, options }) => {
    const mapOptionsToDOM = () => options.map(option => 
        <option key={generateItemKey(option)}>
            {option}
        </option>
        );

    return (
        <FormControl id={name}>
            <FormLabel 
            fontSize="sm"
            textTransform="capitalize"
            >
                {name}
            </FormLabel>
            <Select 
            fontSize="sm"
            placeholder="Select country">
                {mapOptionsToDOM()}
            </Select>
        </FormControl>
    );
};

export default CustomSelect;