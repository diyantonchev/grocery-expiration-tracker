import { z } from 'zod';

export const groceryProductSchema = z.object({
  productName: z
    .string({ required_error: 'Please enter a product name' })
    .trim()
    .min(1, { message: 'Please enter a product name' })
    .max(256, 'The product name is too long'),
  expirationDate: z
    .date({ required_error: 'Please select expiration date' })
    .min(new Date(), 'The expiration date must be in the future'),
  brand: z.string().max(256, 'The brand name is too long').optional(),
  quantity: z.union([
    z
      .string({ required_error: 'Please enter a quantity' })
      .trim()
      .transform((value) => Number(value))
      .refine((value) => value >= 1, {
        message: 'The quantity must be at least 1',
      }),
    z.number({ required_error: 'Please enter a product name' }),
  ]),
  category: z.string().trim().max(256, 'The category is too long').optional(),
  unit: z.string().trim().max(50, 'The unit is too long').optional(),
});
