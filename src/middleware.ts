import authConfig from "./auth.config"
import NextAuth from "next-auth"

import {
    DEFAULT_LOGIN_REDIRECT,
    authRoutes,
    apiAuthPrefix,
    publicRoutes,
    Onboard
} from "./routes";
import { currentUser } from "./lib/auth";

const { auth } = NextAuth(authConfig)

export default auth(async (req) => {

    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoutes = authRoutes.includes(nextUrl.pathname);
    const isOnboardingRoute = nextUrl.pathname === Onboard;

    if (isApiAuthRoute) {
        return undefined;
    }
    if (isAuthRoutes) {
        if (isLoggedIn) {
            const user = await currentUser();
            if (user?.isFirstLogin){
                if (isOnboardingRoute) {
                    return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
                }
            }
            return Response.redirect(new URL( DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return undefined;
    }

    if(isOnboardingRoute){
        if(isLoggedIn){
            const user = await currentUser();
            if(user?.isFirstLogin){
                return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
            }
        }
    }
    
    if (!isLoggedIn && !isPublicRoute) {
        let callbackUrl = nextUrl.pathname;
        if (nextUrl.search) {
            callbackUrl += nextUrl.search;
        }
        const encodedCallBackUrl = encodeURIComponent(callbackUrl)

        return Response.redirect(new URL(`/auth/login?callbackUrl=${encodedCallBackUrl}`, nextUrl));
    }
    return undefined;
})

export const config = {
    matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};