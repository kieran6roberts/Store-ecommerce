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
    submit: () => unknown;
    submitText: string;
    userEmail?: string;
}

const CheckoutForm: React.FC<ICheckoutForm> = ({ 
    handleDisabled, 
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
            value={inputValues.email}
            />
              <CustomInput
              handleInputChange={(event) => handleInputChange(event)}
              isDisabled={isDisabled}
              name="name"
              type="text"
              value={inputValues.name}
              />
              <CustomInput
              handleInputChange={(event) => handleInputChange(event)}
              isDisabled={isDisabled}
              name="address"
              type="text"
              value={inputValues.address}
              />
              <CustomInput
              handleInputChange={(event) => handleInputChange(event)}
              isDisabled={isDisabled}
              helperText="Optional"
              name="addressLine2"
              type="text"
              value={inputValues.addressLine2}
              />
              <CustomInput
              handleInputChange={(event) => handleInputChange(event)}
              isDisabled={isDisabled}
              name="city"
              type="text"
              value={inputValues.city}
              />
              <Flex 
              align="center"
              w="100%"
              >
                <CustomSelect 
                isDisabled={isDisabled}
                name="country"
                options={countryOptions}
                value={inputValues.country}
                />
                <CustomInput
                handleInputChange={(event) => handleInputChange(event)}
                isDisabled={isDisabled}
                name="postcode"
                type="text"
                value={inputValues.postcode}
                />
              </Flex>
              <CustomInput
              handleInputChange={(event) => handleInputChange(event)}
              isDisabled={isDisabled}
              name="phone"
              type="text"
              value={inputValues.phone}
              />
            </VStack>
            <Button
            colorScheme="pink"
            isDisabled={isDisabled}
            mt={8}
            p={6}
            size="sm"
            type="submit"
            variant="solid">
              {submitText}
            </Button>
          </form>
    );
};

export default CheckoutForm;