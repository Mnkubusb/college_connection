"use server"
import { db } from "@/lib/db";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"

const s3Client = new S3Client({
    region: process.env.AWS_S3_REGION as string,
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY as string,
    },
});

export async function UploadtoS3Bucket( file:Buffer , fileName: string) {

    console.log("Inside s3 Upload function")
    const fileBuffer = file;

    const params = {
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: `${fileName}`,
        Body: fileBuffer,
        ContentType: "application/pdf",
        ContentDisposition: "inline",
    }

    const command = new PutObjectCommand(params);
    try{
        const response = await s3Client.send(command);
        console.log("File Uplaoded successfully", response);
        return fileName;
    }catch(error){
        throw error;
    }
}

export async function upload( noteListId:string ,  formData: FormData) {
    try{
        console.log("Inside upload function");
        const Files = formData.getAll("files") as File[];
        
        if(!Files || Files.length === 0){
            return { error: "No files selected" };
        }

        const uploadedArray = [];

        for(const file of Files){
            const buffer = Buffer.from(await file.arrayBuffer());
            const fileName = await UploadtoS3Bucket(buffer , file.name)
            uploadedArray.push(fileName)
        }
        console.log(uploadedArray);

        const noteList = db.notesList.findUnique({
            where:{
                id: noteListId,
            },include:{ 
                chapters:{
                    orderBy:{
                        position:"asc"
                    }
                }
            }
        });

        if(!noteList) return{ error : "Note not found"}

        const positionStart = noteList.chapters.length;
        let position = positionStart;

        uploadedArray.map( async (file)=>(
            await db.chapters.create({
                data:{
                    notesListId : noteListId,
                    title: file.split(".pdf")[0],
                    position: position++ ,
                    fileUrl: `https://college-connections.s3.ap-south-1.amazonaws.com/${encodeURIComponent(file)}`
                }
            })
        ));
        return { success: "Chapter updated successfully" };
    }catch(error){
        return { error: "Something went wrong" };
    }
}