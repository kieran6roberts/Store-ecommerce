import { 
    Box,
    Flex, 
    Heading,
    Link, 
    useColorModeValue, 
    VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import NextLink from "next/link";
import * as React from "react";

import CartHeader from "@/components/Cart/CartHeader/CartHeader";
import Layout from "@/components/Layout/Layout";

const Review: NextPage = () => {
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
                            <Heading 
                            as="h3"
                            fontSize="lg"
                            textAlign="center"
                            >
                                Order Summary
                            </Heading>
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

export default Review;