"use server"
import OnboardForm from '@/components/auth/onboard-form'
import Header from '@/components/Header'
import { currentUser } from '@/lib/auth'

const Onboard = async () => {
    
    const user = await currentUser();

    return (
        <div className='h-dvh w-full overflow-auto md:overflow-hidden overflow-x-hidden scroll scroll-smooth'>
            <Header Name='College Connections'></Header>
            <div className="h-full w-full md:px-3 flex md:justify-end justify-center items-center ">
                <OnboardForm user={user} />
            </div>
        </div>
    )
}

export default Onboard
