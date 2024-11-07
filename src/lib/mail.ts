import { Resend } from "resend";

const resend = new Resend("re_W4YADNT4_A4BEn3eUFjrmqFJ4JdFaoes3");

const domain = process.env.NEXT_PUBLIC_APP_URL 


export const sendVerificationEmail = async (email: string, token: string) => {
    await resend.emails.send({
        from: "onbaording@resend.dev",
        to: email,
        subject: "Verify your email",
        text: `Your otp is: ${token}`,
        html: `<div>Your OTP is ${token}</div>`,
    });
};
export const sendPasswordResetEmail = async (email: string, token: string) => {
    const url = `${domain}/auth/new-password?token=${token}`
    await resend.emails.send({
        from: "onbaording@resend.dev",
        to: email,
        subject: "Reset your password",
        text: `Your Token is: ${token}`,
        html: `<div>Click the link below to reset your password</div>
        <a href="${url}">Reset your password</a>
        `,
    });
};

