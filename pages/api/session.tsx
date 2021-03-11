import { ApolloClient, InMemoryCache } from "@apollo/client";
import type { NextApiRequest, NextApiResponse } from "next";

import initAuth from "@/lib/auth";
import { UPDATE_USER } from "@/queries/users";

export default async function updateUser(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
        const session = await initAuth.getSession(req);

        console.log(session)
        console.log(req.body)

        const client = new ApolloClient({
            uri: process.env.NEXT_PUBLIC_HASURA_API!,
            cache: new InMemoryCache(),
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${session?.accessToken}`
            }
        });

        const data = await client.mutate({
            mutation: UPDATE_USER,
            variables: {
                id: {
                    _eq: session?.user.sub
                },
                changes: req.body
            }
        });

        return res.status(200).json(data);

    } catch(error) {
        return res.status(error.status ?? 500).end(error.message);
    }
}

