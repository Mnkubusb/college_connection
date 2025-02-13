"use server"
import { db } from "@/lib/db";
import { S3Client , PutObjectCommand ,  } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { error } from "console";



const s3 = new S3Client({
    region: process.env.AWS_S3_REGION as string,
    credentials: {
        accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID as string,
        secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY as string,
    },
});

const maxFileSize = 100 * 1024 * 1024;

export async function getSignedURL( type: string , name: string , size: number , checksum: string) {

    if (size > maxFileSize) {
        return {
            error: "File size is too large. Max size is 100MB."
        }
    }

    const putObjectCommand = new PutObjectCommand({
        Bucket: process.env.AWS_S3_BUCKET_NAME,
        Key: name,
        ContentType: type,
        ChecksumSHA256: checksum
    });

    const signedUrl = await getSignedUrl( s3, putObjectCommand, { expiresIn: 3600 });

    return {
        success : {
            url: signedUrl
        }
    }
}

export async function updateDb( { name , notesListId , signedUrl } : { name: string , notesListId: string , signedUrl: string} ){

    const noteList = db.notesList.findUnique({
        where:{
            id: notesListId,
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
    
    await db.chapters.create({
        data: {
            notesListId,
            title : name.split(".pdf")[0],
            position : position++,
            fileUrl: signedUrl.split("?")[0]
        }
    })
}