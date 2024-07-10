type FormStepSubmit = (formData: Record<string, string>) => Promise<void>;

export interface FormStepProps {
  id?: string;
  isActive?: boolean;
  onNext?: FormStepSubmit;
  onPrev?: () => void;
  onSubmit?: FormStepSubmit;
}
