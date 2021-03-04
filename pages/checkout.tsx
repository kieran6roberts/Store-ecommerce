import { 
    Flex,  
    Link, 
    StackDivider, 
    Text,
    useColorModeValue,
    VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import * as React from "react";

import CartHeader from "@/components/Cart/CartHeader/CartHeader";
import CheckoutForm, { ICheckoutInputs } from "@/components/Forms/CheckoutForm/CheckoutForm";
import Layout from "@/components/Layout/Layout";
import { useStore } from "@/hooks/useStorage";
import { useGetUser } from "@/lib/user";
import { mapCartStorage } from "@/utils/mapCartStorage";

const Checkout: NextPage = () => {

    const { profile } = useGetUser();
    const { cartStorage } = useStore()!;
    const router = useRouter();

    const handleSubmit = (values: ICheckoutInputs) => {
        console.log(values);
        router.push(`/checkout/shipping?data=${JSON.stringify(values)}`);
    }

    return (
        <Layout>
            <Flex 
            as="section"
            flexDirection={["column", "column", "column", "row"]}
            minHeight="100vh"
            m={4}
            >
                <VStack 
                align="flex-start"
                mb={12}
                pr={[0, 0, 8]}
                spacing={4}
                >
                    <CartHeader />
                    {!profile ? 
                    <Text 
                    fontSize="xs"
                    mb={6}
                    textAlign="right"
                    w="full"
                    >
                        Already have an account?
                        <NextLink 
                        href="/api/login" 
                        passHref
                        >
                            <Link 
                            color="pink.400"
                            display="inline-block" 
                            ml={2}
                            >
                                Sign in
                            </Link>
                        </NextLink>
                    </Text> : null}
                    <CheckoutForm 
                    isDisabled={false}
                    submit={handleSubmit}
                    submitText="Continue to shipping"
                    userEmail={profile?.email ?? null}
                    />
                    <NextLink 
                    href="/cart" 
                    passHref
                    >
                        <Link 
                        bg={useColorModeValue("gray.100", "gray.700")}
                        border="1px solid pink"
                        borderRadius="md"
                        color="pink.400"
                        display="block"
                        fontSize="sm"
                        ml="auto"
                        p={2}
                        
                        >
                            Back to cart
                        </Link>
                    </NextLink>
                </VStack>
                <VStack
                as="ul"
                divider={<StackDivider borderColor="blue.200" />}
                flex="3"
                listStyleType="none"
                mr={["0px", "0px", "0px", "0.5rem"]}
                pl={[0, 0, 8]}
                >
                    {mapCartStorage(cartStorage, true)}
                </VStack>
            </Flex>
        </Layout>
    );
};

export default Checkout;