
import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { db } from "./db";
import crypto from "crypto";
import {v4 as uuidv4} from "uuid";

export const generateVerificationToken = async  ( email:string )=>{
    const token = crypto.randomInt(100_000,1_000_000).toString();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const verificationToken = await db.verificationToken.create({
        data:{
            email,
            token,
            expires
        }
    })
    return verificationToken;
};


export const generatePasswordResetToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existingToken = await getPasswordResetTokenByEmail(email);

    if (existingToken) {
        await db.passwordResetToken.delete({
            where: {
                id: existingToken.id
            }
        });
    }
    
    const passwordResetToken = await db.passwordResetToken.create({
        data: {
            email,
            token,
            expires
        }
    })
    return passwordResetToken;
}