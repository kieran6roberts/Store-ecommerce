import { 
    Box, 
    Divider, 
    Heading, 
    SimpleGrid, 
    Text, 
    useColorModeValue } from "@chakra-ui/react";
import { NextPage } from "next";
import * as React from "react";

import Layout from "@/components/Layout/Layout";
import NextHead from "@/components/NextHead/NextHead";
import Product from "@/components/Products/Product/Product";
import { useStore } from "@/hooks/useStorage";
import { generateItemKey } from "@/utils/generateItemKey";

const savedProducts: NextPage = () => {
    const { savedStorage } = useStore()!;

    return (
        <>
        <NextHead 
        currentURL="http://localhost:3000/saved-products" 
        description="Your saved products will show up here." 
        title="Your Saved Products" 
        />
        <Layout>
            <Heading 
            as="h1"
            fontSize="lg"
            mb={{ base: 4, xl: 16}}
            ml={8}
            >
                Your saved products
            </Heading>
            <Divider my={{base: 4, xl: 12}} />
            <SimpleGrid 
            as="ul"
            columns={[1, 1, 2, 2, 3, 4]} 
            listStyleType="none"
            mx={8}
            spacing="3rem"
            >
                {savedStorage && savedStorage.length ?
                savedStorage.map((product) => 
                <li key={generateItemKey(product.id)}>
                    <Product 
                    category={product.category}
                    description={product.description} 
                    image={product.image}
                    id={product.id}
                    name={product.name}
                    price={product.price}
                    />
                </li>
                )
                :
                <Box 
                as="header"
                h="250px"
                >
                    <Text 
                    bg={useColorModeValue("gray.100", "gray.900")}
                    borderRadius="md"
                    fontSize="sm"
                    p={{ base: 4, xl: 8}}
                    >
                        Saved products will appear here
                    </Text>
                </Box>
                }
            </SimpleGrid>
        </Layout>
        </>
    );
};

export default savedProducts;