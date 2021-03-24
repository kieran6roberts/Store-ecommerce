import { 
  Button, 
  Flex, 
  Text,
  VStack } from "@chakra-ui/react";
import * as React from "react";
import countryList from "react-select-country-list";

import CustomInput from "@/components/Forms/CustomInput/CustomInput";
import CustomSelect from "@/components/Forms/CustomSelect/CustomSelect";
import useForm from "@/hooks/useForm";
import isObjectEmpty from "@/utils/isObjectEmpty";
import { IUsersValidation,usersValidation } from "@/utils/validation/users";

interface ICheckoutForm {
    handleDisabled?: (value: React.SetStateAction<boolean>) => void;
    isDisabled: boolean;
    submit: (values: ICheckoutInputs) => void;
    submitText: string;
    userSavedDetails?: IUsersValidation | null;
}

export interface ICheckoutInputs {
  [key: string]: string | number;
}

export const allowedShippingCountries: any = ["GB", "FR", "DE", "IE", "NL"];

const CheckoutForm: React.FC<ICheckoutForm> = ({ 
    isDisabled, 
    submit, 
    submitText,
    userSavedDetails }) => {

    const countryOptions = React.useMemo(() => countryList().getData(), []);

    const shippingCountries = countryOptions.filter(country => allowedShippingCountries.includes(country.value));

    const initInputs = {
        email: userSavedDetails?.email ?? "",
        name: userSavedDetails?.name ?? "",
        address: userSavedDetails?.address ?? "",
        addressLine2: userSavedDetails?.addressLine2 ?? "",
        city: userSavedDetails?.city ?? "",
        country: userSavedDetails?.country ?? "",
        postcode: userSavedDetails?.postcode ?? "",
        phone: userSavedDetails?.phone ?? "",
    };

    const { 
        errors,
        handleInputChange, 
        handleSubmit, 
        inputValues } = useForm(initInputs, submit, usersValidation);
    
    const hasMounted = React.useRef(false);

    React.useEffect(() => {
      if (hasMounted.current) {
        if (!isObjectEmpty(errors)) {
          const firstInput = document.querySelector(`#${Object.keys(errors)[0]}`) as HTMLInputElement;
          firstInput? firstInput.focus() : null;
        }
      } else {
        hasMounted.current = true;
      }
    }, [ errors ]);

    return (
    <form 
    onSubmit={(event) => handleSubmit(event)}
    style={{ width: "100%" }}
    >
        <VStack spacing={4}>
            <Text 
            color="pink.400"
            fontSize="xs"
            >
              Please Fill out all required fields
            </Text>
            <CustomInput
            error={errors.email}
            handleInputChange={(event) => handleInputChange(event)}
            isDisabled={isDisabled}
            isRequired
            name="email"
            type="email"
            value={inputValues.email as string}
            />
              <CustomInput
              error={errors.name}
              handleInputChange={(event) => handleInputChange(event)}
              isDisabled={isDisabled}
              isRequired
              name="name"
              type="text"
              value={inputValues.name as string}
              />
              <CustomInput
              error={errors.address}
              handleInputChange={(event) => handleInputChange(event)}
              isDisabled={isDisabled}
              isRequired
              name="address"
              type="text"
              value={inputValues.address as string}
              />
              <CustomInput
              error={errors.addressLine2}
              handleInputChange={(event) => handleInputChange(event)}
              isDisabled={isDisabled}
              helperText="Optional"
              name="addressLine2"
              type="text"
              value={inputValues.addressLine as string}
              />
              <CustomInput
              error={errors.city}
              handleInputChange={(event) => handleInputChange(event)}
              isDisabled={isDisabled}
              isRequired
              name="city"
              type="text"
              value={inputValues.city as string}
              />
              <Flex 
              align="center"
              w="100%"
              >
                <CustomSelect 
                error={errors.country}
                handleInputChange={(event) => handleInputChange(event)}
                isDisabled={isDisabled}
                isRequired
                name="country"
                options={shippingCountries}
                value={inputValues.country as string}
                />
                <CustomInput
                error={errors.postcode}
                handleInputChange={(event) => handleInputChange(event)}
                isDisabled={isDisabled}
                isRequired
                name="postcode"
                type="text"
                value={inputValues.postcode as string}
                />
              </Flex>
              <CustomInput
              error={errors.phone}
              handleInputChange={(event) => handleInputChange(event)}
              isDisabled={isDisabled}
              isRequired
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