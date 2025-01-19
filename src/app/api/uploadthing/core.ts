
import { createUploadthing, type FileRouter } from "uploadthing/next";


const f = createUploadthing();


// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
    profileImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
        .onUploadComplete(() => {
            try {
                console.log("Upload complete");
            } catch (error) {
                console.log("Upload error", error);
            }
        }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
