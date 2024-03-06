import 'server-only';

import { cache } from 'react';
import { db } from '~/server/db';

export const getGroceries = cache(async (userId: string) => {
  return await db.query.groceries.findMany({
    where: (groceries, { eq }) => eq(groceries.userId, userId),
  });
});

export const getGrocery = cache(async (groceryId: number) => {
  return await db.query.groceries.findFirst({
    where: (grocery, { eq }) => eq(grocery.id, groceryId),
  });
});

export const getExpiredGroceries = cache(async (userId: string) => {
  return await db.query.groceries.findMany({
    where: (groceries, { eq, lt }) => {
      return (
        eq(groceries.userId, userId) && lt(groceries.expirationDate, new Date())
      );
    },
  });
});
