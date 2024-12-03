import * as z from "zod";

export const LoginSchema =z.object({
    email: z.string().email(
        {message: "Invalid email Address"}
    ),
    password: z.string().min(1, { message: "Password is required"})
})


export const RegisterSchema =z.object({
    firstName: z.string().min(1, { message: "First Name is required"}),
    lastName: z.optional(z.string()),
    email: z.string().email(
        {message: "Invalid email Address"}
    ),
    password: z.string().min(1, { message: "Password is required"}),
    confirmPassword: z.string().min(1, {message:"Confirm your Password "})
})
.refine((data)=>{
    if(data.password && !data.confirmPassword){
        return false
    }
    return true
},{
    message:"Confirm Password is required",
    path:["confirmPassword"]
})
.refine((data)=>{
    if(!data.password && data.confirmPassword){
        return false
    }
    return true
},{
    message:"Password is required",
    path:["password"]
})



export const VerificationSchema = z.object({
    code: z.string().min(1, { message: "Code is required"})
})

export const ForgotPasswordSchema = z.object({
    password: z.string().min(1, { message: "Password is required"}),
    newPassword: z.string().min(1, { message: "Password is required"})
})

export const ResetSchema = z.object({
    email: z.string().email({message: "Invalid email Address"}),
})