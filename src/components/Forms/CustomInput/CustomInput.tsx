import {
    FormControl,
    FormHelperText,
    FormLabel,
    Input,
    Text } from "@chakra-ui/react";
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