import {
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input } from "@chakra-ui/react";
import * as React from "react";

interface ICustomInput {
    handleInputChange: (event: React.ChangeEvent) => void;
    name: string;
    type: string;
    value: string;
}

const CustomInput: React.FC<ICustomInput> = ({ 
    handleInputChange, 
    name,
    type,
    value }) => {

    return (
        <FormControl id={name}>
            <FormLabel 
            fontSize="sm"
            textTransform="capitalize"
            >
              {name}
            </FormLabel>
            <Input
            onChange={(event) => handleInputChange(event)}
            name={name} 
            type={type} 
            value={value}
            />
            <FormHelperText></FormHelperText>
        </FormControl>
    );
};

export default CustomInput;