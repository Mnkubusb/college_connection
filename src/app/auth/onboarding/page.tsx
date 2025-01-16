"use server"
import OnboardForm from '@/components/auth/onboard-form'
import Header from '@/components/Header'
import { currentUser } from '@/lib/auth'
import React from 'react'

const Onboard = async () => {

    const user = await currentUser();

    return (
        <div>
            <Header Name='College Connections'></Header>
            <div className="flex flex-col px-1 relative h-[80vh] sm:h-full w-full">
                <OnboardForm user={user} />
            </div>
        </div>
    )
}

export default Onboard
