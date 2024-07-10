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
  isActive,
  onNext,
  onPrev,
  onSubmit,
}) => {
  const hasSubmit = !!onSubmit;
  const { errors, isPending, validateAndSubmit } = useForm<
    z.infer<typeof positionInformationSchema>
  >(validatePositionInformation, hasSubmit ? onSubmit : onNext);

  return (
    <Form
      id={id}
      isActive={isActive}
      isPending={isPending}
      legend="Position information"
      onNext={!hasSubmit ? validateAndSubmit : undefined}
      onBack={onPrev}
      onSubmit={hasSubmit ? validateAndSubmit : undefined}
    >
      <Input
        errors={errors.job}
        label="Job title"
        name="job"
        placeholder="Frontend engineer"
        required
      />
      <Input
        errors={errors.seniority}
        label="Needed seniority"
        name="seniority"
        placeholder="Senior"
        required
      />
      <Input
        className="no-spinner"
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
