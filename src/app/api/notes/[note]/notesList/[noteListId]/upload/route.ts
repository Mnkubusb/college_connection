import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"

const s3Client = new S3Client({
    region: process.env.AWS_S3_REGION as string,
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY as string,
    },
});

async function UploadtoS3Bucket( file:Buffer , fileName: string) {
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




export async function POST(req: Request, { params }: { params: { note: string; noteListId: string } }) {
    try {
        console.log("[upload]")
        const formData = await req.formData();
        const Files = formData.getAll("files") as File[];

        if (!Files || Files.length === 0) {
            return new NextResponse("No files selected", { status: 400 })
        }

        const uploadedArray = [];

        for (const file of Files) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const fileName = await UploadtoS3Bucket(buffer, file.name)
            uploadedArray.push(fileName)
        }

        const noteList = db.notesList.findUnique({
            where:{
                id: params.noteListId,
            },include:{ 
                chapters:{
                    orderBy:{
                        position:"asc"
                    }
                }
            }
        });

        if(!noteList) return new NextResponse("Note Does not Exist", { status: 404 });

        const positionStart = noteList.chapters.length;
        let position = positionStart;

        uploadedArray.map( async (file)=>(
            await db.chapters.create({
                data:{
                    notesListId : params.noteListId,
                    title: file.split(".pdf")[0],
                    position: position++ ,
                    fileUrl: `https://college-connections.s3.ap-south-1.amazonaws.com/${encodeURIComponent(file)}`
                }
            })
        ));

        return new NextResponse("Chapter Uploaded Successfully", { status: 200 })

    } catch (error) {
        console.log("[upload]", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}