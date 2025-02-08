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

export const ProfileSchema = z.object({ 
    batch: z.string().min(1, { message: "Select your batch"}),
    department: z.string().min(1, { message: "Select your department"}),
    wannabe: z.string().min(1, { message: "Select your Desired Career"}),
    skills: z.string().array().min(1, { message: "Enter your skills"}).max(5, { message: "You can only add 5 skills"}),
    story: z.optional(z.string()),
    insta: z.optional(z.string()),
    linkedin: z.optional(z.string()),
    github: z.optional(z.string()),
    twitter: z.optional(z.string()),
})

export const UpdateProfileSchema = z.object({
    firstName: z.string().min(1, { message: "First Name is required"}),
    lastName: z.optional(z.string()),
    image: z.optional(z.string()),
    batch: z.string().min(1, { message: "Select your batch"}),
    branch: z.string().min(1, { message: "Select your Branch"}),
    wannabe: z.string().min(1, { message: "Select your Desired Career"}),   
    skills: z.string().array().min(1, { message: "Enter your skills"}).max(5, { message: "You can only add 5 skills"}),
    story: z.string().min(10, { message: "Tell us your story in at least 10 words"}),
    insta: z.optional(z.string()),
    linkedin: z.optional(z.string()),
    github: z.optional(z.string()),
    twitter: z.optional(z.string()),
})
