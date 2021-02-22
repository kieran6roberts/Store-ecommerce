import { Heading, Link, VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import NextLink from "next/link";
import * as React from "react";

import Hero from "@/components/Hero/Hero";
import Layout from "@/components/Layout/Layout";
import NextHead from "@/components/NextHead/NextHead";
import Products from "@/components/Products/Products";
import { PRODUCT_BEST, PRODUCT_NEW } from "@/queries/products";

const Home: NextPage = () => {
  return (
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
          Best Selling
        </Heading>
        <Products 
        loadMore={false} 
        query={PRODUCT_BEST} 
        variables={{
          ssr: false,
          fetchPolicy: "no-cache"
        }}
        />
        <NextLink 
        href="/store" 
        >
          <Link>
            To The Shop
          </Link>
        </NextLink>
      </VStack>
    </Layout>
    </>
  );
};

export default Home;
