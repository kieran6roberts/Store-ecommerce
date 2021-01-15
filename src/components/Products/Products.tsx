import { SimpleGrid } from "@chakra-ui/react";
import * as React from "react";

import Product, { IProduct } from "@/components/Products/Product/Product";

interface IProducts {
    products: IProduct[]
}

const Products: React.FC<IProducts> = ({ products }) => {

    const mapProducts = () => {
        return products.forEach((product: IProduct) => 
            <Product 
            image={product.image}
            title={product.title} 
            price={product.price} 
            />
        );
    };

    return (
        <SimpleGrid 
        columns={[1, 1, 2, 2, 3, 4]} 
        spacing="8px"
        >
            {mapProducts()}
        </SimpleGrid>
    );
};

export default Products;