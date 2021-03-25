import { BaseQueryOptions, DocumentNode, useQuery } from "@apollo/client";
import { Box, 
    Button, 
    SimpleGrid, 
    Text,
    useColorMode,
    useColorModeValue,
    VStack } from "@chakra-ui/react";
import * as React from "react";
import { AiOutlineArrowDown } from "react-icons/ai";

import Product from "@/components/Products/Product/Product";
import { generateItemKey } from "@/utils/generateItemKey";

import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";


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
    sortProducts?: IProductQuery[] | [];
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
        
    const [ offset, dispatchOffset ] = React.useReducer((state: number, action: number) => state + action, 10);

    const { data, error, fetchMore, loading } = useQuery(query, variables);
    
    if (error) {
        return <Box h="75vh">Error loading products</Box>;
    }

    if (loading) {
        return (
            <Box h="75vh">
                <LoadingSpinner />
            </Box>
        );
    }

    const { products: cacheFirstData } = data;
    const productArr = sortProducts?.length ? sortProducts : cacheFirstData;

    return (
        <VStack 
        spacing={8}
        m="auto"
        w="100%"

        >
            <SimpleGrid 
            as="ul"
            columns={[1, 1, 2, 3, 3, 4, 5]} 
            listStyleType="none"
            spacing="3rem"
            w={["none", "none", "none", "none", "100%"]}
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
            {loadMore && (productArr.length % 10 === 0) ? 
            <Button 
            fontSize="sm"
            leftIcon={<AiOutlineArrowDown />}
            onClick={() => { 
                fetchMore({ 
                    variables: { 
                        offset: offset,
                        limit: 10
                    },
                });

                dispatchOffset(10);
            }}
            px={{base: 4, xl: 20}}
            py={{base: 2, xl: 8}}
            >
                Load more
            </Button> : 
            <Text 
            color={useColorModeValue("gray.500", "gray.200")}
            fontSize="xs"
            mt={4}
            >
                End of products.
            </Text>
            }
        </VStack>
    );
};

export default Products;