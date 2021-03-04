import { Button, Flex, VStack } from "@chakra-ui/react";
import * as React from "react";
import countryList from "react-select-country-list";

import CustomInput from "@/components/Forms/CustomInput/CustomInput";
import CustomSelect from "@/components/Forms/CustomSelect/CustomSelect";
import useForm from "@/hooks/useForm";
import { usersValidation } from "@/utils/validation/users";

interface ICheckoutForm {
    handleDisabled?: (value: React.SetStateAction<boolean>) => void;
    isDisabled: boolean;
    submit: (values: ICheckoutInputs) => Promise<unknown>;
    submitText: string;
    userEmail?: string;
}

export interface ICheckoutInputs {
  [key: string]: string;
}

const CheckoutForm: React.FC<ICheckoutForm> = ({ 
    isDisabled, 
    submit, 
    submitText,
    userEmail }) => {
    const countryOptions = React.useMemo(() => countryList().getData(), []);
    
    const initInputs = {
        email: userEmail ?? "",
        name: "",
        address: "",
        addressLine2: "",
        city: "",
        country: "",
        postcode: "",
        phone: "",
    };

    const { 
        handleInputChange, 
        handleSubmit, 
        inputValues } = useForm(initInputs, submit, usersValidation);
    

    return (
    <form 
    onSubmit={(event) => handleSubmit(event)}
    style={{ width: "100%" }}
    >
        <VStack spacing={4}>
            <CustomInput
            handleInputChange={(event) => handleInputChange(event)}
            isDisabled={isDisabled}
            name="email"
            type="email"
            value={inputValues.email as string}
            />
              <CustomInput
              handleInputChange={(event) => handleInputChange(event)}
              isDisabled={isDisabled}
              name="name"
              type="text"
              value={inputValues.name as string}
              />
              <CustomInput
              handleInputChange={(event) => handleInputChange(event)}
              isDisabled={isDisabled}
              name="address"
              type="text"
              value={inputValues.address as string}
              />
              <CustomInput
              handleInputChange={(event) => handleInputChange(event)}
              isDisabled={isDisabled}
              helperText="Optional"
              name="addressLine2"
              type="text"
              value={inputValues.addressLine as string}
              />
              <CustomInput
              handleInputChange={(event) => handleInputChange(event)}
              isDisabled={isDisabled}
              name="city"
              type="text"
              value={inputValues.city as string}
              />
              <Flex 
              align="center"
              w="100%"
              >
                <CustomSelect 
                isDisabled={isDisabled}
                name="country"
                options={countryOptions}
                value={inputValues.country as string}
                />
                <CustomInput
                handleInputChange={(event) => handleInputChange(event)}
                isDisabled={isDisabled}
                name="postcode"
                type="text"
                value={inputValues.postcode as string}
                />
              </Flex>
              <CustomInput
              handleInputChange={(event) => handleInputChange(event)}
              isDisabled={isDisabled}
              name="phone"
              type="text"
              value={inputValues.phone as string}
              />
            </VStack>
            <Button
            bg="pink.400"
            borderRadius="md"
            color="white"
            isDisabled={isDisabled}
            mt={8}
            p={6}
            size="sm"
            type="submit"
            _hover={{
              bg: "pink.500"
            }}
            >
              {submitText}
            </Button>
          </form>
    );
};

export default CheckoutForm;