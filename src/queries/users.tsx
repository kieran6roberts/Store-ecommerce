import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
   mutation UserMutation($id: String_comparison_exp, $changes: users_set_input) {
        update_users(where: {auth0_id: $id}, _set: $changes) {
            returning {
                address
                addressLine2
                city
                country
                name
                phone
                postcode
            }
        }
    }
`;

export const USER_DETAILS = gql`
    query GetUserDetails($id: String) {
        users(where: {auth0_id: {_eq: $id}}) {
            email
            address
            addressLine2
            city
            country
            name
            phone
            postcode
        }
    }
`;