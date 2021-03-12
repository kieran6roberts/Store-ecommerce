import { gql } from "@apollo/client";

export const USER_ORDER = gql`
    query UserOrder($id: String) {
        orders(where: {stripeCheckoutId: $id}) {
            name
            id
            email
            fulfilled
            stripeCheckoutId
            total
            orderItems {
                name
                quantity
                price
            }
            shippingAddress {
                name
                address1
                address2
                city
                country
                zip
                phone
            }
            billingAddress {
                name
                address1
                address2
                city
                country
                zip
                phone
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

export const CREATE_ORDER = gql`
    mutation CreateOrder($data: OrderCreateInput!) {
        createOrder(data: $data) {
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
            billingAddress {
                name
                address1
                address2
                city
                country
                zip
                phone
            }
            shippingAddress {
                name
                address1
                address2
                city
                country
                zip
                phone
            }
        }
    }
`;