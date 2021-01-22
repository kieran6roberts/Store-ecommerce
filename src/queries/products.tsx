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

export const PRODUCT_NEW = gql`
    query GetNewProducts {
        products(first: 3, orderBy: createdAt_DESC) {
        id
        name
        price
    }
}`;

export const PRODUCT_ALL = gql`
    query GetAllProducts($offset: Int, $limit: Int) {
        products(first: $limit, skip: $offset ) {
            id
            name
            price
        }
    }
`;

export const PRODUCT_STORAGE = gql`
    query GetStorageProducts($ids: [ID!]!) {
        products(where: { id_in: $ids }) {
            ... on Product {
                id
                name
                price

            }
        }
    }
`;