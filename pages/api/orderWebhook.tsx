import { ApolloClient, gql, InMemoryCache } from "@apollo/client";
import { NextApiRequest, NextApiResponse } from "next";
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


async function orderWebhook (req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const event = req.body;
    
    const session = await stripe.checkout.sessions.retrieve(
        event.data.object.id, {
            expand: ["line_items", "customer"]
        }
    );

    const { customer }: any = session;

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
                name: customer.email,
                email: customer.email,
                phone: customer.phone ?? "none",
                total: session.amount_total,
                stripeCheckoutId: session.id,
                fulfilled: true,
                orderItems: {
                    create: session.line_items?.data.map(item => ({
                        name: item.id,
                        quantity: item.quantity,
                        price: item.amount_total,
                    }))
                }
            }
        }
    });

    res.json({ message: "success" });
}

export default orderWebhook;