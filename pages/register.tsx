import {   Box, 
  Button, 
  FormControl,  
  FormHelperText, 
  FormLabel,
  Heading,
  Spinner,
  VStack } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import * as React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BsBook, BsMap, BsPerson } from "react-icons/bs";
import { GrGlobe } from "react-icons/gr";

import CustomInput from "@/components/Input/Input";
import Layout from "@/components/Layout/Layout";
import useForm from "@/hooks/useForm";
import isObjectEmpty from "@/utils/isObjectEmpty";

const Error = dynamic(import("@/components/Error/Error"));

function Register(): React.ReactElement {
  const initValues = {
    name: "",
    email: "",
    addressLine1: "",
    addressLine2: "",
    state: "",
    postcode: "",
    password: "",
    confirm: ""
  };

  const { errors, handleSubmit, loading } = useForm(initValues);
  
  return (
    <Layout>
      <Heading 
      as="h2" 
      textAlign="center"
      mb={[4, 4, 4, 8, 12]}
      >
        Register
      </Heading>
      <Box 
      as="form" 
      margin="auto"
      width={["90%", "80%", "75%", "50%"]}
      >
        {isObjectEmpty(errors) ? <Error title="Register error" description="Please fill out all required fields correctly!" /> : null}

        <VStack spacing="4">
          <FormControl isRequired>
            <FormLabel>
              Name
            </FormLabel>
            <CustomInput 
            icon={<BsPerson />} 
            placeholder="name..." 
            type="text" 
            />
            <FormHelperText>
              Your full name
            </FormHelperText>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>
              Email
            </FormLabel>
            <CustomInput 
            icon={<AiOutlineMail />} 
            placeholder="email..." 
            type="email" 
            />
          </FormControl>
          <FormControl>
            <FormLabel>
              Address Line 1
            </FormLabel>
            <CustomInput 
            icon={<BsBook />} 
            placeholder="address line 1..." 
            type="text" 
            />
            <FormHelperText color="blue.300">
              Address is optional. You can choose to fill out these fields later in account settings.
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel>
              Address Line 2
            </FormLabel>
            <CustomInput 
            icon={<BsBook />} 
            placeholder="address line 2..." 
            type="text" 
            />
          </FormControl>
          <FormControl>
            <FormLabel>
              State/province/region
            </FormLabel>
            <CustomInput 
            icon={<BsMap />} 
            placeholder="state/province/region..." 
            type="text" 
            />
          </FormControl>
          <FormControl>
            <FormLabel>
              Postcode
            </FormLabel>
            <CustomInput 
            icon={<GrGlobe />} 
            placeholder="postcode..." 
            type="text" 
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>
              Password
            </FormLabel>
            <CustomInput 
            placeholder="password..." 
            type="password" 
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>
              Confirm Password
            </FormLabel>
            <CustomInput 
            placeholder="confirm password..." 
            type="password" 
            />
          </FormControl>
          <Button 
          type="submit" 
          variant="outline"
          width="50%"
          >
            {loading ? <Spinner 
            color="blue.300" 
            size="sm"
            speed="0.5s"
             /> : "Register"}
          </Button>
        </VStack>
      </Box>
    </Layout>
  );
}

export default Register;