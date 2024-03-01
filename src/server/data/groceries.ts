import 'server-only';

import { cache } from 'react';
import { db } from '~/server/db';

export const getGroceries = cache(async (userId: string) => {
  return await db.query.groceries.findMany({
    where: (groceries, { eq }) => eq(groceries.userId, userId),
  });
});
