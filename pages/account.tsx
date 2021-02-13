import { Button,
  Divider,
  Flex,
  Heading, 
  Text, 
  VStack } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import * as React from "react";
import countryList from "react-select-country-list";

import CustomInput from "@/components/Forms/CustomInput/CustomInput";
import CustomSelect from "@/components/Forms/CustomSelect/CustomSelect";
import Layout from "@/components/Layout/Layout";
import { IUser } from "@/components/Layout/Nav/Nav";
import useForm from "@/hooks/useForm";
import auth0 from "@/lib/auth";

export interface IAccountInput {
  [key: string]: string;
}
  

const Account: NextPage<IUser> = ({ user }) => {
  const initInputs = {
    email: user.email,
    name: "",
    address: "",
    addressLine2: "",
    city: "",
    country: "",
    postcode: "",
    phone: "",
  };

  const [ editDisabled, seteditDisabled ] = React.useState<boolean>(true);
  const { inputValues, handleInputChange } = useForm(initInputs, () => console.log("change"));
  const countryOptions = React.useMemo(() => countryList().getData(), []);

  return (
    <Layout>
      <Heading 
      as="h1"
      fontSize="xl"
      mb={12}
      pl={4}
      >
        Welcome to your user account
        <Divider pt={4} />
        <Text 
        fontSize="sm"
        fontWeight="400"
        pt={4}
        >
          {user.nickname}
        </Text>
      </Heading>
      <Flex direction={["column", "column", "row"]}>
        <VStack 
        align="flex-start"
        flex="1"
        pl={4}
        pr={12}
        py={2}
        spacing={8}
        >
          <Heading 
          as="h2"
          fontSize="md"
          >
            Save details for later
          </Heading>
          <Text 
          fontSize="xs"
          >
            For quick and easy future purchases with us you can save
            your details such as delivery address allowing us to speed up the
            time before they arrrive with you. 
          </Text>
          <Button
          onClick={() => seteditDisabled(!editDisabled)} 
          size="sm"
          variant="outline"
          >
            {editDisabled ? "Update Details" : "Save Details"}
          </Button>
          <form style={{ width: "100%" }}>
            <VStack 
            spacing={4}
            >
              <CustomInput
              handleInputChange={(event) => handleInputChange(event)}
              isDisabled={editDisabled}
              name="email"
              type="email"
              value={inputValues.email}
              />
              <CustomInput
              handleInputChange={(event) => handleInputChange(event)}
              isDisabled={editDisabled}
              name="name"
              type="text"
              value={inputValues.name}
              />
              <CustomInput
              handleInputChange={(event) => handleInputChange(event)}
              isDisabled={editDisabled}
              name="address"
              type="text"
              value={inputValues.address}
              />
              <CustomInput
              handleInputChange={(event) => handleInputChange(event)}
              isDisabled={editDisabled}
              helperText="Optional"
              name="addressLine2"
              type="text"
              value={inputValues.addressLine2}
              />
              <CustomInput
              handleInputChange={(event) => handleInputChange(event)}
              isDisabled={editDisabled}
              name="city"
              type="text"
              value={inputValues.city}
              />
              <Flex 
              align="center"
              w="100%"
              >
                <CustomSelect 
                isDisabled={editDisabled}
                name="country"
                options={countryOptions}
                value={inputValues.country}
                />
                <CustomInput
                handleInputChange={(event) => handleInputChange(event)}
                isDisabled={editDisabled}
                name="postcode"
                type="text"
                value={inputValues.postcode}
                />
              </Flex>
              <CustomInput
              handleInputChange={(event) => handleInputChange(event)}
              isDisabled={editDisabled}
              name="phone"
              type="text"
              value={inputValues.phone}
              />
            </VStack>
          </form>
          <Button
          onClick={() => seteditDisabled(!editDisabled)} 
          size="sm"
          variant="outline">
            {editDisabled ? "Update Details" : "Save Details"}
          </Button>
        </VStack>
        <VStack 
        align="flex-start"
        flex="1"
        >
          <Heading 
          as="h2"
          fontSize="md"
          mb={8}
          >
            Previous Orders
          </Heading>
          <Text fontSize="xs">
            No orders
          </Text>
        </VStack>
      </Flex>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await auth0.getSession(ctx.req);

  if (!session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    };
  }

  return {
    props: {
      user: session?.user ?? null
    }
  };
};

export default Account;