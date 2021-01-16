import { DocumentNode, useQuery } from "@apollo/client";
import { Box, Button, SimpleGrid, VStack } from "@chakra-ui/react";
import * as React from "react";

import Product, { IProduct } from "@/components/Products/Product/Product";

interface IProducts {
    query: DocumentNode;
    loadMore: boolean;
}

const Products: React.FC<IProducts> = ({ query, loadMore }) => {
    const [ offset, setOffset ] = React.useState(10);

    const { data, error, fetchMore, loading } = useQuery(query, {
        variables: {
            offset: 0,
            limit: 10
        }
    });

    if (error) {
        return <Box>Error loading products</Box>;
    }

    if (loading) {
        return <Box>Loading prodcuts...</Box>;
    }

    console.log(data);
    const { products } = data;

    const mapProducts = products.map((product: IProduct) => 
            <li 
            className="product"
            key={product.id}
            >
                <Product 
                image={product.image}
                name={product.name} 
                price={product.price} 
                />
            </li>
    );

    const checkForMoreProducts = () => {
        const productElements = document.querySelectorAll(".product");
        if (!productElements) {
            return null;
        }
        
        const products = Array.from(productElements);

        return !(products.length % 10) ? true: false;
    };

    return (
        <VStack spacing={8}>
            <SimpleGrid 
            as="ul"
            columns={[1, 1, 2, 2, 3, 4]} 
            listStyleType="none"
            spacing="3rem"
            >
                {mapProducts ?? null}
            </SimpleGrid>
            {loadMore && checkForMoreProducts() ? 
            <Button onClick={() => { 
                fetchMore({ 
                    variables: { 
                        offset: offset,
                        limit: 10
                    }
                });

                setOffset(offset + 10);
            }
                }>
                Load More
            </Button> : null}
        </VStack>
    );
};

export default Products;