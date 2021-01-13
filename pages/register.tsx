import { Box, 
  Button, 
  FormControl,  
  FormHelperText, 
  FormLabel,
  Heading,
  Spinner,
  Text,
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
      <Box 
      border="2px"
      borderColor="gray.200"
      borderRadius="md"
      margin="auto"
      p={4}
      width={["90%", "80%", "75%", "50%"]}
      >
        <Heading 
        as="h2" 
        mb={[4, 4, 4, 8, 12]}
        textAlign="center"
        >
          Register
        </Heading>
        <Text 
        fontSize="sm"
        mb={8}
        textAlign="center"
        >
          Address details are optional and can be completed after you create your account.
          These details allow us to speed up the checkout proccess for future purchases.
        </Text>
        <form onSubmit={handleSubmit}>
          <VStack spacing="4">
            <FormControl>
              <FormLabel>
                Name *
              </FormLabel>
              <CustomInput 
              handleInputChange={handleInputChange}
              name="name"
              icon={<BsPerson />} 
              placeholder="name..." 
              type="text" 
              />
              <FormHelperText 
              color={`${errors.name ? "red.300" : "black"}`}
              fontSize="xs" 
              >
                {errors.name && !loading ? errors.name : null}
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>
                Email *
              </FormLabel>
              <CustomInput 
              handleInputChange={handleInputChange}
              name="email"
              icon={<AiOutlineMail />} 
              placeholder="email..." 
              type="email" 
              />
              <FormHelperText 
              fontSize="xs" 
              color={`${errors.email ? "red.300" : "black"}`}
              >
                {errors.email && !loading ? errors.email : null}
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
              <FormHelperText 
              color={`${errors.addressLine1 ? "red.300" : "black"}`}
              fontSize="xs" 
              >
                {errors.addressLine1 && !loading ? errors.addressLine1 : null}
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
              <FormHelperText 
              color={`${errors.addressLine2 ? "red.300" : "black"}`}
              fontSize="xs" 
              >
                {errors.addressLine2 && !loading ? errors.addressLine2 : null}
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
              <FormHelperText 
              color={`${errors.state ? "red.300" : "black"}`}
              fontSize="xs" 
              >
                {errors.state && !loading ? errors.state : null}
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
              <FormHelperText 
              color={`${errors.postcode ? "red.300" : "black"}`}
              fontSize="xs" 
              >
                {errors.postcode && !loading ? errors.postcode : null}
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>
                Password *
              </FormLabel>
              <CustomInput 
              handleInputChange={handleInputChange}
              name="password"
              placeholder="password..." 
              type="password" 
              />
              <FormHelperText 
              color={`${errors.password ? "red.300" : "black"}`}
              fontSize="xs" 
              >
                {errors.password && !loading ? errors.password : null}
              </FormHelperText>
            </FormControl>
            <FormControl>
              <FormLabel>
                Confirm Password *
              </FormLabel>
              <CustomInput 
              handleInputChange={handleInputChange}
              name="confirm"
              placeholder="confirm password..." 
              type="password" 
              />
              <FormHelperText 
              color={`${errors.confirm ? "red.300" : "black"}`}
              fontSize="xs" 
              >
                {errors.confirm && !loading ? errors.confirm : null}
              </FormHelperText>
            </FormControl>
            <Button 
            type="submit" 
            mb={8}
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
          {!isObjectEmpty(errors) && !loading 
          ? <Error 
          title="Register error" 
          description="Please fill out all required fields correctly!" 
          /> 
          : null}
        </form>
      </Box>
    </Layout>
  );
}

export default Register;