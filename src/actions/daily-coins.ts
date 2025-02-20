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
                dailyCoins: true,
                lastLogin: true,
                coins: true
            }
        });

        const today = new Date()
        const lastLogin = user?.lastLogin;
        const shouldRecieveCoins = !lastLogin ||
            lastLogin.toDateString() !== today.toDateString()
        const isGreaterThanTommorrow = parseInt(lastLogin?.toDateString() as string) + 1 > parseInt(today.toDateString())

        const isFirstLogin = !lastLogin
        const tenDaysfromNow = new Date(today)
        tenDaysfromNow.setDate(tenDaysfromNow.getDate() + 10)
        const isTenDaysFromNow = parseInt(lastLogin?.toDateString() as string) + 10 > parseInt(tenDaysfromNow.toDateString())

        if(!isTenDaysFromNow && isFirstLogin) {
            const updatedUser = await db.user.update({
                where: {
                    id: Currentuser.id
                },
                data: {
                    lastLogin: today,
                    coins: (user?.coins || 0) + 100,
                    dailyCoins: (user?.dailyCoins || 0) + 1
                }
            });
            return {
                coins: updatedUser?.coins,
                lastLoginDate: updatedUser?.lastLogin,
                success: "100 Aura Points as First Login Bonus"
            }   
        }

        if (isGreaterThanTommorrow) {
            const updatedUser = await db.user.update({
                where: {
                    id: Currentuser.id
                },
                data: {
                    lastLogin: today,
                    dailyCoins: 1
                }
            });
            return {
                coins: updatedUser?.coins,
                lastLoginDate: updatedUser?.lastLogin,
            }
        }

        if (shouldRecieveCoins) {
            const updatedUser = await db.user.update({
                where: {
                    id: Currentuser?.id
                },
                data: {
                    lastLogin: today,
                    dailyCoins: (user?.dailyCoins|| 0) + 1
                }
            });
            return {
                coins: updatedUser?.coins,
                lastLoginDate: updatedUser?.lastLogin,
                success: "1 coin added as you logged in today"
            }
        }

        return {
            coins: user?.dailyCoins,
            lastLoginDate: user?.lastLogin,
            newCoin: false,
        }
    } catch (error) {
        console.log("[DAILY_COINS]", error)
        return ({ error: "Internal Server Error" })
    }
}