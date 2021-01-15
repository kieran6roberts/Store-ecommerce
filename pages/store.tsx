import { NextPage } from "next";
import * as React from "react";

import Layout from "@/components/Layout/Layout";
import Product from "@/components/Products/Product/Product";

const Store: NextPage = () => {
  return (
    <Layout user={null}>
      <Product title="title" image="/image.png" price="£19.99" />
    </Layout>
  );
};

export default Store;