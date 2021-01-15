import { GetStaticProps, NextPage } from "next";
import * as React from "react";

import Layout from "@/components/Layout/Layout";
import { initApollo } from "@/lib/apolloClient";
import { PRODUCT_INFO, PRODUCT_NAMES } from "@/queries/products";

const Help: NextPage = ({ productSlugs }) => {
  console.log(productSlugs)
  return (
    <Layout>
      
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initApollo();

  const productSlugs = await apolloClient.query({
      query: PRODUCT_NAMES
  });

  return { 
      props: {
          productSlugs
      }
  };
};

export default Help;