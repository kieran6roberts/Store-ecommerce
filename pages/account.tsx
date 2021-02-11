import { Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading, 
  Input,
  Text, 
  VStack } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import * as React from "react";

import CustomInput from "@/components/Forms/CustomInput/CustomInput";
import CustomSelect from "@/components/Forms/CustomSelect/CustomSelect";
import Layout from "@/components/Layout/Layout";
import { IUser } from "@/components/Layout/Nav/Nav";
import auth0 from "@/lib/auth";

const Account: NextPage<IUser> = ({ user }) => {
  console.log(user);
  return (
    <Layout>
      <Heading 
      as="h1"
      fontSize="xl"
      mb={12}
      pl={4}
      >
        Welcome to your user account
        <Text 
        fontSize="sm"
        fontWeight="400"
        pt={4}
        >
          {user.nickname}
        </Text>
      </Heading>
      <Flex>
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
          size="sm"
          variant="outline">
            Update Details
          </Button>
          <form style={{ width: "100%" }}>
            <VStack 
            spacing={4}
            >
              <CustomInput
              handleInputChange={() => console.log("change")}
              name="email"
              type="email"
              value=""
              />
              <CustomInput
              handleInputChange={() => console.log("change")}
              name="name"
              type="text"
              value=""
              />
              <CustomInput
              handleInputChange={() => console.log("change")}
              name="address"
              type="text"
              value=""
              />
              <CustomInput
              handleInputChange={() => console.log("change")}
              helperText="Optional"
              name="address line 2"
              type="text"
              value=""
              />
              <CustomInput
              handleInputChange={() => console.log("change")}
              name="city"
              type="text"
              value=""
              />
              <Flex 
              align="center"
              w="100%"
              >
                <CustomSelect 
                name="country/region"
                options={["Wales"]}
                />
                <CustomInput
                handleInputChange={() => console.log("change")}
                name="postcode"
                type="text"
                value=""
                />
              </Flex>
              <CustomInput
              handleInputChange={() => console.log("change")}
              name="phone"
              type="text"
              value=""
              />
            </VStack>
          </form>
        </VStack>
        <VStack flex="1">

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