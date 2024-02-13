import { sql } from 'drizzle-orm';
import {
  bigint,
  int,
  date,
  index,
  mysqlTableCreator,
  varchar,
} from 'drizzle-orm/mysql-core';

export const createTable = mysqlTableCreator(
  (name) => `grocery-expiration-tracker_${name}`,
);

export const groceries = createTable(
  'groceries',
  {
    id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
    userId: bigint('user_id', { mode: 'number' }).notNull(),
    productName: varchar('product_name', { length: 256 }).notNull(),
    expirationDate: date('expiration_date').notNull(),
    manufacturer: varchar('manufacturer', { length: 256 }),
    quantity: int('quantity')
      .default(sql`1`)
      .notNull(),
    category: varchar('category', { length: 256 }),
  },
  (groceries) => ({
    userIndex: index('user_idx').on(groceries.userId),
    productNameIndex: index('product_name_idx').on(groceries.productName),
    expirationDateIndex: index('expiration_date_idx').on(
      groceries.expirationDate,
    ),
  }),
);
