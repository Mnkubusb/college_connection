"use server"
import Dashboard from '@/components/dashboard';
import Header from '@/components/Header';
import { db } from '@/lib/db';

const Home = async () => {

  const users = await db.user.findMany({
    where:{
      emailVerified: {
        not: null
      }
    }
  });
  
  const profiles = await db.profile.findMany({});
  
  return (
    <div className='w-full h-full overflow-auto scroll scroll-smooth'>
      <Header Name="College Connections"></Header>
      <div className='w-full h-full'>
      <Dashboard users={users} profiles={profiles} />
      </div>
    </div>
  )
};

export default Home
