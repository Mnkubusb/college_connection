import { UserRole } from "@prisma/client";
import { DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
    role: UserRole;
    isTwoFactorEnabled: boolean;
    isOAuth : boolean;
    isFirstLogin: boolean;
    coins: number;
};

declare module "next-auth" {
    interface Session {
        user: ExtendedUser;
    }
}