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
        images {
            fileName
        }
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

export const PRODUCT_BEST = gql`
    query GetNewProducts {
        products(last: 3, orderBy: createdAt_DESC) {
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

export const PRODUCT_CATEGORIES = gql`
    query GetProductCategories {
        categories {
            name
        }
    }
`;

export const PRODUCT_SORT = gql`
    query ProductSort($sort: ProductOrderByInput!) {
        products(orderBy: $sort) {
            ...ProductParts
        }
    }
    ${PRODUCT_DATA}
`;

export const CATEGORY_SORT = gql`
    query CategorySort($sort: CategoryOrderByInput) {
        categories(orderBy: $sort) {
            products {
                ...ProductParts
            }
        }
    }
    ${PRODUCT_DATA}
`;

export const GET_CATEGORY = gql`
    query GetCategory($name: String!) {
        products(where: {category: {name: $name}}) {
            ...ProductParts
        }
    }
    ${PRODUCT_DATA}
`;

export const PRODUCT_SPECIALS = gql`
    query GetSpecials {
      products(where: {collections_some: {name: "Limited Time Specials"}}){
        ...ProductParts
        }
    }
    ${PRODUCT_DATA}
`;