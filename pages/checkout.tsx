import { Box,
    Divider, 
    Flex, 
    Heading, 
    Link, 
    StackDivider, 
    Text,
    VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import * as React from "react";

import { mapCartStorage } from "@/utils/mapCartStorage";
import CartItem from "@/components/Cart/CartItem/CartItem";
import CheckoutForm from "@/components/Forms/CheckoutForm/CheckoutForm";
import Layout from "@/components/Layout/Layout";
import { useStore } from "@/hooks/useStorage";
import { useGetUser } from "@/lib/user";
import { generateItemKey } from "@/utils/generateItemKey";

const Checkout: NextPage = () => {

    const router = useRouter();

    const handleSubmit = () => {
        router.push("/checkout/shipping");
    };

    const { profile } = useGetUser();
    const { cartStorage } = useStore()!;
 
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
                >
                    <Box 
                    as="header"
                    mb={8}
                    textAlign="center"
                    w="full"
                    >
                        <Heading 
                        as="h2"
                        fontSize="md"
                        >
                            Checkout 
                        </Heading>
                        <Divider 
                        mt={4} 
                        mb={2}
                        />
                        <Heading 
                        as="h3"
                        fontSize="sm"
                        >
                            Next.js e-commerce
                        </Heading>
                    </Box>
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
                        <Link display="inline-block" ml={2}>
                            Sign in
                        </Link>
                    </NextLink>
                    </Text> : null}
                    <Text 
                    fontSize="xs"
                    mb={8}
                    textAlign="center"
                    w="full"
                    >
                        Cart > Checkout > Shipping > Payment > Review
                    </Text>
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
                        <Link fontSize="sm">
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