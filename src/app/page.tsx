"use server"
import { getUsers } from '@/actions/get-user';
import Dashboard from '@/components/dashboard';
import Header from '@/components/Header';
import { SearchInput } from '@/components/search-input';
import { currentUser } from '@/lib/auth';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
const dynamic = "force-dynamic"


const Home = async () => {

  const LoginedUser = await currentUser();

  const users = await getUsers({});
  if(!users) return null

  const profiles = await db.profile.findMany({});

  revalidatePath('/');

  return (
    <div className='w-full h-dvh overflow-hidden'>
      <Header Name="College Connections"  ></Header>
      <div className='w-full h-full'>
        <Dashboard users={users} profiles={profiles} loginedUser={LoginedUser} />
      </div>
    </div>
  )
};

export default Home
