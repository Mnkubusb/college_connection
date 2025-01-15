"use client"
import OnboardForm from '@/components/auth/onboard-form'
import Header from '@/components/Header'
import React from 'react'

const Onboard = () => {
    return (
        <div>
            <Header Name='College Connections'></Header>
            <div className="flex flex-col px-1 relative h-[80vh] sm:h-full w-full">
                <OnboardForm />
            </div>
        </div>
    )
}

export default Onboard
