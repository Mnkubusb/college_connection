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

    if (await getProfile(existingUser?.id as string)) {
        return { error: "Profile already exists" }
    }


    const normalizeUrl = (url: string | undefined, prefix: string) => {
        if (!url) return undefined;
        if (url.startsWith("@")) return `${prefix}${url.slice(1)}`
        return url.startsWith(prefix) ? url : `${prefix}${url}`;
    };

    const normalizedUrls = {
        insta: normalizeUrl(insta, "https://instagram.com/"),
        linkedin: normalizeUrl(linkedin, "https://www.linkedin.com/in/"),
        github: normalizeUrl(github, "https://github.com/"),
        twitter: normalizeUrl(twitter, "https://x.com/"),
    };

    const auraPointsForBranchs = [
        { label: "Information Technology", value: 80 },
        { label: "Computer Science Engineering", value: 80 },
        { label: "Electronics and Telecommunications", value: 70 },
        { label: "Electrical Engineering", value: 60 },
        { label: "Mechanical Engineering", value: 60 },
        { label: "Civil Engineering", value: 60 },
        { label: "Mining Engineering", value: 60 },
    ]

    const auraPointsForSkills = [
        { label: "Python", value: 25 },
        { label: "JavaScript", value: 25 },
        { label: "TypeScript", value: 30 },
        { label: "Java", value: 25 },
        { label: "C++", value: 25 },
        { label: "C#", value: 25 },
        { label: "Kotlin", value: 25 },
        { value: "Leadership", label: 20 },
        { label: "UI/UX Design", value: 30 },
        { label: "Game Development", value: 30 },
        { value: "Communication Skills", label: 20 },
        { value: "Team Collaboration", label: 20 },
        { value: "CAD Design", label: 15 },
        { value: "MATLAB", label: 15 },
        { value: "AutoCAD", label: 15 },
        { value: "Artificial Intelligence", label: 30 },
        { value: "Machine Learning", label: 30 },
        { value: "Internet Of Things", label: 30 },
        { value: "Blockchain", label: 30 },
        { value: "Augmented Reality", label: 30 },
        { value: "Virtual Reality", label: 30 },
        { value: "3D Printing", label: 30 },
        { value: "Big Data", label: 30 },
        { value: "Cloud Computing", label: 30 },
        { value: "Cybersecurity", label: 30 },
    ]


    const branchAura = auraPointsForBranchs.find(branch => branch.label === department)?.value || 0;
    const skillsAura = auraPointsForSkills
        .filter(skill => skills.includes(skill.label as string))
        .reduce((acc, curr) => acc + Number(curr.value), 0);

    const totalAura = branchAura + skillsAura;

    await db.$transaction([
        db.user.update({
            where: { id: existingUser.id },
            data: { 
                isFirstLogin: false ,
                coins: totalAura
             }
        }),
        db.profile.create({
            data: {
                name: existingUser?.name as string,
                userId: existingUser?.id as string,
                image: existingUser?.image as string,
                batch,
                coins: totalAura,
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
    return { success:`Congratulations You have a Aura of  ${totalAura}`};
}