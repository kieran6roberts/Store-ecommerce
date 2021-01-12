import {   Box, 
  Button, 
  FormControl,  
  FormLabel, 
  VStack } from "@chakra-ui/react";
import * as React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri";

import CustomInput from "@/components/Input/Input";
import Layout from "@/components/Layout/Layout";

function Login(): React.ReactElement {
  return (
    <Layout>
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
          <Button variant="outline">
            Login
          </Button>
        </VStack>
      </Box>
    </Layout>
  );
}

export default Login;