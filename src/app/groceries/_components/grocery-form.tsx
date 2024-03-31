'use client';

import { forwardRef, type ReactNode } from 'react';
import { type UseFormReturn } from 'react-hook-form';
import { format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';

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
import { cn } from '~/lib/utils';
import { type GroceryFormData } from '~/app/groceries/grocery-form-schema';

type GroceryFormProps = {
  form: UseFormReturn<GroceryFormData>;
  onSubmit: (data: GroceryFormData) => void;
  Footer: ReactNode;
};

const GroceryForm = forwardRef<HTMLFormElement, GroceryFormProps>(
  function GroceryForm({ form, onSubmit, Footer }: GroceryFormProps, ref) {
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          ref={ref}
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
                <FormLabel htmlFor="expirationDateTrigger">
                  Expiration Date
                </FormLabel>
                <FormControl>
                  <Popover modal>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          id="expirationDateTrigger"
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
                  <Input id="category" placeholder='E.g. "Fruits"' {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {Footer && Footer}
        </form>
      </Form>
    );
  },
);

export default GroceryForm;
