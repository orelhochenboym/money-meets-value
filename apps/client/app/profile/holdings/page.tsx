import { currentUser } from '@clerk/nextjs';

export default async function Index() {
  const user = await currentUser();

  return (
    <div className="h-fit w-full overflow-visible bg-red-50">
      <div>{user?.id}</div>
    </div>
  );
}
