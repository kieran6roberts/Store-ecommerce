import type { NextApiRequest, NextApiResponse } from "next";

import initAuth from "@/lib/auth";
import { UPDATE_USER } from "@/queries/users";

export default async function updateUser(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
        const session = await initAuth.getSession(req);
        console.log(session);

        const tokenCache = initAuth.tokenCache(req, res);
        const { accessToken } = await tokenCache.getAccessToken();
        
        const result = await fetch(process.env.NEXT_PUBLIC_HASURA_API!, {
            method: "POST",
            body: JSON.stringify({
                query: UPDATE_USER,
                variables: JSON.parse(req.body),
                operationName: "UserMutation"        
            }),
            headers: {
                Authorization: `Bearer ${session!.accessToken}`,
                "Content-Type": "application/json",
            }
        });
        

        const data = await result.json();
        console.log(data);
        res.status(200).json(data);
    } catch(error) {
        console.error(error);
        res.status(error.status ?? 500).end(error.message);
    }
}

