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

export const GET_USER_ORDERS = gql`
    query GetUserOrders($email: String) {
        orders(where: {email: $email}) {
            createdAt
            name
            total
            orderItems {
                name
                quantity
                price
            }
        }
    }
`;