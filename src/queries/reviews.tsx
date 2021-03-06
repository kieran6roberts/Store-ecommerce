import { gql } from "@apollo/client";

export const GET_REVIEWS = gql`
    query GetReviews($id:ID) {
        reviews(where: {product: { id: $id }}) {
            createdAt
            headline
            id
            message
            name
            rating
            product {
                id
            }
            userPicture
            __typename
        }
    } 
`;

export const CREATE_REVIEW = gql`
    mutation NewReview($name: String!, $headline: String!, $message: String!, $rating: Int!, $id: ID, $userPicture: String) {
        createReview(data: {name: $name, headline: $headline, message: $message, rating: $rating, userPicture: $userPicture, product: {connect: {id: $id}}}) {
        createdAt
        name
        headline
        message
        rating
        product {
            id
        }
        id
        userPicture
        __typename
    }
}
`;