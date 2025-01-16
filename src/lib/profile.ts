import { db } from "./db"


export const getProfile = async (userId: string) => {
    const Profile = await db.profile.findFirst({
        where: {
            userId
        }
    })
    return Profile
}   


export const getProfiles = async () => {
    
    const Profiles = await db.profile.findMany({})
    return Profiles
}

export const getProfileByName = async (name: string) => {
    const Profile = await db.profile.findFirst({
        where: {
            name
        }
    })
    return Profile
}
