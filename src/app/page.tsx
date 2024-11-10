"use server"
import Dashboard from '@/components/dashboard'
import { db } from '@/lib/db';


const Home = async () => {
  const users = await db.user.findMany({
    where: {
      emailVerified: { not: null }
    }
  });

  return (
    <div>
      <Dashboard users={users} />
    </div>
  )
}

export default Home
