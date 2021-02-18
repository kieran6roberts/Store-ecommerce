import { Box,
    Button,
    Checkbox,
    Divider, 
    Flex, 
    Heading, 
    Link, 
    StackDivider, 
    Text,
    VStack } from "@chakra-ui/react";
import * as React from "react";

import countryList from "react-select-country-list";
import NextLink from "next/link";
import Layout from "@/components/Layout/Layout";
import { useGetUser } from "@/lib/user";
import { mapCartStorage } from "@/utils/mapCartStorage";
import { useStore } from "@/hooks/useStorage";
import useForm from "@/hooks/useForm";

const Shipping = () => {
    const initInputs = {
        address: "",
        addressLine2: "",
        city: "",
        country: "",
        postcode: ""
    };

    const countryOptions = React.useMemo(() => countryList().getData(), []);
    const { profile } = useGetUser();
    const { cartStorage } = useStore()!;
       const { 
        handleInputChange, 
        handleSubmit, 
        inputValues } = useForm(initInputs, () => console.log("submit"), null);

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
                flex="3"
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
                            Shipping Details
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
                    <Flex 
                    border="1px solid gray"
                    fontSize="sm"
                    justify="space-between"
                    maxW="800px"
                    p={2}
                    w="full"
                    >
                        <Text>
                            Contact
                        </Text>
                        <Text>
                            {profile?.email ?? "null"}
                        </Text>
                        <Text>
                            <NextLink 
                            href="/checkout" 
                            passHref
                            >
                                <Link>
                                  Change
                                </Link>
                            </NextLink>
                        </Text>
                    </Flex>
                    <Flex 
                    border="1px solid gray"
                    fontSize="sm"
                    justify="space-between"
                    maxW="800px"
                    mb={8}
                    p={2}
                    w="full"
                    >
                        <Text>
                            Shipping To
                        </Text>
                        <Text>
                            Pull address here
                        </Text>
                        <Text>
                            <NextLink 
                            href="/checkout" 
                            passHref
                            >
                                <Link>
                                  Change
                                </Link>
                            </NextLink>
                        </Text>
                    </Flex>
                    <Heading 
                    as="h3"
                    fontSize="md"
                    >
                        Shipping Method
                    </Heading>
                    <Flex 
                    border="1px solid gray"
                    fontSize="sm"
                    justify="space-between"
                    maxW="800px"
                    mb={8}
                    p={2}
                    w="full"
                    >
                        <Checkbox 
                        defaultChecked
                        isDisabled
                        >
                            Free Shipping for orders over £25
                        </Checkbox>
                        <Text>
                            Free
                        </Text>
                    </Flex>
                    <NextLink href="/checkout/payment" passHref>
                        <Link 
                        border="1px solid black"
                        p={4}
                        >
                            Continue to Payment
                        </Link>
                    </NextLink>
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
                    {mapCartStorage(cartStorage)}
                </VStack>
            </Flex>
        </Layout>
    );
};

export default Shipping;