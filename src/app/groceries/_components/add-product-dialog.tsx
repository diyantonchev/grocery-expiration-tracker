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
import { addGrocery } from '~/app/groceries/actions';
import { useToastMessage } from '~/app/groceries/_hooks/useToastMessage';
import { useFormReset } from '~/app/groceries/_hooks/useFormReset';
import GroceryForm from './grocery-form';
import FormSubmitButton from './form-submit-button';
import {
  groceryFormSchema,
  type GroceryFormData,
} from '~/app/groceries/grocery-form-schema';

const initialFormData = {
  productName: '',
  expirationDate: undefined,
  brand: '',
  quantity: 1,
  category: '',
  unit: '',
};

const initialFormState = {
  success: true,
  message: '',
  timestamp: Date.now(),
};

type AddProductDialogProps = {
  trigger: ReactNode;
};

export default function AddProductDialog({ trigger }: AddProductDialogProps) {
  const [isOpen, setIsOpen] = useState(false);

  const [formState, formAction] = useFormState(addGrocery, initialFormState);

  const form = useForm<GroceryFormData>({
    resolver: zodResolver(groceryFormSchema),
    defaultValues: initialFormData,
  });

  const formRef = useRef<ElementRef<'form'>>(null);

  useToastMessage(formState);
  useFormReset(formState, () => {
    form.reset();
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
          <DialogTitle>Add Product</DialogTitle>
          <DialogDescription>
            Enter the details of the new product you wish to track. Make sure to
            include its expiration date.
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
              <FormSubmitButton>Add Product</FormSubmitButton>
            </DialogFooter>
          }
        />
      </DialogContent>
    </Dialog>
  );
}
