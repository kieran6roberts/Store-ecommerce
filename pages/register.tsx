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

  const { errors, 
    handleInputChange, 
    handleSubmit, 
    loading } = useForm({ initValues });

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
      border="2px"
      borderColor="gray.200"
      borderRadius="md"
      margin="auto"
      p={4}
      width={["90%", "80%", "75%", "50%"]}
      >
        <form onSubmit={handleSubmit}>
          {!isObjectEmpty(errors) && !loading 
          ? <Error title="Register error" description="Please fill out all required fields correctly!" /> 
          : null}
          <VStack spacing="4">
            <FormControl isRequired>
              <FormLabel>
                Name
              </FormLabel>
              <CustomInput 
              handleInputChange={handleInputChange}
              name="name"
              icon={<BsPerson />} 
              placeholder="name..." 
              type="text" 
              />
              <FormHelperText fontSize="xs" color={`${errors.name ? "red.300" : "black"}`}>
                {errors.name ?? null}
              </FormHelperText>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>
                Email
              </FormLabel>
              <CustomInput 
              handleInputChange={handleInputChange}
              name="email"
              icon={<AiOutlineMail />} 
              placeholder="email..." 
              type="email" 
              />
              <FormHelperText fontSize="xs" color={`${errors.email ? "red.300" : "black"}`}>
                {errors.email ?? null}
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>
                Address Line 1
              </FormLabel>
              <CustomInput 
              handleInputChange={handleInputChange}
              name="addressLine1"
              icon={<BsBook />} 
              placeholder="address line 1..." 
              type="text" 
              />
              <FormHelperText fontSize="xs" color={`${errors.addressLine1 ? "red.300" : "black"}`}>
                {errors.addressLine1 ?? null}
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>
                Address Line 2
              </FormLabel>
              <CustomInput 
              handleInputChange={handleInputChange}
              name="addressLine2"
              icon={<BsBook />} 
              placeholder="address line 2..." 
              type="text" 
              />
              <FormHelperText fontSize="xs" color={`${errors.addressLine2 ? "red.300" : "black"}`}>
                {errors.addressLine2 ?? null}
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>
                State/province/region
              </FormLabel>
              <CustomInput 
              handleInputChange={handleInputChange}
              name="state"
              icon={<BsMap />} 
              placeholder="state/province/region..." 
              type="text" 
              />
              <FormHelperText fontSize="xs" color={`${errors.state ? "red.300" : "black"}`}>
                {errors.state ?? null}
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>
                Postcode
              </FormLabel>
              <CustomInput 
              handleInputChange={handleInputChange}
              name="postcode"
              icon={<GrGlobe />} 
              placeholder="postcode..." 
              type="text" 
              />
              <FormHelperText fontSize="xs" color={`${errors.postcode ? "red.300" : "black"}`}>
                {errors.postcode ?? null}
              </FormHelperText>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>
                Password
              </FormLabel>
              <CustomInput 
              handleInputChange={handleInputChange}
              name="password"
              placeholder="password..." 
              type="password" 
              />
              <FormHelperText fontSize="xs" color={`${errors.password ? "red.300" : "black"}`}>
                {errors.password ?? null}
              </FormHelperText>
            </FormControl>
            <FormControl isRequired>
              <FormLabel>
                Confirm Password
              </FormLabel>
              <CustomInput 
              handleInputChange={handleInputChange}
              name="confirm"
              placeholder="confirm password..." 
              type="password" 
              />
              <FormHelperText fontSize="xs" color={`${errors.confirm ? "red.300" : "black"}`}>
                {errors.confirm ?? null}
              </FormHelperText>
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
        </form>
      </Box>
    </Layout>
  );
}

export default Register;