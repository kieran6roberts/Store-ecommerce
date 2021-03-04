import { initAuth0 } from "@auth0/nextjs-auth0";

const config = require("@/lib/config")!;

export default initAuth0({
    audience: config.AUTH0_AUDIENCE,
    clientId: config.AUTH0_CLIENT_ID,
    clientSecret: config.AUTH0_CLIENT_SECRET,
    domain: config.AUTH0_DOMAIN,
    scope: "openid profile email",
    redirectUri: config.REDIRECT_URI,
    postLogoutRedirectUri: config.POST_LOGOUT_REDIRECT,
    session: {
        cookieSecret: config.SESSION_COOKIE_SECRET,
        cookieLifetime: 60 * 60 * 8,
        storeAccessToken: true,
        storeIdToken: true,
        storeRefreshToken: true
    }
});