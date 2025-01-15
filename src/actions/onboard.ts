"use server";
import { ProfileSchema } from '../schemas';
import * as z from 'zod';
import { db } from '@/lib/db';
import { getUserByEmail } from '@/data/user';
import { useCurrentUser } from '@/hooks/get-current-user';




export const onboard = async (values: z.infer<typeof ProfileSchema>) => {

    const validatedValues = await ProfileSchema.safeParseAsync(values);

    if (!validatedValues.success) {
        return { error: "Invalid values" }
    }

    const { batch, department , wannabe, skills, story ,email } = values;

    console.log(email);

    if(skills.length > 5 ){
        return { error : "Only 5 skills are allowed"}
    }

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
        return { error: "User not created successfully" }
    }
    
    await db.user.update({
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