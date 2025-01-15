"use server";
import { ProfileSchema } from '../schemas';
import * as z from 'zod';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';




export const onboard = async (values: z.infer<typeof ProfileSchema>) => {

    const validatedValues = await ProfileSchema.safeParseAsync(values);

    if (!validatedValues.success) {
        return { error: "Invalid values" }
    }

    const { batch, department , wannabe, skills, story , email } = values;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
        return { error: "User not created successfully" }
    }
    
    const profile = await db.user.update({
        where: {
            id: existingUser.id
        },
        data: {
            batch: batch,
            branch: department,
            wannabe: wannabe,
            skills: skills,
            bio: story,
        }
    })

    return { success: "Profile created" }

}