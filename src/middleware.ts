"use server"
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
import { getUserById } from "./data/user";

const { auth } = NextAuth(authConfig)

export default auth(async (req) => {
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoutes = authRoutes.includes(nextUrl.pathname);
    const isOnboardingRoute = nextUrl.pathname === Onboard;
    const user = await currentUser();
    // const UserDeleted = req.auth?.user?.email === null;
    // console.log(UserDeleted, req.auth)

    if (isApiAuthRoute) return undefined;

    // if ( UserDeleted && !isLoggedIn) {
    //     const user = await currentUser();
    //     const existingUser = await getUserById(user?.id);
    //     if (!existingUser) {
    //         return Response.redirect(new URL("/api/auth/signout", nextUrl)); // Call logout API
    //     }
    // }

    if (isAuthRoutes) {
        if (isLoggedIn) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return undefined;
    }

    if (isLoggedIn) {
        if (isOnboardingRoute && !user?.isFirstLogin) {
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        if (!isOnboardingRoute && user?.isFirstLogin) {
            return Response.redirect(new URL("/auth/onboarding", nextUrl));
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