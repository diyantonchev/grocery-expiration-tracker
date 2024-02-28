'use server';

import { auth } from '@clerk/nextjs/server';
import { db } from '~/server/db';
import { groceries } from '~/server/db/schema';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const groceryProductSchema = z.object({
  userId: z.string().max(36, 'The user ID is too long'),
  productName: z.string().min(1).max(256, 'The product name is too long'),
  expirationDate: z.string().datetime(),
  brand: z.string().max(256, 'The brand name is too long').optional(),
  quantity: z.number().int().min(1, 'The quantity must be at least 1'),
  category: z.string().max(256, 'The category is too long').optional(),
  unit: z.string().max(50, 'The unit is too long').optional(),
});

export async function addProduct(
  prevState: {
    message: string;
    success: boolean;
  },
  formData: FormData,
) {
  const { userId } = auth();
  if (!userId) {
    throw new Error('You must be signed in to perform this action');
  }

  const rawFormData = {
    userId,
    productName: formData.get('productName'),
    expirationDate: formData.get('expirationDate'),
    brand: formData.get('brand'),
    quantity: formData.get('quantity'),
    category: formData.get('category'),
    unit: formData.get('unit'),
  };

  const validationResult = groceryProductSchema.safeParse(rawFormData);

  if (!validationResult.success) {
    return {
      success: false,
      message: 'Validation Error',
    };
  }

  await db.insert(groceries).values({
    ...validationResult.data,
    expirationDate: new Date(validationResult.data.expirationDate),
  });

  revalidatePath('/dashboard');
  return { success: true, message: 'Successfully added a new product' };
}
