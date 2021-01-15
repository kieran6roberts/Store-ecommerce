import { NextPage } from "next";
import * as React from "react";

import Layout from "@/components/Layout/Layout";
import Product from "@/components/Product/Product";

const Products: NextPage = () => {
  return (
    <Layout user={null}>
      <Product />
    </Layout>
  );
};

export default Products;