import { ApolloClient, InMemoryCache } from "@apollo/client";
import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

import { CREATE_ORDER } from "@/queries/orders";
import { IUsersValidation } from "@/utils/validation/users";

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

    try {
        const session = await stripe.checkout.sessions.retrieve(
            event.data.object.id, {
                expand: ["line_items", "customer"]
            }
        );

    
        const userObject = session?.metadata as IUsersValidation;

        const response = await client.mutate({
            mutation: CREATE_ORDER,
            variables: {
                data: {
                    name: userObject.name,
                    email: session.customer_email,
                    phone: userObject.phone,
                    total: session.amount_total,
                    stripeCheckoutId: session.id,
                    fulfilled: true,
                    orderItems: {
                        create: session.line_items?.data.map(item => ({
                            name: item.id,
                            quantity: item.quantity,
                            price: item.amount_total,
                        }))
                    },
                    billingAddress: {
                        create: {
                            name: userObject.name,
                            address1: userObject.address,
                            address2: userObject.addressLine2,
                            city: userObject.city,
                            country: userObject.country,
                            zip: userObject.postcode,
                            phone: userObject.phone
                        }
                    },
                    shippingAddress: {
                        create: {
                            name: userObject.name,
                            address1: userObject.address,
                            address2: userObject.addressLine2,
                            city: userObject.city,
                            country: userObject.country,
                            zip: userObject.postcode,
                            phone: userObject.phone
                        }
                    }
                }
            }
        });

        return res.json({ message: "success" });

    } catch (err) {
        return res.json({ error: { message: err }});
    }
}

export default orderWebhook;