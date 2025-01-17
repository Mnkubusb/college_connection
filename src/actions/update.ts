import { UpdateProfileSchema } from "@/schemas";
import { z } from "zod";

export const update = async (values: z.infer<typeof UpdateProfileSchema>) => {
    const validatedValues = await UpdateProfileSchema.safeParseAsync(values);

    if (!validatedValues.success) {
        return { error: "Invalid values" }
    }

    return {
        success: "Profile updated successfully"
    }
}