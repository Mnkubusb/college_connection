import Header from "@/components/Header";
import Profile from "@/components/Profile";
export default function Dashboard() {

  const Users = [
    {
      "profilePic":"https://avatars.githubusercontent.com/u/65947443?v=4",
      "Name":"Manik Chand Sahu",
      "Skill":"Web Developer"
    },
    {
      "profilePic":"https://media.licdn.com/dms/image/v2/D4D03AQH1UjifWu1yjw/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1706550302752?e=1733961600&v=beta&t=_U_2DpE14wGgv7U3rNh0HK-yWMljWeZJF9R4BhXsCLk",
      "Name":"Ishant Sinha",
      "Skill":"UI designer"
    },
    {
      "profilePic":"https://media.licdn.com/dms/image/v2/D4D03AQG0Bm2yrjdsqA/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1709900024433?e=1733961600&v=beta&t=oahkGhR5kVAztjFpvKKceRCA-Ky4Fe1vvMBq8TtNl2g",
      "Name":"Harsh Garewal",
      "Skill":"Data Analyst"
    },
  ]

  return (
    <div className="flex flex-col">
      <Header Name="College Connections"></Header>
      <main className="grid flex-1 gap-4 overflow-auto p-2  md:grid-cols-2 lg:grid-cols-3">
        <div
          className="relative flex-col items-start gap-8 flex"
          x-chunk="dashboard-03-chunk-0"
        >
          <div className=" w-[100%] h-[100%] border flex flex-col items-center p-2 gap-2">
            {Users.map((User,index)=>(
              <Profile key={index} profilePic={User.profilePic} Skills={User.Skill} Name={User.Name} >
              </Profile>
            )
          )}
          </div>
        </div>
        <div className="relative md:flex h-full min-h-[50vh] hidden flex-col rounded-xl p-4 lg:col-span-2"></div>
      </main>
    </div>
  );
}
