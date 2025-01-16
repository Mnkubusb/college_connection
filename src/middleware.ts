import authConfig from "./auth.config"
import NextAuth from "next-auth"

import {
    DEFAULT_LOGIN_REDIRECT,
    authRoutes,
    apiAuthPrefix,
    publicRoutes
} from "./routes";
    
const { auth } = NextAuth(authConfig)

export default auth(( req )=>{
    const { nextUrl } = req;
    const isLoggedIn = !!req.auth;
    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoutes = authRoutes.includes(nextUrl.pathname);

    if(isApiAuthRoute){
        return undefined;
    }
    if(isAuthRoutes){
        if(isLoggedIn){
            return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
        }
        return undefined;
    }
    if(!isLoggedIn && !isPublicRoute){
        let callbackUrl = nextUrl.pathname;
        if(nextUrl.search){
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