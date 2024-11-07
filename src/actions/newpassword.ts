"use server"
import { ForgotPasswordSchema } from "@/schemas";
import * as z from "zod";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";

export const newpassword = async (
    values: z.infer<typeof ForgotPasswordSchema>,
    token : string | null
) => {
    if(!token)return{error: "Missing Token"};
    const validatedFields = await ForgotPasswordSchema.safeParseAsync(values);

    if(!validatedFields.success){
        return { error: "Invalid Password" }   
    }

    const { newPassword } = validatedFields.data;

    const existingToken = await getPasswordResetTokenByToken(token);

    if(!existingToken){
        return { error: "Invalid token"}
    }

    const hasExpired = new Date(existingToken.expires) < new Date()

    if(hasExpired){
        return{ error : "Verification link is expired"}
    }

    const existingUser = await getUserByEmail(existingToken.email);
    if(!existingUser){
        return { error : "User doesn't exist"}
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await db.user.update({
        where : {
            id:existingUser.id
        },
        data:{
            password:hashedPassword
        },
    });
    await db.passwordResetToken.delete({
        where:{ id : existingToken.id }
    });

    return { success : "Password Changed Successfully" }
}