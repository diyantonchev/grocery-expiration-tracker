import { type getGroceries } from '~/server/data/groceries';

export type FormState = {
  success: boolean;
  message: string;
  timestamp: number;
};

export type Groceries = Awaited<ReturnType<typeof getGroceries>>;
export type Grocery = Groceries[number];
