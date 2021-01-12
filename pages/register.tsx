import {   Box, 
  Button, 
  FormControl,  
  FormHelperText, 
  FormLabel,
  Heading,
  VStack } from "@chakra-ui/react";
import * as React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { BsBook, BsPerson } from "react-icons/bs";

import CustomInput from "@/components/Input/Input";
import Layout from "@/components/Layout/Layout";

function Register(): React.ReactElement {
  return (
    <Layout>
      <Heading as="h2" textAlign="center">
        Login
      </Heading>
      <Box 
      as="form" 
      margin="auto"
      width={["90%", "80%", "75%", "50%"]}
      >
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
          <FormControl isRequired>
            <FormLabel>
              Address
            </FormLabel>
            <CustomInput 
            icon={<BsBook />} 
            placeholder="address..." 
            type="text" 
            />
            <FormHelperText>
              Begin typing address for autocomplete
            </FormHelperText>
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
            Register
          </Button>
        </VStack>
      </Box>
    </Layout>
  );
}

export default Register;