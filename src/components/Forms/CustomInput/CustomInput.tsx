import {
    FormControl,
    FormErrorMessage,
    FormHelperText,
    FormLabel,
    Input } from "@chakra-ui/react";
import * as React from "react";

interface ICustomInput {
    error: string;
    handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    helperText?: string;
    name: string;
    isDisabled: boolean;
    isRequired?: boolean;
    type: string;
    value: string;
}

const CustomInput: React.FC<ICustomInput> = ({ 
    error,
    handleInputChange,
    helperText, 
    isDisabled,
    isRequired,
    name,
    type,
    value }) => {

        console.log(error);

    return (
        <FormControl id={name}>
            <FormLabel 
            fontSize="sm"
            textTransform="capitalize"
            >
              {name} <span style={{ color: "red" }}>{isRequired ? "*" : null}</span>
            </FormLabel>
            <FormErrorMessage fontSize="sm" color="white">
                {error}
            </FormErrorMessage>
            <Input
            errorBorderColor="red.400"
            isInvalid={error ? true : false}
            isDisabled={isDisabled}
            onChange={(event) => handleInputChange(event)}
            name={name} 
            placeholder={error ?? null}
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