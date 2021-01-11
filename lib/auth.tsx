import { initAuth0 } from "@auth0/nextjs-auth0";

import config from "@/lib/config";

const initAuth = initAuth0({
    audience: config.AUTH0_AUDIENCE,
    clientId: config.AUTH0_CLIENT_ID,
    clientSecret: config.AUTH0_CLIENT_SECRET,
    domain: config.AUTH0_DOMAIN,
    scope: config.AUTH0_SCOPE,
    redirectUri: config.REDIRECT_URI,
    postLogoutRedirectUri: config.POST_LOGOUT_REDIRECT,
    session: {
        cookieSecret: "<RANDOMLY_GENERATED_SECRET>",
        cookieLifetime: 60 * 60 * 8,
        storeIdToken: true,
        storeRefreshToken: true,
        storeAccessToken: true,
    }
});

export default initAuth;