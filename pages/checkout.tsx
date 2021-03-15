import { ApolloClient, InMemoryCache } from "@apollo/client";
import { 
    Flex,  
    Link, 
    StackDivider, 
    Text,
    useColorModeValue,
    VStack } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import nookies from "nookies";
import * as React from "react";
import { BsArrowLeft } from "react-icons/bs";

import CartHeader from "@/components/Cart/CartHeader/CartHeader";
import CheckoutForm, { ICheckoutInputs } from "@/components/Forms/CheckoutForm/CheckoutForm";
import Layout from "@/components/Layout/Layout";
import NextHead from "@/components/NextHead/NextHead";
import { useCheckoutUpdate } from "@/hooks/useCheckoutData";
import { useStore } from "@/hooks/useStorage";
import auth0 from "@/lib/auth";
import { useGetUser } from "@/lib/user";
import { USER_DETAILS } from "@/queries/users";
import { mapCartStorage } from "@/utils/mapCartStorage";
import { IUsersValidation } from "@/utils/validation/users";

interface ICheckout {
    userInfo: IUsersValidation[];
}

const Checkout: NextPage<ICheckout> = ({ userInfo }) => {

    const { profile } = useGetUser();
    const { cartStorage } = useStore()!;
    const { handleUpdateDetails } = useCheckoutUpdate()!;
    const router = useRouter();

    const handleSubmit = (values: ICheckoutInputs) => {
        handleUpdateDetails(values);
        router.push("/checkout/shipping");
    };

    React.useEffect(() => {
        const emailElement = document.querySelector("#email") as HTMLButtonElement;
        emailElement.focus();
    }, []);

    return (
        <>
        <NextHead 
        currentURL="http://localhost:3000/checkout" 
        description="Enter your order details including your shipping address" 
        title="Shipping Details" 
        />
        <Layout>
            <Flex 
            as="section"
            flexDirection={["column", "column", "column", "column", "row"]}
            minHeight="100vh"
            m={4}
            >
                <VStack 
                align="flex-start"
                flex="2"
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
                    {userInfo ? 
                    <Text 
                    color="pink.400"
                    fontSize="xs"
                    textAlign="center"
                    w="full"
                    >
                        We have used you current saved details to save you some time
                    </Text> : null}
                    <CheckoutForm 
                    isDisabled={false}
                    submit={handleSubmit}
                    submitText="Continue to shipping"
                    userSavedDetails={userInfo ? userInfo[0] : null}
                    />
                    <NextLink 
                    href="/cart" 
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
                divider={<StackDivider borderColor="pink.50" />}
                flex="1.5"
                listStyleType="none"
                mr={["0px", "0px", "0px", "0.5rem"]}
                pl={[0, 0, 0, 8]}
                w="100%"
                >
                    {mapCartStorage(cartStorage, true)}
                </VStack>
            </Flex>
        </Layout>
        </>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const cookies = nookies.get(ctx);

    if(!cookies["checkout-session"]) {
        return {
            redirect: {
                destination: "/cart",
                permanent: false
            }
        };
    }

    const session = await auth0.getSession(ctx.req);

    if (!session) {
        return {
            props: {}
        };
    } else {
        const client = new ApolloClient({
            uri: process.env.NEXT_PUBLIC_HASURA_API!,
            cache: new InMemoryCache(),
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${session?.accessToken}`
            }
        });
        
        const { data: { users: user }} = await client.query({
            query: USER_DETAILS,
            variables: {
                id: session?.user.sub
            }
            });
        
        return {
            props: {
            userInfo: user ?? null
            }
        };
    }
};

export default Checkout;