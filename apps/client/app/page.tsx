import { auth } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import { Toast } from '../components/toast/toast';
import { db } from '../db/db';
import { users } from '../db/schema/users';

export default async function Index() {
  const { userId } = auth();

  if (userId) {
    const user = (
      await db.select().from(users).where(eq(users.clerkId, userId))
    ).find((user) => user.clerkId === userId);

    if (!user) {
      await db.insert(users).values({ clerkId: userId });
    }
  }

  return (
    <div className="h-full w-full">
      <div>Home Page</div>
      <Toast
        condition={userId}
        content="Can't navigate when not signed in"
        options={{ toastId: 'sign-in', type: 'warning' }}
      />
    </div>
  );
}
