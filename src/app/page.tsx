"use server"
import Dashboard from '@/components/dashboard';
import Header from '@/components/Header';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
const dynamic = "force-dynamic"

const Home = async () => {

  const users = await db.user.findMany({
    where:{
      emailVerified: {
        not: null
      }
    }
  });
  
  const profiles = await db.profile.findMany({});

  revalidatePath('/');
  
  return (
    <div className='w-full h-dvh overflow-hidden sm:overflow-hidden scroll scroll-smooth'>
      <Header Name="College Connections"  ></Header>
      <div className='w-full h-full overflow-auto'>
      <Dashboard users={users} profiles={profiles} />
      </div>
    </div>
  )
};

export default Home
