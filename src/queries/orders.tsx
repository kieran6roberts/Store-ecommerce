import { gql } from "@apollo/client";

export const USER_ORDER = gql`
    query MyQuery($id: String) {
        orders(where: {stripeCheckoutId: $id}) {
            name
            id
            email
            name
            fulfilled
            stripeCheckoutId
            total
            orderItems {
                name
                quantity
                price
            }
        }
    }
`;