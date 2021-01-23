import { DocumentNode, useQuery } from "@apollo/client";
import { Box, Button, SimpleGrid, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import * as React from "react";

import Product, { IProductWithId } from "@/components/Products/Product/Product";
import { getStorage, setStorage } from "@/utils/storage";

interface IProducts {
    loadMore: boolean;
    query: DocumentNode;
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
    currentTarget: HTMLElement;
    target: HTMLElement;
}

const Products: React.FC<IProducts> = ({ 
    loadMore,
    query, 
    variables = undefined }) => {
    const [ offset, setOffset ] = React.useState(10);

    const router = useRouter();

    const { data, error, fetchMore, loading } = useQuery(query, variables);

    if (error) {
        return <Box h="75vh">Error loading products</Box>;
    }

    if (loading) {
        return <Box h="75vh">Loading prodcuts...</Box>;
    }

    const removeProductFromDOM = (id: string) => {
        if (router.pathname !== "/saved-products") {
            return;
        }
        document.querySelector(`#${id}`)?.remove();
    };

    const toggleProductInStorage = (event: IMouseEventOnHTMLElement, id: string) => {
        const KEY = "saved-products";

        const products = getStorage(KEY);

        removeProductFromDOM(id);

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
            id={product.id}
            key={product.id}
            >
                <Product
                category={product.category.name}
                clickSave={(event) => toggleProductInStorage(event, product.id)}
                description={product.description.text}
                id={product.id}
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