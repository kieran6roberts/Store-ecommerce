import { gql } from "@apollo/client";

export const GET_REVIEWS = gql`
    query GetReviews {
        reviews {
            createdAt
            headline
            id
            message
            name
            rating
        }
    } 
`;

export const CREATE_REVIEW = gql`
    mutation NewReview($name: String!, $headline: String!, $message: String!, $rating: Int) {
        createReview(data: {name: $name, headline: $headline, message: $message, rating: $rating}) {
        name
        headline
        message
        rating
        }
    }
`;

export const TEST_REVIEW = gql`
    mutation MyMutation {
        createReview(data: {name: "Robert", headline: "Wish I didn't waste my money on this terrible coffee!", message: "Don't buy this, please. It has the most bitter and disgusting aftertaste so please go with another product", rating: 0}) {
        name
        id
        message
        rating
        headline
        createdAt
        }
    }
`;