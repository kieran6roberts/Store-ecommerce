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
import * as React from "react";

import CartHeader from "@/components/Cart/CartHeader/CartHeader";
import Layout from "@/components/Layout/Layout";
import { USER_ORDER } from "@/queries/orders";

const Review: NextPage = ({ query }) => {
    const orderID = query.id;

    const { data: orderData, loading, error } = useQuery(USER_ORDER, {
        variables: {
            id: orderID
        }
    });

    if (loading) {
        console.log("loading");
    }

    if (error) {
        console.log("order error");
    }

    const [ order ] = orderData.orders;

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
                            fontSize="sm"
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
                                bg={useColorModeValue("gray.100", "gray.700")}
                                justify="flex-start"
                                py={4}
                                px={2}
                                w="100%"
                                >
                                    <Text mx={8}>
                                        Email
                                    </Text>
                                    <Text>
                                        {order.email}
                                    </Text>
                                </Flex>
                                <Flex 
                                justify="space-evenly"
                                w="100%"
                                >
                                    <Text>
                                        Email
                                    </Text>
                                    <Text>
                                        {order.email}
                                    </Text>
                                </Flex>
                            </VStack>
                        </Box>
                        <Flex 
                        align="center"
                        justify="center"
                        flex="1"
                        >
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
                                p={8}
                                w="max-content"
                                _hover={{
                                bg: "pink.500"
                                }}
                                >
                                    Back to home
                                </Link>
                            </NextLink>
                        </Flex>
                    </Flex>
                </VStack>
            </Flex>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {

  if (!ctx.query) {
      return {
            redirect: {
                destination: "/",
                permanent: false
            }
      };
  }

  return {
    props: {
        query: ctx.query
    }
  };
};

export default Review;
