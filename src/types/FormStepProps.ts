type FormStepSubmit = (formData: Record<string, string>) => Promise<void>;

export interface FormStepProps {
  id: string;
  isActive?: boolean;
  onBack?: () => void;
  onNext?: FormStepSubmit;
  onSubmit?: FormStepSubmit;
}
