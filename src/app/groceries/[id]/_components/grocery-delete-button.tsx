'use client';

import { useFormState } from 'react-dom';

import { deleteGrocery } from '~/app/groceries/actions';
import { useToastMessage } from '~/app/groceries/_hooks/useToastMessage';
import { onDeleteSuccess } from '../actions';
import { Button } from '~/components/ui/button';

const initialFormState = {
  success: true,
  message: '',
  timestamp: Date.now(),
};

type GroceryDeleteButtonProps = {
  groceryId: number;
};

export function GroceryDeleteButton({ groceryId }: GroceryDeleteButtonProps) {
  const [formState, formAction] = useFormState(deleteGrocery, initialFormState);

  useToastMessage(formState, onDeleteSuccess);

  return (
    <Button formAction={formAction.bind(null, groceryId)} variant="destructive">
      Delete
    </Button>
  );
}
