import { ApolloClient, InMemoryCache } from "@apollo/client";
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

import { PRODUCT_STORAGE } from "@/queries/products";
import { IProductStorage } from "@/utils/storage";

const stripe = new Stripe("sk_test_51IP3LTLIxM3ayKtnxOkzYa16G3uIIBhzb0q9LUvcqXg0By4pOVqCtUxwqQRnu5QLtR4h4NauShgjqYbuSWPUVApy00PZZx4mcQ", {
  apiVersion: "2020-08-27",
});

const client = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHCMS_API,
  cache: new InMemoryCache()
});

async function createCheckoutSession (req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const { data: { products } } = await client.query({
        query: PRODUCT_STORAGE,
        variables: {
            ids: req.body.map((product: { id: string, quantity: string }) => product.id)
        }
    });

    const [ data ] = req.body;
    
    try {
        const session = await stripe.checkout.sessions.create({
            billing_address_collection: "required",
            cancel_url: "http://localhost:3000/cart",
            customer_email: data.email,
            metadata: {
                name: data.name,
                address: data.address,
                addressLine2: data.addressLine2,
                city: data.city,
                country: data.country,
                postcode: data.postcode,
                phone: data.phone
            },
            mode: "payment",
            payment_method_types: ["card", "ideal", "sepa_debit"],
            success_url: "http://localhost:3000/checkout/review?id={CHECKOUT_SESSION_ID}",
            line_items: products.map((product: IProductStorage, index: number) => ({
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