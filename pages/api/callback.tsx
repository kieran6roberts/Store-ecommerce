import type { NextApiRequest, NextApiResponse } from "next";

import initAuth0 from "@/lib/auth";

export default async function callback(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
        await initAuth0.handleCallback(req, res, { 
            redirectTo: "/" 
        });
    } catch(error) {
        console.error(error);
        res.status(error.status ?? 500).end(error.message);
    }
}