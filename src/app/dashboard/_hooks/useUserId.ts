import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs/server';

export const useUserId = () => {
  const { userId } = auth();

  if (!userId) {
    redirect('/');
  }

  return userId;
};
