"use server";
import * as z from "zod";
import { getUserByEmail } from "../data/user";
import { LoginSchema } from "../schemas";
import { DEFAULT_LOGIN_REDIRECT } from "../routes";
import { signIn } from "../auth";
import { AuthError } from "next-auth";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { db } from "@/lib/db";


export const login = async (values: z.infer<typeof LoginSchema>) => {

    const validatedFields = await LoginSchema.safeParseAsync(values);
    if (!validatedFields.success) {
        return { error: "Invalid email or Password" }
    }

    const { email, password } = validatedFields.data;

    const existingUser = await getUserByEmail(email);
    if (!existingUser || !existingUser.password) {
        return { error: "User not found or login method is different" }
    }
    if (!existingUser.email) {
        return {
            error: "Email Already Registered with different login method"
        }
    }

    if(!existingUser?.emailVerified) {

        const verificationToken = await generateVerificationToken(existingUser.email);
        await sendVerificationEmail(verificationToken.email, verificationToken.token);
        return {
            error: "Email not verified Please verify your email",
            verificationToken
        }
    }
    try {
        await signIn("credentials", {
            email,
            password,
            redirectTo: DEFAULT_LOGIN_REDIRECT
        })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return {
                        error: "Invalid Credentials"
                    }
                default:
                    return {
                        error: "Something went wrong"
                    }
            }
        }
    }

    return {
        success: "Login Successful"
    }
} 