import { currentUser } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import { AddButton } from './components/add-button';
import { AddModal } from './components/add-modal';
import { HoldingsTable } from './components/holdings-table';

export default async function Index() {
  const user = await currentUser();
  const addModalId = 'add-modal';

  if (!user) {
    redirect('/');
  }

  return (
    <div className="h-fit w-full overflow-visible">
      <AddButton modalId={addModalId} />
      <AddModal id={addModalId} userId={user.id} />
      <HoldingsTable userId={user.id} />
    </div>
  );
}
