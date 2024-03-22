'use client';

import { useRef, useState, type ReactNode, type ElementRef } from 'react';
import { useFormState } from 'react-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '~/components/ui/dialog';
import { Button } from '~/components/ui/button';
import { updateGrocery } from '~/app/groceries/actions';
import { useToastMessage } from '~/app/groceries/_hooks/useToastMessage';
import { useFormReset } from '~/app/groceries/_hooks/useFormReset';
import GroceryForm from './grocery-form';
import FormSubmitButton from './form-submit-button';
import {
  groceryFormSchema,
  type GroceryFormData,
} from '~/app/groceries/grocery-form-schema';
import { type Grocery } from '~/app/groceries/common-types';

const initialFormState = {
  success: true,
  message: '',
  timestamp: Date.now(),
};

type EditProductDialogProps = {
  trigger: ReactNode;
  grocery: Grocery;
};

export default function EditProductDialog({
  trigger,
  grocery,
}: EditProductDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [formState, formAction] = useFormState(
    updateGrocery.bind(null, grocery.id),
    initialFormState,
  );

  const form = useForm<GroceryFormData>({
    resolver: zodResolver(groceryFormSchema),
    defaultValues: {
      productName: grocery.productName,
      expirationDate: grocery.expirationDate,
      brand: grocery.brand ?? '',
      quantity: grocery.quantity,
      category: grocery.category ?? '',
      unit: grocery.unit ?? '',
    },
  });

  const formRef = useRef<ElementRef<'form'>>(null);

  useToastMessage(formState);
  useFormReset(formState, () => {
    setIsOpen(false);
  });

  const onSubmit = (data: GroceryFormData) => {
    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    formData.set('expirationDate', format(data.expirationDate, 'yyyy-MM-dd'));

    formAction(formData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Product</DialogTitle>
          <DialogDescription>
            Update the details of the product. Make sure to include its
            expiration date.
          </DialogDescription>
        </DialogHeader>
        <GroceryForm
          form={form}
          onSubmit={onSubmit}
          ref={formRef}
          Footer={
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <FormSubmitButton>Update Product</FormSubmitButton>
            </DialogFooter>
          }
        />
      </DialogContent>
    </Dialog>
  );
}
