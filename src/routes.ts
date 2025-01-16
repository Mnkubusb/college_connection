export const publicRoutes = [  
    "/notes",
    "/links",
    "/about",
    "/contact",
    "/auth/verify",
    "/auth/new-password",
    "/notes/[note]",
    "/auth/onboarding"
];

export const authRoutes = [
    "/auth/login",
    "/auth/signup",
    "/auth/reset",
];

export const apiAuthPrefix = "/api/auth";
export const DEFAULT_LOGIN_REDIRECT = "/profile";