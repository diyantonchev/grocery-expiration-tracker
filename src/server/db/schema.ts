import { sql } from 'drizzle-orm';
import {
  bigint,
  float,
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
    userId: varchar('user_id', { length: 36 }).notNull(),
    productName: varchar('product_name', { length: 150 }).notNull(),
    expirationDate: date('expiration_date').notNull(),
    brand: varchar('brand', { length: 150 }),
    quantity: float('quantity')
      .default(sql`1`)
      .notNull(),
    category: varchar('category', { length: 150 }),
    unit: varchar('unit', { length: 50 }),
  },
  (groceries) => ({
    userIndex: index('user_idx').on(groceries.userId),
    productNameIndex: index('product_name_idx').on(groceries.productName),
    expirationDateIndex: index('expiration_date_idx').on(
      groceries.expirationDate,
    ),
  }),
);
