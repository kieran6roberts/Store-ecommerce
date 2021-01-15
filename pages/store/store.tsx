import { Flex } from "@chakra-ui/react";
import { NextPage } from "next";
import * as React from "react";

import Filter from "@/components/Filter/Filter";
import Layout from "@/components/Layout/Layout";
import Sort from "@/components/Sort/Sort";

const Store: NextPage = () => {
  return (
    <Layout user={null}>
      <Flex justify="center">
        <Sort />
        <Filter />
      </Flex>
    </Layout>
  );
};

export default Store;