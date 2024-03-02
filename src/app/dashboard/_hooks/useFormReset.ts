import { useEffect, useRef } from 'react';
import { type FormState } from '~/app/dashboard/form-state';

const useFormReset = (formState: FormState, resetFn: () => void) => {
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
};

export { useFormReset };
