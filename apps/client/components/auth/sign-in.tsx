import { useSignUp } from '@clerk/nextjs';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { Input } from '../ui/input';
import { CancelButton } from './cancel-button';

const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type SignInType = z.infer<typeof SignInSchema>;

type Props = { modalId: string };

export const SignIn: React.FC<Props> = ({ modalId }) => {
  const { isLoaded, signUp, setActive } = useSignUp();

  const form = useForm<SignInType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: { email: '' },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(
          ({ email, password }) => {
            console.log(`Success with ${email} ${password}`);
          },
          ({ email, password }) => {
            console.log(`Error with ${email} ${password}`);
          },
        )}
        className="grid w-full grid-cols-2 gap-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="col-span-2 flex flex-col items-start">
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder="Email Address" {...field} type="email" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="col-span-2 flex flex-col items-start">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password" {...field} type="password" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <CancelButton modalId={modalId} />
        <Button type="submit" variant="default">
          Sign In
        </Button>
      </form>
    </Form>
  );
};
