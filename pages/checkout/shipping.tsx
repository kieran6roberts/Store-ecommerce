import { Button,
    Checkbox, 
    Flex, 
    Heading, 
    Link, 
    StackDivider, 
    Text,
    useColorModeValue,
    VStack } from "@chakra-ui/react";
import { GetServerSideProps , NextPage } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import * as React from "react";

import CartHeader from "@/components/Cart/CartHeader/CartHeader";
import Layout from "@/components/Layout/Layout";
import { useStore } from "@/hooks/useStorage";
import { useGetUser } from "@/lib/user";
import { mapCartStorage } from "@/utils/mapCartStorage";

const Shipping: NextPage = ({ query: { data: queryData } }) => {
    const userData = JSON.parse(queryData);
    const router = useRouter();

    const { profile } = useGetUser();
    const { cartStorage } = useStore()!;

    const handleContinueCheckout = () => {
        router.push(`/checkout/payment?data=${JSON.stringify(userData)}`);
    };

    React.useEffect(() => {
        if (typeof window !== "undefined") {
            window.history.replaceState(null, "", `${window.location.origin}/checkout/shipping`);
        }

    }, []);

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
                    <Flex 
                    bg="blue.300"
                    borderRadius="sm"
                    color="white"
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
                            {userData.email} | {userData.phone}
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
                    bg="blue.300"
                    borderRadius="sm"
                    color="white"
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
                            {`${userData.address} | ${userData.addressLine2 ? userData.addressLine2 + "|" : ""} ${userData.city}`}
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
                    border="1px solid gray.200"
                    borderRadius="sm"
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
                    <Button
                    bg="pink.400"
                    borderRadius="md"
                    color="white"
                    onClick={handleContinueCheckout}
                    my={8}
                    p={8}
                    size="sm"
                    _hover={{
                        bg: "pink.500"
                    }}
                    >
                        Continue to Payment
                    </Button>
                    <NextLink 
                    href="/checkout" 
                    passHref
                    >
                        <Link 
                        border="1px solid pink"
                        bg={useColorModeValue("gray.100", "gray.700")}
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    if (!ctx.query) {
        return {
            redirect: {
                destination: "/checkout",
                permanent: false
            }
        };
    }

    const query = ctx.query;

    return {
        props: {
            query: query,
        }
    };
};

export default Shipping;