import 'server-only';

import { cache } from 'react';
import { auth } from '@clerk/nextjs/server';
import { db } from '../db';

export const getGroceries = cache(async () => {
  const { userId } = auth();

  if (!userId) {
    return [];
  }

  return await db.query.groceries.findMany({
    where: (groceries, { eq }) => eq(groceries.userId, userId),
  });
});
