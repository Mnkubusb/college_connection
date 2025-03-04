export const publicRoutes = [  
    "/notes",
    "/links",
    "/about",
    "/contact",
    "/auth/verify",
    "/api/uploadthing",
    "/auth/new-password",
    "/notes/[note]",
    "/noteaccess",
    "/noteaccess/[note]",
    "/noteaccess/[note]/notesList/[noteListId]",  
];

export const Onboard = "/auth/onboarding";

export const authRoutes = [
    "/auth/login",
    "/auth/signup",
    "/auth/reset",
];

export const apiAuthPrefix = "/api/auth";
export const DEFAULT_LOGIN_REDIRECT = "/profile";