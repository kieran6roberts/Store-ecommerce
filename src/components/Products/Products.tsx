import { gql, useQuery } from "@apollo/client";
import { Box, SimpleGrid } from "@chakra-ui/react";
import * as React from "react";

import Product, { IProduct } from "@/components/Products/Product/Product";

interface IProducts {
    products: IProduct[]
}

const PRODUCTS_NEW = gql`
    query NewProducts {
        products(first: 3, orderBy: createdAt_DESC) {
        id
        name
        price
        images {
            fileName
            url
            size
        }
    }
}`;

const Products = (): React.ReactElement => {

    const { loading, data, error } = useQuery(PRODUCTS_NEW);

    if (error) {
        return <Box>Error loading products</Box>;
    }

    if (loading) {
        return <Box>Loading prodcuts...</Box>;
    }

    const { products } = data;

    console.log(products);

    const mapProducts = () => {
        return products.map((product: IProduct) => 
            <li key={product.id}>
                <Product 
                image={product.image}
                name={product.name} 
                price={product.price} 
                />
            </li>
        );
    };

    return (
        <SimpleGrid 
        as="ul"
        columns={[1, 1, 2, 2, 3, 4]} 
        listStyleType="none"
        spacing="3rem"
        >
            {mapProducts()}
        </SimpleGrid>
    );
};

export default Products;