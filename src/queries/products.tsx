import { gql } from "@apollo/client";

export const PRODUCT_NAMES = gql`
    query GetProductTitles {
        products {
            name
        }
    }
`;

export const PRODUCT_INFO = gql`
    query GetSingleProduct($name: String!) {
        products(where: {name: $name}) {
            name
        }
    }
`;