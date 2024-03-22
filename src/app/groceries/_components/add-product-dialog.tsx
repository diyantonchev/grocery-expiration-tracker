'use client';

import { useRef, useState, type ReactNode, type ElementRef } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Calendar } from '~/components/ui/calendar';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '~/components/ui/popover';
import { addGrocery } from '~/app/groceries/actions';
import { useToastMessage } from '~/app/groceries/_hooks/useToastMessage';
import { useFormReset } from '~/app/groceries/_hooks/useFormReset';
import {
  groceryFormSchema,
  type GroceryFormData,
} from '~/app/groceries/grocery-form-schema';
import { cn } from '~/lib/utils';

export const initialFormData = {
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
    formData.set('expirationDate', data.expirationDate.toISOString());

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
        <Form {...form}>
          <form
            // action={formAction}
            onSubmit={form.handleSubmit(onSubmit)}
            ref={formRef}
            className="space-y-4"
          >
            <FormField
              control={form.control}
              name="productName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="productName">Product Name</FormLabel>
                  <FormControl>
                    <Input
                      id="productName"
                      placeholder='E.g. "Bananas"'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="brand">Brand</FormLabel>
                  <FormControl>
                    <Input id="brand" placeholder='E.g. "Dole"' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expirationDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel htmlFor="expirationDate">
                    Expiration Date
                  </FormLabel>
                  <FormControl>
                    <Popover modal>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              'col font-normal',
                              !field.value && 'text-muted-foreground',
                            )}
                          >
                            {field.value ? (
                              format(field.value, 'dd MMMM yyyy')
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="quantity"
              render={() => (
                <FormItem>
                  <FormLabel htmlFor="quantity">Quantity</FormLabel>
                  <FormControl>
                    <Input
                      id="quantity"
                      type="number"
                      step="0.01"
                      placeholder="E.g. 0.5"
                      {...form.register('quantity', {
                        setValueAs: (value) => Number(value) ?? 0,
                        validate: (value) =>
                          /^\d*(\.\d+)?$/.test(value.toString()),
                      })}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="unit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="unit">Unit</FormLabel>
                  <FormControl>
                    <Input
                      id="unit"
                      placeholder='E.g. "kg" or "grams"'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="category">Category</FormLabel>
                  <FormControl>
                    <Input
                      id="category"
                      placeholder='E.g. "Fruits"'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <SubmitButton />
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="mb-2" aria-disabled={pending}>
      Add Product
    </Button>
  );
}
