import { ApolloClient, InMemoryCache } from "@apollo/client";
import Stripe from "stripe";

import { PRODUCT_STORAGE } from "@/queries/products";

const stripe = new Stripe("sk_test_51IP3LTLIxM3ayKtnxOkzYa16G3uIIBhzb0q9LUvcqXg0By4pOVqCtUxwqQRnu5QLtR4h4NauShgjqYbuSWPUVApy00PZZx4mcQ");

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHCMS_API,
  cache: new InMemoryCache()
});



async function createCheckoutSession (req, res) {
    const { data } = await client.query({
        query: PRODUCT_STORAGE,
        variables: {
            ids: req.body
        }
    });

    console.log(data);
/*
    try {
        const session = await stripe.checkout.sessions.create({
            success_url: "http://localhost:3000/?id={CHECKOUT_SESSION_ID}",
            cancel_url: "http://localhost:3000/cart",
            mode: "payment",
            payment_method_types: ["card", "ideal", "sepa_debit"],
            line_items: [{

            }]
        });*/

        res.json(data);
}

export default createCheckoutSession;