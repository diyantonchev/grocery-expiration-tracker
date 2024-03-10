'use client';

import { useFormState } from 'react-dom';
import { useState } from 'react';

import { deleteGrocery } from '~/app/groceries/actions';
import { useToastMessage } from '~/app/groceries/_hooks/useToastMessage';
import { onDeleteSuccess } from '../actions';
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '~/components/ui/alert-dialog';
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
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  useToastMessage(formState, onDeleteSuccess);

  return (
    <AlertDialog open={isAlertOpen} onOpenChange={setIsAlertOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will permanently delete the selected grocery product and
            its related data. Once deleted, this information cannot be
            retrieved. Do you wish to proceed with the deletion?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <form>
            <Button
              formAction={() => {
                formAction(groceryId);
                setIsAlertOpen(false);
              }}
              variant="destructive"
            >
              Delete
            </Button>
          </form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
