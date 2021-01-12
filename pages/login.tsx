import {   Box, 
  Button, 
  FormControl,  
  FormLabel, 
  Heading, 
  VStack } from "@chakra-ui/react";
import * as React from "react";
import { AiOutlineMail } from "react-icons/ai";

import CustomInput from "@/components/Input/Input";
import Layout from "@/components/Layout/Layout";

function Login(): React.ReactElement {
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
          <FormControl>
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
              Password
            </FormLabel>
            <CustomInput 
            placeholder="password..." 
            type="password" 
            />
          </FormControl>
          <Button type="submit" variant="outline">
            Login
          </Button>
        </VStack>
      </Box>
    </Layout>
  );
}

export default Login;