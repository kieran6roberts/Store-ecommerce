import { Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import * as React from "react";

import Layout from "@/components/Layout/Layout";
import Product from "@/components/Products/Product/Product";
import { useStore } from "@/hooks/useStorage";
import { generateItemKey } from "@/utils/generateItemKey";

const savedProducts: NextPage = () => {
    const { savedStorage } = useStore();

    return (
        <Layout>
            <SimpleGrid 
            as="ul"
            columns={[1, 1, 2, 2, 3, 4]} 
            listStyleType="none"
            mx={8}
            spacing="3rem"
            >
                {savedStorage ?
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
            <header>
                <Heading 
                fontSize="lg"
                mb={12}
                >
                    Empty
                </Heading>
                <Text fontSize="sm">
                    Saved products will appear here
                </Text>
            </header>
            }
            </SimpleGrid>
        </Layout>
    );
};

export default savedProducts;