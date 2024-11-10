import { getAllUsers } from '@/data/user';

export async function GET(request: Request) {
  try {
    console.log('Fetching users...');
    const users = await getAllUsers();
    console.log('Users:', users);
    return new Response(JSON.stringify(users), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error fetching users:', error);
    return new Response(JSON.stringify({ error: 'Error fetching users' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}