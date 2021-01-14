import * as React from "react";

import Layout from "@/components/Layout/Layout";
import NextHead from "@/components/NextHead/NextHead";

function Login(): React.ReactElement {
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
}

export default Login;