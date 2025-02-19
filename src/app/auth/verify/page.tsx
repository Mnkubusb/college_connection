import VerifyForm from '@/components/auth/verification'
import Header from '@/components/Header'

const Verify = () => {
  return (
    <div className='h-dvh w-full'>
      <Header Name='Login'></Header>
      <div className="flex flex-col px-3 h-full w-full">
        <VerifyForm  />
      </div>
    </div>
  )
}

export default Verify
