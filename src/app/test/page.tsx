import SetupPage from "@/components/auth/setup-page"
import Header from "@/components/Header"


const ProfileSetup = () => {
  return (
    <div className="flex flex-col h-[90vh] sm:overflow-hidden sm:h-full sm:w-full">
        <Header Name="Profile Setup"></Header>
        <div className="flex relative h-[80vh] sm:h-full sm:w-full">
            <SetupPage />
        </div>
    </div>
  )
}

export default ProfileSetup
