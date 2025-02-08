"use server";
import { ProfileSchema } from '../schemas';
import * as z from 'zod';
import { db } from '@/lib/db';
import { getProfile } from '@/lib/profile';
import { revalidatePath } from 'next/cache';
import { currentUser } from '@/lib/auth';




export const onboard = async (values: z.infer<typeof ProfileSchema>) => {

    const validatedValues = await ProfileSchema.safeParseAsync(values);

    if (!validatedValues.success) {
        return { error: "Invalid values" }
    }

    const { batch, department, wannabe, skills, story, insta, linkedin, github, twitter } = validatedValues.data;

    if (skills.length > 5) {
        return { error: "Only 5 skills are allowed" }
    }

    const existingUser = await currentUser();

    if (!existingUser) {
        return { error: "User not found" }
    }

    if ( await getProfile(existingUser?.id as string)) {
        return { error: "Profile already exists" }
    }


    const normalizeUrl = (url: string | undefined, prefix: string) => {
        if (!url) return undefined;
        if (url.startsWith("@")) return `${prefix}${url.slice(1)}`
        return url.startsWith(prefix) ? url : `${prefix}${url}`;
    };

    const normalizedUrls = {
        insta: normalizeUrl(insta, "https://instagram.com/"),
        linkedin: normalizeUrl(linkedin, "https://linkedin.com/in/"),
        github: normalizeUrl(github, "https://github.com/"),
        twitter: normalizeUrl(twitter, "https://x.com/"),
    };


    await db.$transaction([
        db.user.update({
            where: { id: existingUser.id },
            data: { isFirstLogin: false }
        }),
        db.profile.create({
            data: {
                name: existingUser?.name as string,
                userId: existingUser?.id as string,
                image: existingUser?.image as string,
                batch,
                branch: department,
                wannabe,
                skills,
                bio: story,
                ...normalizedUrls,
            }
        })
    ]);



    revalidatePath("/auth/onboarding");
    revalidatePath("/profile");
    return { success: "Profile created", message:"You Will be redireted to your profile" }
}