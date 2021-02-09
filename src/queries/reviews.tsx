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
    mutation CreateReview($name: String!, $headline: String!, $message: String!, $rating: Int) {
        createReview(data: {name: $name, headline: $headline, message: $message, rating: $rating}) {
        id
        name
        message
        rating
        headline
        createdAt
        }
    }
`;