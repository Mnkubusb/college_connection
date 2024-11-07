import { db } from "./db"

export const getAccountByUserId = (userId: string) => {
    const account = db.account.findFirst({
        where: {
            userId
        }
    })

    return account
}