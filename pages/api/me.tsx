import type { NextApiRequest, NextApiResponse } from "next";

import initAuth from "@/lib/auth";

async function me(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
        await initAuth.handleProfile(req, res);
    } catch(error) {
        console.error(error);
        res.status(error.status ?? 500).end(error.message);
    }
}

export default me;