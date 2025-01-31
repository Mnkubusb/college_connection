"use server"
import OnboardForm from '@/components/auth/onboard-form'
import Header from '@/components/Header'
import { currentUser } from '@/lib/auth'
import React from 'react'

const Onboard = async () => {

    const user = await currentUser();

    return (
        <div className='h-full w-full overflow-auto overflow-x-hidden scroll scroll-smooth'>
            <Header Name='College Connections'></Header>
            <div className="h-full w-full">
                <OnboardForm user={user} />
            </div>
        </div>
    )
}

export default Onboard
