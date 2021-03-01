import { ApolloClient, InMemoryCache } from "@apollo/client";
import Stripe from "stripe";

const stripe = new Stripe("sk_test_51IP3LTLIxM3ayKtnxOkzYa16G3uIIBhzb0q9LUvcqXg0By4pOVqCtUxwqQRnu5QLtR4h4NauShgjqYbuSWPUVApy00PZZx4mcQ", {
  apiVersion: "2020-08-27",
});

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHCMS_API,
  cache: new InMemoryCache()
});


async function orderWebhook (req, res) {
    const event = req.body;
    
    const session = await stripe.checkout.sessions.retrieve(
        event.data.object.id, {
            expand: ["line_items", "customer"]
        }
    );

    const line_items = session.line_items;
    const customer = session.customer_email;
    console.log(line_items);

    const { data } = await client.query({
        query: ORDER_MUTATION,
        variables: {
            ids: req.body.map((product: { id: string, quantity: string }) => product.id)
        }
    });

    res.json({ message: "success" });
}

export default orderWebhook;