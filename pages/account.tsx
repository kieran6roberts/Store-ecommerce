import { Heading } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import * as React from "react";

import Layout from "@/components/Layout/Layout";
import auth0 from "@/lib/auth";
import { IUser } from "@/pages/index";

const Account: NextPage<IUser> = ({ user }) => {
  return (
    <Layout user={user}>
      {user ? 
      <Heading
      as="h2"
      fontSize="sm"
      >
        Signed in as {user.name}
      </Heading>
      : null}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await auth0.getSession(ctx.req);

  if (!session?.user) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    };
  }

  return {
    props: {
      user: session?.user ?? null
    }
  };
};

export default Account;