import { Heading, Link, Text, VStack } from "@chakra-ui/react";
import { NextPage } from "next";
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
    description="home page" 
    title="Home" 
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
            <Text   
            w="60%"
            textAlign="center"
            >
                Want to check out our full range of quality products? Click the link below 
                and transport yourself into coffee heaven.
            </Text>
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
