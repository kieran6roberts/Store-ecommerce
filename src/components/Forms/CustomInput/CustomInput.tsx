import {
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input } from "@chakra-ui/react";
import * as React from "react";

interface ICustomInput {
    handleInputChange: (event: React.ChangeEvent) => void;
    helperText?: string;
    name: string;
    isDisabled: boolean;
    type: string;
    value: string;
}

const CustomInput: React.FC<ICustomInput> = ({ 
    handleInputChange,
    helperText, 
    isDisabled,
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
            isDisabled={isDisabled}
            onChange={(event) => handleInputChange(event)}
            name={name} 
            size="sm"
            type={type} 
            value={value}
            />
            {helperText ? 
            <FormHelperText fontSize="xs">
                {helperText}
            </FormHelperText>
            : null}
        </FormControl>
    );
};

export default CustomInput;