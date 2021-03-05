import type { NextApiRequest, NextApiResponse } from "next";

import initAuth from "@/lib/auth";
import { UPDATE_USER } from "@/queries/users";

export default async function updateUser(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
        const session = await initAuth.getSession(req);
        console.log(req.body);
        console.log(session?.user.sub)
        console.log(session);
        
        const result = await fetch(process.env.NEXT_PUBLIC_HASURA_API!, {
            method: "POST",
            body: JSON.stringify({
                query: UPDATE_USER,
                variables: {
                    auth0_id: session!.user.sub,
                    changes: req.body
                },
                operationName: "UserMutation"        
            }),
            headers: {
                "x-hasura-default-role": "user",
                "x-hasura-allowed-roles": "user",
                "Content-Type": "application/json",
                Authorization: `Bearer ${session?.accessToken}`,
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

