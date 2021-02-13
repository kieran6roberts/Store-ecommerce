import { FormControl,
    FormLabel,
    Select } from "@chakra-ui/react";
import * as React from "react";

import { generateItemKey } from "@/utils/generateItemKey";

interface ICountry {
    label: string;
    value: string;
}

interface ICustomSelect {
    isDisabled: boolean;
    name: string;
    options: ICountry[];
}

const CustomSelect: React.FC<ICustomSelect> = ({ 
    isDisabled, 
    name, 
    options }) => {

    const mapOptionsToDOM = () => options.map(option => 
        <option key={generateItemKey(option.value)}>
            {option.label}
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
            isDisabled={isDisabled}
            fontSize="sm"
            placeholder={name}
            >
               {mapOptionsToDOM()}
            </Select>
        </FormControl>
    );
};

export default CustomSelect;