'use client';

import {
  useState,
  useEffect,
  useRef,
  type ReactNode,
  type ElementRef,
} from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import toast from 'react-hot-toast';

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
import { Input } from '~/components/ui/input';
import { Label } from '~/components/ui/label';
import { DatePicker } from '~/components/ui/date-picker';
import { addProduct } from '~/app/dashboard/actions';

type AddProductDialogProps = {
  trigger: ReactNode;
};

const initialFormState = {
  success: true,
  message: '',
};

export default function AddProductDialog({ trigger }: AddProductDialogProps) {
  const [formState, addProductAction] = useFormState(
    addProduct,
    initialFormState,
  );

  const [expirationDate, setExpirationDate] = useState<Date>();
  const formRef = useRef<ElementRef<'form'>>(null);

  useEffect(() => {
    if (formState.message === '') return;

    if (!formState.success) {
      toast.error(formState.message);
      return;
    }

    setExpirationDate(undefined);
    formRef.current?.reset();
    toast.success(formState.message);
  }, [formState]);

  const formAction = (formData: FormData) => {
    if (!expirationDate) {
      toast('Please select an expiration date');
      return;
    }

    formData.set('expirationDate', expirationDate.toISOString());
    addProductAction(formData);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Product</DialogTitle>
          <DialogDescription>
            Enter the details of the new product you wish to track. Make sure to
            include its expiration date.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} ref={formRef}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="productName" className="text-right">
                Product Name
              </Label>
              <Input
                id="productName"
                name="productName"
                placeholder='E.g. "Bananas"'
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="brand" className="text-right">
                Brand
              </Label>
              <Input
                id="brand"
                name="brand"
                placeholder='E.g. "Dole"'
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Expiration Date</Label>
              <DatePicker
                className="w-[285px] md:w-[342.5px]"
                date={expirationDate}
                onSelect={setExpirationDate}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantity
              </Label>
              <Input
                id="quantity"
                name="quantity"
                type="number"
                placeholder="1"
                className="col-span-3"
                required
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="unit" className="text-right">
                Unit
              </Label>
              <Input
                id="unit"
                name="unit"
                placeholder='E.g. "kg" or "grams"'
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Input
                id="category"
                name="category"
                placeholder='E.g. "Fruits"'
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <SubmitButton />
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending}>
      Add Product
    </Button>
  );
}
