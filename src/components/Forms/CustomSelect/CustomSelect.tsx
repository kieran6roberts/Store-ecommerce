import { 
    FormControl,
    FormLabel,
    Select,
    Text } from "@chakra-ui/react";
import * as React from "react";

import { generateItemKey } from "@/utils/generateItemKey";

interface ICountry {
    label: string;
    value: string;
}

interface ICustomSelect {
    error: string;
    handleInputChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
    isDisabled: boolean;
    isRequired?: boolean;
    name: string;
    options: ICountry[];
    value: string;
}

const CustomSelect: React.FC<ICustomSelect> = ({ 
    error,
    handleInputChange,
    isDisabled, 
    isRequired,
    name, 
    options,
    value }) => {

    const mapOptionsToDOM = () => options.map(({ label, value }) => 
        <option key={generateItemKey(value)}>
            {label}
        </option>
        );

    return (
        <FormControl id={name}>
            <FormLabel 
            display="inline-block"
            fontSize="sm"
            textTransform="capitalize"
            >
                {name} <span style={{ color: "red" }}>{isRequired ? "*" : null}</span>
            </FormLabel>
            <Text 
            color="red.400"
            display="inline-block"
            fontSize="xs"
            >
                  {error}
            </Text>
            <Select 
            fontSize="sm"
            onChange={(event) => handleInputChange(event)}
            errorBorderColor="red.400"
            isInvalid={error ? true : false}
            isDisabled={isDisabled}
            name={name}
            placeholder={name}
            size="sm"
            value={value}
            >
               {mapOptionsToDOM()}
            </Select>
        </FormControl>
    );
};

export default CustomSelect;