import { auth } from '@clerk/nextjs';
import { Toast } from '../components/toast/toast';

export default async function Index() {
  const { userId } = auth();

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
