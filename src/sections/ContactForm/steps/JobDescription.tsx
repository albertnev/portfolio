import React from "react";
import { type z } from "zod";

import { Form } from "@/components/Form";
import { Select } from "@/components/FormControls/Select";
import { Textarea } from "@/components/FormControls/Textarea";
import { useForm } from "@/hooks/useForm";
import { type FormStepProps } from "@/types/FormStepProps";
import { type jobDescriptionSchema } from "@/types/schemas/jobDescriptionSchema";
import { validateJobDescription } from "@/utils/formValidation";

const JobDescription: React.FC<FormStepProps> = ({
  id,
  isActive,
  onBack,
  onNext,
  onSubmit,
}) => {
  const hasSubmit = !!onSubmit;
  const { errors, isPending, validateAndSubmit } = useForm<
    z.infer<typeof jobDescriptionSchema>
  >(validateJobDescription, hasSubmit ? onSubmit : onNext, true);

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
        errors={errors.remote}
        label="Remote modality"
        name="remote"
        placeholder="Choose one"
        required
      >
        <option value="full-remote">Full remote</option>
        <option value="1-office">1 office day</option>
        <option value="2-office">2 office days</option>
        <option value="3-office">3 or more office days</option>
      </Select>
      <Textarea
        errors={errors.tasks}
        label="Which tasks am I expected to do on a daily basis?"
        minLength={30}
        name="tasks"
        placeholder="Everything."
        required
      />
      <Textarea
        errors={errors.reasons}
        label="Why do you think I'm a good candidate for offer?"
        minLength={9}
        name="reasons"
        placeholder="Because we love your portfolio."
        required
      />
      <Textarea
        label="What are some extra points you can offer?"
        name="extras"
        placeholder="Ticket restaurant allowance and gym membership."
      />
    </Form>
  );
};

export default JobDescription;
