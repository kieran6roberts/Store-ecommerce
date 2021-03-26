import { 
    Box, 
    Divider, 
    Flex, 
    Heading, 
    Link, 
    Text, 
    useColorModeValue, 
    VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import NextImage from "next/image";
import NextLink from "next/link";
import * as React from "react";

import Hero from "@/components/Hero/Hero";
import Layout from "@/components/Layout/Layout";
import NextHead from "@/components/NextHead/NextHead";
import Products from "@/components/Products/Products";
import { PRODUCT_NEW, PRODUCT_SPECIALS } from "@/queries/products";

const Home: NextPage = () => (
    <>
    <NextHead 
    currentURL="http://localhost:3000" 
    description="Welcome to Kieran's Coffee Collection! We would like to share our delicious range of fresh coffee with you." 
    title="Kieran's Coffee Collection" 
    />
    <Layout>
        <VStack spacing="16">
            <Hero />
            <Heading as="h3">
                Newest Products
            </Heading>
            <Text         
            w="60%"
            textAlign="center"
            >
                These products are brand new to our store! The finest quality ingredients sourced
                fresh for your pleasure.
            </Text>
            <Products 
            loadMore={false} 
            query={PRODUCT_NEW} 
            variables={{
                ssr: false,
                fetchPolicy: "no-cache"
            }}
            />
            <Flex 
            bg={useColorModeValue("gray.100", "gray.700")}
            flexDirection={{base: "column", lg: "row"}}
            p={{base: 2, xl: 20}}
            w="100%"
            >
                <VStack
                flex="1"
                px={20}
                py={12}
                >
                    <Heading 
                    as="h3"
                    color="pink.400"
                    fontSize="lg"
                    textAlign="center"
                    >
                        The finest ingredients
                    </Heading>
                    <Divider 
                    bg="pink.400"
                    my={{base: 8, xl: 16}}
                    />
                    <Text 
                    fontSize="md"
                    mb={4}>
                        We love our coffee here at Kieran's Coffee Collection. In order to bring
                        you the best products we have scoured the globe the finest beans 
                        available. Our store includes products from four different continents.
                    </Text>
                    <Text 
                    fontSize="md"
                    mb={4}
                    >
                        This means we are certain that you'll find something suitable to your tastes.
                        We have everything from rich to sweet to delectably moreish.
                    </Text>
                </VStack>
                <VStack
                flex="1"
                px={20}
                py={12}
                >
                    <Heading 
                    as="h3"
                    color="pink.400"
                    fontSize="lg"
                    textAlign="center"
                    >
                        At the right prices
                    </Heading>
                    <Divider 
                    bg="pink.400"
                    my={{base: 8, xl: 16}}
                    />
                    <Text 
                    fontSize="md"
                    mb={4}>
                        We also offer these delicious brews at affordable prices so you can 
                        get more for less. We believe quality products should be available
                        to as many people as possible.
                    </Text>
                    <Text 
                    fontSize="md"
                    w="full"
                    >
                        Come and see for yourself.
                    </Text>
                </VStack>
            </Flex>
            <Heading as="h3">
              Limited Time Specials
            </Heading>
            <Text 
            w="60%"
            textAlign="center"
            >
                These products are sourced worldwide featuring some of the best qualtity beans that we can get our hands on. 
                But beware, they will not be here for long so come and take a look.
            </Text>
            <Products 
            loadMore={false} 
            query={PRODUCT_SPECIALS} 
            variables={{
                ssr: false,
                fetchPolicy: "no-cache"
            }}
            />
            <NextLink 
            href="/store"
            passHref
            >
                <Link
                bg="pink.400"
                color="white"
                borderRadius="md"
                fontWeight="700"
                py={3}
                px={6}
                textAlign="center"
                textTransform="uppercase"
                w="12rem"
                hover={{
                    bg: "pink.500"
                }}
                >
                    Shop All Items
                </Link>
            </NextLink>
        </VStack>
    </Layout>
  </>
);

export default Home;
