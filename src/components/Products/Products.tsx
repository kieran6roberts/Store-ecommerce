import { BaseQueryOptions, DocumentNode, useQuery } from "@apollo/client";
import { Box, Button, SimpleGrid, VStack } from "@chakra-ui/react";
import * as React from "react";

import Product from "@/components/Products/Product/Product";
import { generateItemKey } from "@/utils/generateItemKey";


export interface IProductQuery {
    category: {
        name: string
    };    
    description: {
        text: string;
    };
    id: string;
    images: {
        fileName: string;
        __typename: string;
    }[];
    name: string;
    price: number;
    __typename?: string;
}

interface IProducts {
    sortProducts?: { products: IProductQuery[] } | [];
    loadMore: boolean;
    query: DocumentNode;
    variables?: BaseQueryOptions<Record<string, any>> | undefined;
}

export interface IMouseEventOnHTMLElement extends React.MouseEvent {
    currentTarget: HTMLElement;
    target: HTMLElement;
}

const Products: React.FC<IProducts> = ({ 
    sortProducts,
    loadMore,
    query, 
    variables = undefined }) => {
        
    const [ offset, setOffset ] = React.useState(10);

    const { data, error, fetchMore, loading } = useQuery(query, variables);
    
 
    if (error) {
        return <Box h="75vh">Error loading products</Box>;
    }

    if (loading) {
        return <Box h="75vh">Loading products...</Box>;
    }

    const { products: cacheFirstData } = data;

    const productArr = sortProducts?.products ?? cacheFirstData;

    const checkForMoreProducts = () => {
        const productElements = document.querySelectorAll(".product");

        if (!productElements) {
            return null;
        }
        
        const products = Array.from(productElements);

        return !(products.length % 10) ? true : false;
    };

    return (
        <VStack spacing={8}>
            <SimpleGrid 
            as="ul"
            columns={[1, 1, 2, 2, 3, 4]} 
            listStyleType="none"
            spacing="3rem"
            >
                {productArr.map(({id, category, description, images, name, price }: IProductQuery) => 
                    <Box 
                    as="li" 
                    className="product"
                    id={id}
                    key={generateItemKey(id)}
                    >
                        <Product
                        category={category.name}
                        description={description.text}
                        id={id}
                        image={images[0]?.fileName}
                        name={name}
                        price={price}
                        />
                    </Box>
                )}
            </SimpleGrid>
            {loadMore && checkForMoreProducts() ? 
            <Button onClick={() => { 
                fetchMore({ 
                    variables: { 
                        offset: offset,
                        limit: 10
                    },
                    fetchPolicy: "cache-first",
                    ssr: false
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