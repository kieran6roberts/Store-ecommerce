import { Box,
    Divider, 
    Flex, 
    Heading, 
    Link, 
    StackDivider, 
    VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import NextLink from "next/link";
import * as React from "react";

import CartItem from "@/components/Cart/CartItem/CartItem";
import CheckoutForm from "@/components/Forms/CheckoutForm/CheckoutForm";
import Layout from "@/components/Layout/Layout";
import { useStore } from "@/hooks/useStorage";
import { useGetUser } from "@/lib/user";
import { generateItemKey } from "@/utils/generateItemKey";

const Checkout: NextPage = () => {

    const handleSubmit = () => console.log("checkout submit!");

    const { profile } = useGetUser();
    const { cartStorage } = useStore()!;

    const mapCartProductsToDOM = () => cartStorage!.map(product => 
        <li 
        id={product.id}
        key={`${generateItemKey(product.id)}`}>
          <CartItem 
          category={product.category}
          description={product.description}
          hideEdit={true}
          id={product.id}
          name={product.name}
          price={product.price}
          />
        </li>
        );
 
    return (
        <Layout>
            <Flex 
            as="section"
            flexDirection={["column", "column", "row"]}
            minHeight="100vh"
            m={4}
            >
                <VStack 
                align="flex-start"
                mb={12}
                pr={[0, 0, 8]}
                >
                    <Box 
                    as="header"
                    mb={8}
                    textAlign="center"
                    w="full"
                    >
                        <Heading 
                        as="h2"
                        fontSize="sm"
                        >
                            Checkout 
                        </Heading>
                        <Divider 
                        mt={4} 
                        mb={2}
                        />
                        <Heading 
                        as="h3"
                        fontSize="md"
                        >
                            Next.js e-commerce
                        </Heading>
                    </Box>
                    <CheckoutForm 
                    isDisabled={false}
                    submit={handleSubmit}
                    submitText="Continue to shipping"
                    userEmail={profile?.email ?? null}
                    />
                    <NextLink 
                    href="/cart" 
                    passHref
                    >
                        <Link fontSize="sm">
                            Back to cart
                        </Link>
                    </NextLink>
                </VStack>
                <VStack
                as="ul"
                divider={<StackDivider borderColor="blue.200" />}
                flex="3"
                listStyleType="none"
                mr={["0px", "0px", "0px", "0.5rem"]}
                pl={[0, 0, 8]}
                >
                    {mapCartProductsToDOM()}
                </VStack>
            </Flex>
        </Layout>
    );
};

export default Checkout;