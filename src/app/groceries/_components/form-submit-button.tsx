'use client';

import { type ReactNode } from 'react';
import { useFormStatus } from 'react-dom';

import { Button } from '~/components/ui/button';

export default function FormSubmitButton({
  children,
}: {
  children: ReactNode;
}) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="mb-2" aria-disabled={pending}>
      {children}
    </Button>
  );
}
