import type { NextApiRequest, NextApiResponse } from "next";

import initAuth from "@/lib/auth";

async function logout(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    try {
        await initAuth.handleLogout(req, res);
    } catch(error) {
        console.error(error);
        res.status(error.status ?? 500).end(error.message);
    }
}

export default logout;