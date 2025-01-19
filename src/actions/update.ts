"use server"
import { getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { UpdateProfileSchema } from "@/schemas";
import { z } from "zod";

export const update = async (values: z.infer<typeof UpdateProfileSchema>) => {
    const validatedValues = await UpdateProfileSchema.safeParseAsync(values);

    if (!validatedValues.success) {
        return { error: validatedValues.error.errors };
    }

    const user = await currentUser();

    if(!user){
        return { error: "Unauthorized" }
    }

    const dbUser = await getUserById(user.id)

    if(!dbUser){
        return { error: " Unauthorized" }

    } 

    const { firstName, lastName, batch, branch, wannabe, skills, story , image , insta, linkedin, github, twitter} = validatedValues.data;

    const name = `${firstName.trim()} ${lastName?.trim()}`;

    const normalizeUrl = (url: string | undefined, prefix: string) => {
        if (!url) return undefined;
        if(url.startsWith("@")) return `${prefix}${url.slice(1)}`
        return url.startsWith(prefix) ? url : `${prefix}${url}`;
    };

    const normalizedUrls = {
        insta: normalizeUrl(insta, "https://instagram.com/"),
        linkedin: normalizeUrl(linkedin, "https://linkedin.com/in/"),
        github: normalizeUrl(github, "https://github.com/"),
        twitter: normalizeUrl(twitter, "https://x.com/"),
    };

    try {
        await db.$transaction([
            db.user.update({
                where: { id: dbUser.id },
                data: { name, image },
            }),
            db.profile.update({
                where: { userId: dbUser.id },
                data: {
                    name,
                    image,
                    batch,
                    branch,
                    wannabe,
                    skills,
                    bio: story,
                    ...normalizedUrls,
                },
            }),
        ]);

        return { success: "Profile updated successfully" };
    } catch (error) {
        return { error: "Failed to update profile. Please try again." };
    }
};
