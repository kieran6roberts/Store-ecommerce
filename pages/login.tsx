import {   Box, 
  Button, 
  FormControl,  
  FormLabel, 
  Heading, 
  Spinner,
  VStack } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import * as React from "react";
import { AiOutlineMail } from "react-icons/ai";

import CustomInput from "@/components/Input/Input";
import Layout from "@/components/Layout/Layout";
import useForm from "@/hooks/useForm";
import isObjectEmpty from "@/utils/isObjectEmpty";

const Error = dynamic(import("@/components/Error/Error"));

function Login(): React.ReactElement {
  const { errors, handleSubmit, loading } = useForm({ email: "", password: ""});

  return (
    <Layout>
      <Heading as="h2" textAlign="center">
        Login
      </Heading>
      <Box margin="auto"   width={["90%", "80%", "75%", "50%"]}>
        <form onSubmit={handleSubmit}>
          {isObjectEmpty(errors) ? <Error title="Error" description="Problem with username or password" /> : null}
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
            <Button 
            type="submit" 
            variant="outline"
            >
              {loading ? <Spinner 
              color="blue.300" 
              size="sm"
              speed="0.5s"
              /> : "Login"}
            </Button>
          </VStack>
        </form>
      </Box>
    </Layout>
  );
}

export default Login;