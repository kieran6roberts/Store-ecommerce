import { gql } from "@apollo/client";

export const USER_DATA = gql`
    fragment UserParts on User {
        address
        addressLine2
        city
        country
        id
        name
        phone
        postcode
        updated_at
    }
`;

export const UPDATE_USER = gql`
   mutation UserMutation($id: String_comparison_exp, $changes: users_set_input) {
        update_users(where: {auth0_id: $id}, _set: $changes) {
            returning {
                ...UserParts
            }
        }
    }
    ${USER_DATA}
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