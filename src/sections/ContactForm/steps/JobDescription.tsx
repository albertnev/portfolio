import React from "react";
import { type z } from "zod";

import { Form } from "@/components/Form";
import { Select } from "@/components/FormControls/Select";
import { Textarea } from "@/components/FormControls/Textarea";
import { RemoteValues } from "@/enums/RemoteValues";
import { useForm } from "@/hooks/useForm";
import { type FormStepProps } from "@/types/FormStepProps";
import { type jobDescriptionSchema } from "@/types/schemas/jobDescriptionSchema";
import { validateJobDescription } from "@/utils/formValidation";

const JobDescription: React.FC<FormStepProps> = ({
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
    z.infer<typeof jobDescriptionSchema>
  >(validateJobDescription, hasSubmit ? onSubmit : onNext, validateCaptcha);

  return (
    <Form
      id={id}
      isActive={isActive}
      isPending={isPending}
      legend="Job description"
      onBack={onBack}
      onNext={!hasSubmit ? validateAndSubmit : undefined}
      onSubmit={hasSubmit ? validateAndSubmit : undefined}
    >
      <Select
        defaultValue={initialFormData?.remote}
        errors={errors.remote}
        label="Remote modality"
        name="remote"
        placeholder="Choose one"
      >
        {Array.from(RemoteValues.entries()).map(([key, val]) => (
          <option key={key} value={key}>
            {val}
          </option>
        ))}
      </Select>
      <Textarea
        defaultValue={initialFormData?.tasks}
        errors={errors.tasks}
        label="Which tasks am I expected to do on a daily basis?"
        minLength={30}
        name="tasks"
        placeholder="Everything."
      />
      <Textarea
        defaultValue={initialFormData?.reasons}
        errors={errors.reasons}
        label="Why do you think I'm a good candidate for the offer?"
        minLength={9}
        name="reasons"
        placeholder="Because we love your portfolio."
      />
      <Textarea
        defaultValue={initialFormData?.extras}
        label="What are some extra points you can offer?"
        name="extras"
        placeholder="Ticket restaurant allowance and gym membership."
      />
    </Form>
  );
};

export default JobDescription;
