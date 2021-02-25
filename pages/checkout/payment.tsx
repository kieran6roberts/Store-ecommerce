import { Flex, StackDivider, VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import * as React from "react";

import CartHeader from "@/components/Cart/CartHeader/CartHeader";
import Layout from "@/components/Layout/Layout";
import { useStore } from "@/hooks/useStorage";
import { mapCartStorage } from "@/utils/mapCartStorage";

const Payment: NextPage = () => {
    const { cartStorage } = useStore()!;
    
    return (
        <Layout>
            <Flex        
            as="section"
            flexDirection={["column", "column", "column", "row"]}
            minHeight="100vh"
            m={4}
            >
                <VStack     
                align="flex-start"
                flex="3"
                mb={12}
                pr={[0, 0, 8]}
                >
                    <CartHeader />
                </VStack>
                <VStack
                as="ul"
                divider={<StackDivider borderColor="blue.200" />}
                flex="3"
                listStyleType="none"
                mr={["0px", "0px", "0px", "0.5rem"]}
                pl={[0, 0, 8]}
                >
                    {mapCartStorage(cartStorage, true)}
                </VStack>
            </Flex>
        </Layout>
    );
};

export default Payment;