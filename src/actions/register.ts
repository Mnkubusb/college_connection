"use server";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "../schemas";
import * as z from "zod";
import { getUserByEmail } from "../data/user";
import { db } from "@/lib/db";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";


export const register = async ( values: z.infer<typeof RegisterSchema> )=>{
    const validatedFields = await RegisterSchema.safeParseAsync(values);

    if(!validatedFields.success){
        return { error: "Invalid email or Password" }
    }

    const { firstName, lastName, email, password , confirmPassword } = validatedFields.data
    
    if(password !== confirmPassword){
        return { error: "Passwords do not match" }
    }
    const name = firstName + " " + lastName
    const hashedPassword = await bcrypt.hash(password, 10)
    const existingUser = await getUserByEmail(email)

    if(existingUser){
        return { error: "User already exists" }
    }

    const verifyToken = await generateVerificationToken(email);
    await sendVerificationEmail(verifyToken.email, verifyToken.token);


    const user = await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    return { success: "User created successfully" }
    
}