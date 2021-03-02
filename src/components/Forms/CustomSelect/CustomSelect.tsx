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
    value: string;
}

const CustomSelect: React.FC<ICustomSelect> = ({ 
    isDisabled, 
    name, 
    options }) => {

    const mapOptionsToDOM = () => options.map(({ label, value }) => 
        <option key={generateItemKey(value)}>
            {label}
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
            isDisabled={isDisabled}
            placeholder={name}
            size="sm"
            >
               {mapOptionsToDOM()}
            </Select>
        </FormControl>
    );
};

export default CustomSelect;