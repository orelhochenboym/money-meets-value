import { currentUser, SignOutButton } from '@clerk/nextjs';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

type Props = { modalId: string };

export const User: React.FC<Props> = async ({ modalId }) => {
  const user = await currentUser();

  return (
    <SignOutButton>
      <Avatar className="hover:cursor-pointer">
        <AvatarImage src={user?.imageUrl} />
        <AvatarFallback>{`${user?.firstName?.at(0)}${user?.lastName?.at(
          0,
        )}`}</AvatarFallback>
      </Avatar>
    </SignOutButton>
  );
};
