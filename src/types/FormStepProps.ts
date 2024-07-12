import { type ContactFormDto } from "./ContactFormDto";

type FormStepSubmit = (formData: Record<string, string>) => Promise<void>;

export interface FormStepProps {
  id: string;
  initialFormData?: Partial<ContactFormDto>;
  isActive?: boolean;
  onBack?: () => void;
  onNext?: FormStepSubmit;
  onSubmit?: FormStepSubmit;
  validateCaptcha?: boolean;
}
