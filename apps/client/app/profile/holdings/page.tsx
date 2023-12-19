import { currentUser } from '@clerk/nextjs';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { db } from '../../../db/db';
import { users } from '../../../db/schema/users';
import { AddButton } from './components/add-button';
import { AddModal } from './components/add-modal';
import { HoldingsTable } from './components/holdings-table';

export default async function Index() {
  const user = await currentUser();

  if (!user) {
    redirect('/');
  }

  const userId = (
    await db.select().from(users).where(eq(users.clerkId, user.id))
  ).find((x) => x.clerkId === user.id)?.id;

  if (!userId) {
    redirect('/');
  }

  const addModalId = 'add-modal';

  if (!user) {
    redirect('/');
  }

  return (
    <div className="h-fit w-full overflow-visible">
      <AddButton modalId={addModalId} />
      <AddModal id={addModalId} userId={userId} />
      <HoldingsTable userId={user.id} />
    </div>
  );
}
