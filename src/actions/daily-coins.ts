"use server"
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db";

export const getDailyCoins = async () => {

    try {
        const Currentuser = await currentUser();
        if (!Currentuser) return ({ error: "Unauthorized" });

        const user = await db.user.findUnique({
            where: {
                id: Currentuser.id
            }, select: {
                coins: true,
                lastLogin: true
            }
        });

        const maxAura = 9000;
        const today = new Date()
        const lastLogin = user?.lastLogin;
        const shouldRecieveCoins = !lastLogin ||
            lastLogin.toDateString() !== today.toDateString()

        if (user?.coins as number >= maxAura) return ({ error: "You have reached the maximum Aura points" })
        if (shouldRecieveCoins) {
            const updatedUser = await db.user.update({
                where: {
                    id: Currentuser.id
                },
                data: {
                    lastLogin: today,
                    coins: (user?.coins || 0) + 1
                }
            });
            await db.profile.update({
                where: {
                    userId: Currentuser.id
                },
                data: {
                    coins: (user?.coins || 0) + 1
                }
            })
            return {
                coins: updatedUser?.coins,
                lastLoginDate: updatedUser?.lastLogin,
                success: "You got 1 Aura point for Login"
            }
        }

        return {
            coins: user?.coins,
            lastLoginDate: user?.lastLogin,
            newCoin: false,
        }
    } catch (error) {
        console.log("[DAILY_COINS]", error)
        return ({ error: "Internal Server Error" })
    }
}