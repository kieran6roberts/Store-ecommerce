import { useQuery } from "@apollo/client";
import { 
    Box,
    Flex, 
    Heading,
    Link, 
    Text,
    useColorModeValue, 
    VStack } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import NextLink from "next/link";
import nookies from "nookies";
import { ParsedUrlQuery } from "querystring";
import * as React from "react";

import CartHeader from "@/components/Cart/CartHeader/CartHeader";
import Layout from "@/components/Layout/Layout";
import LoadingSpinner from "@/components/LoadingSpinner/LoadingSpinner";
import NextHead from "@/components/NextHead/NextHead";
import { USER_ORDER } from "@/queries/orders";
import { formatPrice } from "@/utils/formatPrice";
import { nowDate } from "@/utils/nowDate";
import { setStorage } from "@/utils/storage";

interface IReview {
    query: ParsedUrlQuery
}

const Review: NextPage<IReview> = ({ query }) => {
    const { data: orderData, loading, error } = useQuery(USER_ORDER, {
        variables: {
            id: query.id
        }
    });

    if (loading) {
        return (
            <Box minH="75vh">
                <LoadingSpinner/>
            </Box>
        );
    }

    if (error) {
        return (
            <Box minH="75vh">
                <Text>
                    There was a problem fetching your order details.
                </Text>
            </Box>
        );
    }

    const [ order ] = orderData.orders;
    
    if (typeof window !== "undefined") {
        window.history.replaceState(null, "", `${window.location.origin}/checkout/review`);
        setStorage("cart-products", []);
    }

    return (
        <>
        <NextHead 
        currentURL="http://localhost:3000/checkout/review" 
        description="Review your new order details" 
        title="Order Review" 
        />
        <Layout>
            <Flex        
            as="section"
            flexDirection={["column", "column", "column", "row"]}
            m={4}
            >
                <VStack 
                w="full"
                >
                    <Flex 
                    bg={useColorModeValue("gray.100", "gray.700")}
                    borderRadius="md"
                    color="pink.400"
                    justify="center"
                    mb={4}
                    p={8}
                    textTransform="uppercase"
                    w="full"
                    >
                        Order Completed Successfully
                    </Flex>
                    <Flex 
                    justify="space-evenly"
                    w="full"
                    >
                        <Box flex="1">
                            <CartHeader />
                            <VStack 
                            as="article"
                            bg={useColorModeValue("gray.50", "gray.700")}
                            borderRadius="sm"
                            fontSize="sm"
                            p={12}
                            >
                                <Heading 
                                as="h3"
                                fontSize="lg"
                                mb={8}
                                textAlign="center"
                                >
                                    Order Summary
                                </Heading>
                                <Flex 
                                bg={useColorModeValue("gray.100", "gray.600")}
                                borderRadius="sm"
                                justify="flex-start"
                                py={4}
                                px={2}
                                w="100%"
                                >
                                    <Text 
                                    fontWeight="700"
                                    mx={4}
                                    >
                                        Order placed on:
                                    </Text>
                                    <Text mx={4}>
                                        {nowDate()}
                                    </Text>
                                </Flex>
                                <Flex 
                                bg={useColorModeValue("gray.100", "gray.600")}
                                borderRadius="sm"
                                justify="flex-start"
                                py={4}
                                px={2}
                                w="100%"
                                >
                                    <Text 
                                    fontWeight="700"
                                    mx={4}
                                    >
                                        Email: 
                                    </Text>
                                    <Text mx={4}>
                                        {order.email}
                                    </Text>
                                </Flex>
                                <Flex 
                                bg={useColorModeValue("gray.100", "gray.600")}
                                borderRadius="sm"
                                justify="flex-start"
                                py={4}
                                px={2}
                                w="100%"
                                >
                                    <Text 
                                    fontWeight="700"
                                    mx={4}
                                    >
                                        Total:
                                    </Text>
                                    <Text mx={4}>
                                        {formatPrice(order.total)}
                                    </Text>
                                </Flex>
                                <Flex 
                                bg={useColorModeValue("gray.100", "gray.600")}
                                borderRadius="sm"
                                justify="flex-start"
                                py={4}
                                px={2}
                                w="100%"
                                >
                                    <Text 
                                    fontWeight="700"
                                    mx={4}
                                    >
                                        Shipping Address: 
                                    </Text>
                                    <Text mx={4}>
                                        {`${order.shippingAddress.address1},  
                                        ${order.shippingAddress.city}, 
                                        ${order.shippingAddress.country}, 
                                        ${order.shippingAddress.zip}
                                        `}
                                    </Text>
                                </Flex>
                                <Flex 
                                bg={useColorModeValue("gray.100", "gray.600")}
                                borderRadius="sm"
                                justify="flex-start"
                                mb={16}
                                py={4}
                                px={2}
                                w="100%"
                                >
                                    <Text 
                                    fontWeight="700"
                                    mx={4}
                                    >
                                        Billing Address:
                                    </Text>
                                    <Text mx={4}>
                                        {`${order.billingAddress.address1},  
                                        ${order.billingAddress.city}, 
                                        ${order.billingAddress.country}, 
                                        ${order.billingAddress.zip}
                                        `}
                                    </Text>
                                </Flex>
                                <NextLink
                                href="/"
                                passHref
                                >
                                    <Link         
                                    bg="pink.400"
                                    borderRadius="md"
                                    color="white"
                                    display="block"
                                    my={8}
                                    p={6}
                                    w="max-content"
                                    _hover={{
                                    bg: "pink.500"
                                    }}
                                    >
                                        Back to home
                                    </Link>
                                </NextLink>
                            </VStack>
                        </Box>
                    </Flex>
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

    return {
        props: {
            query: ctx.query,
        }
    };
};

export default Review;
