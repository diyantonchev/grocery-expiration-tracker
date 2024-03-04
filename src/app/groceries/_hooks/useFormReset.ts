import { useEffect, useRef } from 'react';
import { type FormState } from '~/app/groceries/common-types';

export function useFormReset(formState: FormState, resetFn: () => void) {
  const prevTimestamp = useRef(formState.timestamp);

  useEffect(
    function resetForm() {
      if (formState.success && formState.timestamp !== prevTimestamp.current) {
        resetFn();
        prevTimestamp.current = formState.timestamp;
      }
    },
    [formState.success, formState.timestamp, resetFn],
  );
}
