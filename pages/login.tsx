import { NextPage } from "next";
import * as React from "react";

import Layout from "@/components/Layout/Layout";
import NextHead from "@/components/NextHead/NextHead";

const Login: NextPage = () => {
  return (
    <>
    <NextHead 
    currentURL="http://localhost:3000/login" 
    description="login page" 
    title="Login" 
    />
    <Layout>
  
    </Layout>
    </>
  );
};

export default Login;