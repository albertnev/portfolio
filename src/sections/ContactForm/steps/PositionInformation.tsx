import React from "react";
import { type z } from "zod";

import { Form } from "@/components/Form";
import { Input } from "@/components/FormControls/Input";
import { useForm } from "@/hooks/useForm";
import { type FormStepProps } from "@/types/FormStepProps";
import { type positionInformationSchema } from "@/types/schemas/positionInformationSchema";
import { validatePositionInformation } from "@/utils/formValidation";

const PositionInformation: React.FC<FormStepProps> = ({
  id,
  initialFormData,
  isActive,
  onBack,
  onNext,
  onSubmit,
  validateCaptcha,
}) => {
  const hasSubmit = !!onSubmit;
  const { errors, isPending, validateAndSubmit } = useForm<
    z.infer<typeof positionInformationSchema>
  >(
    validatePositionInformation,
    hasSubmit ? onSubmit : onNext,
    validateCaptcha,
  );

  return (
    <Form
      id={id}
      isActive={isActive}
      isPending={isPending}
      legend="Position information"
      onBack={onBack}
      onNext={!hasSubmit ? validateAndSubmit : undefined}
      onSubmit={hasSubmit ? validateAndSubmit : undefined}
    >
      <Input
        defaultValue={initialFormData?.job}
        errors={errors.job}
        label="Job title"
        name="job"
        placeholder="Frontend engineer"
        required
      />
      <Input
        defaultValue={initialFormData?.seniority}
        errors={errors.seniority}
        label="Needed seniority"
        name="seniority"
        placeholder="Senior"
        required
      />
      <Input
        className="no-spinner"
        defaultValue={initialFormData?.salary}
        errors={errors.salary}
        label="Max. yearly salary (€)"
        min={55000}
        name="salary"
        pattern="[0-9]*"
        placeholder="60000"
        required
        type="number"
      />
      <Input
        className="no-spinner"
        defaultValue={initialFormData?.vacationDays}
        errors={errors.vacationDays}
        label="Yearly vacation days"
        min={24}
        name="vacationDays"
        pattern="[0-9]*"
        placeholder="29"
        type="number"
      />
    </Form>
  );
};

export default PositionInformation;
