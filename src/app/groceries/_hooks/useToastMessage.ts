import { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

import { type FormState } from '~/app/groceries/common-types';

export function useToastMessage(
  formState: FormState,
  successCb?: () => unknown,
) {
  const prevTimestamp = useRef(formState.timestamp);

  const showToast =
    formState.message && formState.timestamp !== prevTimestamp.current;

  useEffect(
    function toastMessage() {
      if (!showToast) return;

      if (formState.success) {
        toast.success(formState.message);
        successCb?.();
      } else {
        toast.error(formState.message);
      }

      prevTimestamp.current = formState.timestamp;
    },
    [
      formState.success,
      formState.message,
      formState.timestamp,
      showToast,
      successCb,
    ],
  );
}
