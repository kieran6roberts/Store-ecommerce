import { Heading, Link, VStack } from "@chakra-ui/react";
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
        <VStack spacing="24">
            <Hero />
            <Heading as="h3">
                Newest Products
            </Heading>
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
                w="12rem">
                    Shop All Items
                </Link>
            </NextLink>
        </VStack>
    </Layout>
  </>
);

export default Home;
