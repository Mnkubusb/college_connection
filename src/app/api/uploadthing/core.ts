import { auth } from "@/auth"
import { NextRequest } from "next/server";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();


// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    profileImage: f({ image: { maxFileSize: "4MB" } })
        .middleware(async () => {
            const session = await auth();
            if (!session) {
                throw new UploadThingError("You need to be logged in to upload files");
            }
            return { userId: session.user.id };
        })
        .onUploadComplete(() => { }),

} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
