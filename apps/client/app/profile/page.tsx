import { auth } from '@clerk/nextjs';

export default async function Index() {
  const { userId } = auth();

  return (
    <div className="h-fit w-full overflow-visible bg-red-50">Profile Page</div>
  );
}
