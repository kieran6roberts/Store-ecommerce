import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import Stripe from "stripe";

const stripe = new Stripe("sk_test_51IP3LTLIxM3ayKtnxOkzYa16G3uIIBhzb0q9LUvcqXg0By4pOVqCtUxwqQRnu5QLtR4h4NauShgjqYbuSWPUVApy00PZZx4mcQ", {
  apiVersion: "2020-08-27",
});

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHCMS_API,
  cache: new InMemoryCache(),
  headers: {
      Authorization: `Bearer ${process.env.GRAPHCMS_MUTATION_TOKEN}`
  }
});


async function orderWebhook (req, res) {
    const event = req.body;
    
    const session = await stripe.checkout.sessions.retrieve(
        event.data.object.id, {
            expand: ["line_items", "customer"]
        }
    );

    const line_items = session.line_items.data;
    const customer = session.customer_email;
    console.log(session);

    
    const response = await client.mutate({
        mutation: gql`
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
            }
        }`,
        variables: {
            data: {
                name: "Kieran",
                email: "email",
                phone: "phone number",
                total: 30,
                stripeCheckoutId: "stripeid",
                fulfilled: true,
                orderItems: {
                    create: [
                        {
                        name: "name",
                        quantity: 5,
                        price: 20,
                        }
                    ]
                }
            }
        }
    });

    console.log(response);

    res.json({ data: line_items, message: "success" });
}

export default orderWebhook;