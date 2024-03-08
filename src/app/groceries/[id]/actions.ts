'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function onDeleteSuccess() {
  revalidatePath('/groceries');
  redirect('/groceries');
}
