'use server';

import { auth } from '@clerk/nextjs/server';
import { ZodError } from 'zod';

import { db } from '~/server/db';
import { groceries } from '~/server/db/schema';
import { revalidatePath } from 'next/cache';
import { groceryFormSchema } from '~/app/groceries/grocery-form-schema';
import { type FormState } from '~/app/groceries/common-types';

export async function addGrocery(formState: FormState, formData: FormData) {
  const { userId } = auth();
  if (!userId) {
    return {
      success: false,
      message: 'You must be signed in to perform this action',
      timestamp: Date.now(),
    };
  }

  const rawFormData = Object.fromEntries(formData);

  try {
    const validatedData = groceryFormSchema.parse({
      ...rawFormData,
      expirationDate: new Date(formData.get('expirationDate') as string),
    });

    await db.insert(groceries).values({ userId, ...validatedData });
  } catch (error) {
    return errorToFormState(error);
  }

  revalidatePath('/groceries');

  return {
    success: true,
    message: 'Successfully added a new product',
    timestamp: Date.now(),
  };
}

function errorToFormState(error: unknown) {
  if (error instanceof ZodError) {
    return {
      success: false,
      message: error.errors.map((e) => e.message).join(', '),
      timestamp: Date.now(),
    };
  }

  if (error instanceof Error) {
    return {
      success: false,
      message: error.message,
      timestamp: Date.now(),
    };
  }

  return {
    success: false,
    message: 'An unknown error occurred',
    timestamp: Date.now(),
  };
}
