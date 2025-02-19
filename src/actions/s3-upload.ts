"use server"
import { currentUser } from "@/lib/auth";
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

    const user = await currentUser();

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
            userId: user?.id,
            notesListId,
            title : name.split(".pdf")[0],
            position : position++,
            fileUrl: signedUrl.split("?")[0]
        }
    })

    const UserUploading = await db.user.findUnique({
        where: {
            id: user?.id
        }
    })

    if(!UserUploading) return{ error : "User not found"}

    if(UserUploading.coins >= 9000) return{ error : "You have reached the maximum coins limit"}

    await db.user.update({
        where: {
            id: user?.id
        },
        data: {
            coins: UserUploading?.coins + 10
        }
    })

    await db.profile.update({
        where: {
            userId: user?.id
        },
        data: {
            coins: UserUploading?.coins + 10
        }
    })

    return { success : "You got 10 aura Points" }
    
}