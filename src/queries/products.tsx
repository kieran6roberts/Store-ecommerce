import { gql } from "@apollo/client";

export const PRODUCT_DATA = gql`
    fragment ProductParts on Product {
        category {
            name
        }
        description {
            text
        }
        id
        name
        price
        __typename
    }
`;

export const PRODUCT_NAMES = gql`
    query GetProductTitles {
        products {
            name
        }
    }
    ${PRODUCT_DATA}
`;

export const PRODUCT_INFO = gql`
    query GetSingleProduct($name: String!) {
        products(where: {name: $name}) {
            ...ProductParts
        }
    }
    ${PRODUCT_DATA}
`;

export const PRODUCT_NEW = gql`
    query GetNewProducts {
        products(first: 3, orderBy: createdAt_DESC) {
           ...ProductParts
        }
    }
    ${PRODUCT_DATA}
`;

export const PRODUCT_ALL = gql`
    query GetAllProducts($offset: Int, $limit: Int) {
        products(first: $limit, skip: $offset ) {
           ...ProductParts
        }
    }
    ${PRODUCT_DATA}
`;

export const PRODUCT_STORAGE = gql`
    query GetStorageProducts($ids: [ID!]!) {
        products(where: { id_in: $ids }) {
            ...ProductParts
        }
    }
    ${PRODUCT_DATA}
`;

export const PRODUCT_SORT = gql`
    query ProductSort($sort: ProductOrderByInput!) {
        products(orderBy: $sort) {
            ...ProductParts
        }
    }
    ${PRODUCT_DATA}
`;