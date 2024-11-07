"use server"

import { getUserByEmail } from "@/data/user";
import { getVerificationToken } from "@/data/verify-token"
import { db } from "@/lib/db";
import { VerificationSchema } from "@/schemas";
import * as z from "zod";

export const verify = async (values: z.infer<typeof VerificationSchema>) => {
    
    const validatedFields = await VerificationSchema.safeParseAsync(values);
    if(!validatedFields.success) return null;

    const { code } = validatedFields.data;

    const existingToken = await getVerificationToken(code);

    if(!existingToken) return {
        error: "Otp not found"
    };

    const hasExpired = new Date(existingToken.expires) < new Date();

    if(hasExpired){
        return {
            error: "Otp has expired"
        }
    }

    const existingUser = await getUserByEmail(existingToken.email);
    if(!existingUser){
        return {
            error: "User not found"
        }    
    }

    if(existingToken.token !== code){
        return {
            error: "Invalid otp"        
        }
    }

    await db.user.update({
        where:{
            id: existingUser.id,
        },
        data:{
            emailVerified:new Date(),
            email: existingToken.email
        }
    });

    await db.verificationToken.delete({
        where:{
            id: existingToken.id
        }
    });

    return {
        success: "Email verified successfully"
    }

}