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

import CustomInput from "@/components/Input/Input";
import Layout from "@/components/Layout/Layout";
import useForm from "@/hooks/useForm";
import isObjectEmpty from "@/utils/isObjectEmpty";

const Error = dynamic(import("@/components/Error/Error"));

function Login(): React.ReactElement {
  const initValues = {
    email: "", 
    password: ""
  };

  const { errors, 
    handleInputChange,
    handleSubmit, 
    loading } = useForm({ initValues });

  return (
    <Layout>
      <Heading 
      as="h2" 
      mb={[4, 4, 4, 8, 12]}
      textAlign="center"
      >
        Login
      </Heading>
      <Box 
      border="2px"
      borderColor="gray.200"
      borderRadius="md"
      p={4}
      margin="auto" 
      width={["90%", "80%", "75%", "50%"]}
      >
        <form onSubmit={handleSubmit}>
          {!isObjectEmpty(errors) && !loading
          ? <Error 
          description="Problem with username or password" 
          title="Error" 
          /> : null}
          <VStack spacing="4">
            <FormControl>
              <FormLabel>
                Email
              </FormLabel>
              <CustomInput 
              handleInputChange={handleInputChange}
              icon={<AiOutlineMail />} 
              name="email"
              placeholder="email..." 
              type="email" 
              />
              <FormHelperText 
              color={`${errors.email ? "red.300" : "black"}`}
              fontSize="xs" 
              >
                {errors.email ?? null}
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>
                Password
              </FormLabel>
              <CustomInput 
              handleInputChange={handleInputChange}
              name="password"
              placeholder="password..." 
              type="password" 
              />
              <FormHelperText 
              color={`${errors.password ? "red.300" : "gray.500"}`}
              fontSize="xs" 
              >
                {errors.password ?? null}
              </FormHelperText>
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