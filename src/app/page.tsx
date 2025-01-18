"use server"
import Dashboard from '@/components/dashboard';
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
    <div>
      <Dashboard users={users} profiles={profiles} />
    </div>
  )
};

export default Home
