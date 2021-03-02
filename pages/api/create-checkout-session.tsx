import { ApolloClient, InMemoryCache } from "@apollo/client";
import Stripe from "stripe";

import { PRODUCT_STORAGE } from "@/queries/products";

const stripe = new Stripe("sk_test_51IP3LTLIxM3ayKtnxOkzYa16G3uIIBhzb0q9LUvcqXg0By4pOVqCtUxwqQRnu5QLtR4h4NauShgjqYbuSWPUVApy00PZZx4mcQ", {
  apiVersion: "2020-08-27",
});

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHCMS_API,
  cache: new InMemoryCache()
});

async function createCheckoutSession (req, res) {
    console.log(req.body)
    const { data: { products } } = await client.query({
        query: PRODUCT_STORAGE,
        variables: {
            ids: req.body.map((product: { id: string, quantity: string }) => product.id)
        }
    });
    
    try {
        const session = await stripe.checkout.sessions.create({
            customer_email: req.body.customer_email,
            success_url: "http://localhost:3000/checkout/review?id={CHECKOUT_SESSION_ID}",
            cancel_url: "http://localhost:3000/cart",
            mode: "payment",
            payment_method_types: ["card", "ideal", "sepa_debit"],
            line_items: products.map((product, index: number) => ({
                price_data: {
                    unit_amount: product.price,
                    currency: "EUR",
                    product_data: {
                        name: product.name,           
                    },
                },
                quantity: req.body[index].quantity
            }))
        });

        res.json(session);
        return;

    } catch (err) {
        res.json({ error: { message: err }});
        return;
    }
}

export default createCheckoutSession;