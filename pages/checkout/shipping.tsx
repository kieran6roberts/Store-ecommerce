import { 
    Button,
    Checkbox, 
    Flex, 
    Heading, 
    Link, 
    StackDivider, 
    Text,
    useColorModeValue,
    VStack } from "@chakra-ui/react";
import { loadStripe } from "@stripe/stripe-js";
import { GetServerSideProps , NextPage } from "next";
import NextLink from "next/link";
import nookies from "nookies";
import { ParsedUrlQuery } from "querystring";
import * as React from "react";
import { BsArrowLeft } from "react-icons/bs";

import CartHeader from "@/components/Cart/CartHeader/CartHeader";
import Layout from "@/components/Layout/Layout";
import { useStore } from "@/hooks/useStorage";
import { useGetUser } from "@/lib/user";
import isObjectEmpty from "@/utils/isObjectEmpty";
import { mapCartStorage } from "@/utils/mapCartStorage";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Shipping: NextPage<{ query: ParsedUrlQuery }> = ({ query: { data: queryData } }) => {
    const userData = JSON.parse(queryData as string);

    const { cartStorage } = useStore()!;
    const { profile } = useGetUser();

    const lineItems = cartStorage?.map(item => ({ 
        id: item.id, 
        quantity: item.quantity,
        customer_email: userData.email,
    }));

    const handlePaymentInit = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        
        const stripe = await stripePromise;

        const session = await fetch("/api/create-checkout-session", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(lineItems)
        }).then(res => res.json());

        const result = stripe?.redirectToCheckout({
            sessionId: session.id
        }).then(res => {
            if (res.error) {
                console.log(res.error.message);
            }
        });
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
                flex="2"
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
                        {userData ?
                        <Text>
                            {userData.email} | {userData.phone}
                        </Text>
                        :
                        <Text>
                            Not Available
                        </Text>
                        }
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
                        {userData ?
                        <Text>
                            {`${userData.address} | ${userData.addressLine2 ? userData.addressLine2 + "|" : ""} ${userData.city}`}
                        </Text>
                        :
                        <Text>
                            Not available
                        </Text>
                        }
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
                    bg={useColorModeValue("gray.100", "gray.700")}
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
                    onClick={handlePaymentInit}
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
                        bg={useColorModeValue("gray.100", "gray.700")}
                        border="1px solid pink"
                        borderRadius="md"
                        color={useColorModeValue("gray.800", "white")}
                        display="block"
                        fontSize="sm"
                        ml="auto"
                        p={2}
                        _hover={{
                            bg: useColorModeValue("gray.200","gray.800")
                        }}
                        >
                            <BsArrowLeft style={{ display: "inline-block" }} /> Back to cart
                        </Link>
                    </NextLink>
                </VStack>
                <VStack
                as="ul"
                flex="1.5"
                divider={<StackDivider borderColor="blue.200" />}
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
    const cookies = nookies.get(ctx);

    if(!cookies["checkout-session"] || (!cookies["checkout-session"] && isObjectEmpty(ctx.query))) {
        return {
            redirect: {
                destination: "/cart",
                permanent: false
            }
        };
    }

    const queryCheck = ["email", "name", "address", "city", "country", "postcode", "phone"];

    const parsedQuery = ctx.query.data ? JSON.parse(ctx.query.data as string) : null;

    const isValidQuery = queryCheck.every(property => parsedQuery ? parsedQuery[property] : null);

    if (!isValidQuery) {
        return {
            redirect: {
                destination: "/cart",
                permanent: false
            }
        };
    }

    return {
        props: {
            query: ctx.query,
        }
    };
};

export default Shipping;