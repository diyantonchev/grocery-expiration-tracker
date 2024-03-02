import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

import { type FormState } from '~/app/dashboard/form-state';

const useToastMessage = (formState: FormState) => {
  const prevTimestamp = useRef(formState.timestamp);

  const showToast =
    formState.message && formState.timestamp !== prevTimestamp.current;

  useEffect(
    function toastMessage() {
      if (!showToast) return;

      const toastFn = formState.success ? toast.success : toast.error;

      toastFn(formState.message);
      prevTimestamp.current = formState.timestamp;
    },
    [formState.success, formState.message, formState.timestamp, showToast],
  );
};

export { useToastMessage };
