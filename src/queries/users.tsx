import { gql } from "@apollo/client";

export const UPDATE_USER = gql`
    mutation UserMutation($id: Int_comparison_exp, $changes: users_set_input) {
        update_users(where: {id: $id}, _set: $changes) {
            returning {
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
        }
    }
`;