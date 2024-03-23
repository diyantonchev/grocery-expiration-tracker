import {
  real,
  index,
  pgTableCreator,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const createTable = pgTableCreator(
  (name) => `grocery-expiration-tracker_${name}`,
);

export const groceries = createTable(
  'groceries',
  {
    id: serial('id').primaryKey(),
    userId: varchar('user_id', { length: 36 }).notNull(),
    productName: varchar('product_name', { length: 150 }).notNull(),
    expirationDate: timestamp('expirationDate').notNull(),
    brand: varchar('brand', { length: 150 }),
    quantity: real('quantity').default(1.0).notNull(),
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
