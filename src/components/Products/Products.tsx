import { DocumentNode, useQuery } from "@apollo/client";
import { Box, Button, SimpleGrid, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import * as React from "react";

import Product, { IProductWithId } from "@/components/Products/Product/Product";
import { getStorage, setStorage } from "@/utils/storage";

interface IProducts {
    query: DocumentNode;
    loadMore: boolean;
    variables?: {
        variables: {
            offset?: number,
            limit?: number,
            id?: string
            ids?: string[]
        }
    };
}

export interface IMouseEventOnHTMLElement extends React.MouseEvent {
    currentTarget: HTMLElement
}

const Products: React.FC<IProducts> = ({ query, loadMore, variables = undefined }) => {
    const [ offset, setOffset ] = React.useState(10);
    const [ count, setCount ] = React.useState(0);


    const router = useRouter();

    const { data, error, fetchMore, loading } = useQuery(query, variables);

    if (error) {
        return <Box h="75vh">Error loading products</Box>;
    }

    if (loading) {
        return <Box h="75vh">Loading prodcuts...</Box>;
    }

    const toggleProductInStorage = (event: IMouseEventOnHTMLElement, id: string) => {
        const KEY = "saved-products";

        const products = getStorage(KEY);

        if (!products) {
            setStorage(KEY, [{ id: id }]);
            event.currentTarget.style.color = "pink";
            return;
        }
        
        if (Array.isArray(products)) {
            
            const filterDuplicateItems = products.filter(product => product.id !== id);
            
            if (filterDuplicateItems.length < products.length) {
                setStorage(KEY, filterDuplicateItems);
                event.currentTarget.style.color = "black";
                return;
            }
            
            const addNewItems = [...products, { id: id }];
            
            setStorage(KEY, addNewItems);
            event.currentTarget.style.color = "pink";
        }
    };

    const mapProducts = data?.products.map((product: IProductWithId) => 
            <li 
            className="product"
            key={product.id}
            >
                <Product
                clickSave={(event) => toggleProductInStorage(event, product.id)}
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