import db from '@/lib/db';
import getSession from '@/lib/session';
import { notFound, redirect } from 'next/navigation';

async function getUser() {
  const session = await getSession();
  if (session.id) {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
    });
    if (user) {
      return user;
    }
  }
  notFound();
}

const logOut = async () => {
  'use server';
  const session = await getSession();
  await session.destroy();
  redirect('/');
};

export default async function Home() {
  const user = await getUser();
  return (
    <div>
      <h1>hello!{user?.username}</h1>;
      <form action={logOut}>
        <button>Log out</button>
      </form>
    </div>
  );
}
