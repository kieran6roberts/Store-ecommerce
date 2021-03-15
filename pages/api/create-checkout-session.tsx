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

    const mergeProducts = products?.map(product => {
        const match = req.body.find(index => index.id === product.id);
        
        return ({
            name: product.name,
            price: product.price,
            quantity: match.quantity
        });
    });

    
    const metaData = req.body[0];

    console.log(mergeProducts)
    
    try {
        const session = await stripe.checkout.sessions.create({
            billing_address_collection: "required",
            cancel_url: "http://localhost:3000/cart",
            customer_email: metaData.email,
            metadata: {
                name: metaData.name,
                address: metaData.address,
                addressLine2: metaData.addressLine2,
                city: metaData.city,
                country: metaData.country,
                postcode: metaData.postcode,
                phone: metaData.phone
            },
            mode: "payment",
            payment_method_types: ["card", "ideal", "sepa_debit"],
            success_url: "http://localhost:3000/checkout/review?id={CHECKOUT_SESSION_ID}",
            line_items: mergeProducts.map((product: IProductStorage) => ({
                price_data: {
                    unit_amount: product.price,
                    currency: "EUR",
                    product_data: {
                        name: product.name,           
                    },
                },
                quantity: product.quantity
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