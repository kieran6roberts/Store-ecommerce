import { GetServerSideProps, NextPage } from "next";
import * as React from "react";

import Layout from "@/components/Layout/Layout";
import NextHead from "@/components/NextHead/NextHead";
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
