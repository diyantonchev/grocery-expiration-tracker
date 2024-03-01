export type FormState = {
  success: boolean;
  message: string;
  timestamp: number;
};

export const initialFormState: FormState = {
  success: true,
  message: '',
  timestamp: Date.now(),
};
