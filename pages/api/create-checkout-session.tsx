import { ApolloClient, InMemoryCache } from "@apollo/client";
import type { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

import { allowedShippingCountries } from "@/components/Forms/CheckoutForm/CheckoutForm";
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

    console.log(req.body)
    
    try {
        const session = await stripe.checkout.sessions.create({
            billing_address_collection: "required",
            cancel_url: "http://localhost:3000/cart",
            customer_email: req.body.email,
            metadata: {
                address: req.body.address,
                addressLine2: req.body.addressLine2,
                city: req.body.city,
                country: req.body.country,
                postcode: req.body.postcode,
                phone: req.body.phone
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