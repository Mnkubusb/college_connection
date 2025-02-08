import NextAuth from "next-auth"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "@/lib/db"
import authConfig from "./auth.config"
import { getUserById } from "./data/user"
import { UserRole } from "@prisma/client"
import { getAccountByUserId } from "@/lib/account"


export const { handlers, signIn, signOut, auth } = NextAuth({
    
    secret: process.env.AUTH_SECRET,
    pages: {
        signIn: "/auth/login"
    },

    events: {
      async linkAccount({user}){
        await db.user.update({
          where: {
            id: user.id
          },
          data: {
            emailVerified: new Date()
          }
        })
      },
    },

    callbacks: {
        async signIn({ user, account }) {
          
            if (account?.provider !== "credentials") return true;

            const existingUser = await getUserById(user.id);
            console.log(user.id)

            if (!existingUser?.emailVerified) return false
            
            return true
        },
        async session({ token, session })  {
            if(token.sub && session.user) {
              session.user.id = token.sub;
            }
            if(token.role && session.user) {
              session.user.role = token.role as UserRole;
            }
            if(session.user) {
              session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
              session.user.name = token.name;
              session.user.email = token.email as string;
              session.user.isOAuth = token.isOAuth as boolean;
              session.user.isFirstLogin = token.isFirstLogin as boolean;
              session.user.image = token.image as string;
              session.user.coins = token.coins as number;
            }
            return session;
          },
          async jwt ({ token}) {
            if(!token.sub) {
              return token
            }
      
            const existingUser = await getUserById(token.sub);
      
            if(!existingUser) {
              return token
            }

            const existingAccount = getAccountByUserId(existingUser.id);
            token.isOAuth = !existingAccount;
            token.name = existingUser.name;
            token.role = existingUser.role;
            token.email = existingUser.email;
            token.isFirstLogin = existingUser.isFirstLogin;
            token.image = existingUser.image;
            token.coins = existingUser.coins;
             return token
        }
    },

    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
})