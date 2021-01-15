import { Heading, VStack } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import * as React from "react";

import Hero from "@/components/Hero/Hero";
import Layout from "@/components/Layout/Layout";
import NextHead from "@/components/NextHead/NextHead";
import Products from "@/components/Products/Products";
import auth0 from "@/lib/auth";

export interface IUser {
  user: {
    name?: string,
    nickname?: string,
    picture?: string,
    updated_at?: string,
    email?: string,
    email_verified?: string,
    sub?: string
  }
}

const Home: NextPage<IUser> = ({ user }) => {
  return (
    <>
    <NextHead 
    currentURL="http://localhost:3000" 
    description="home page" 
    title="Home" 
    />
    <Layout user={user ?? null}>
      <VStack spacing="24">
        <Hero />
        <Heading
        as="h3"
        >
          Newest Products
        </Heading>
        <Products />
      </VStack>
    </Layout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await auth0.getSession(ctx.req);
  return {
    props: {
      user: session?.user ?? null
    }
  };
};

export default Home;
