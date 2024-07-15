"use client";

import React from "react";
import { type z } from "zod";

import { Form } from "@/components/Form";
import { Input } from "@/components/FormControls/Input";
import { useForm } from "@/hooks/useForm";
import { type FormStepProps } from "@/types/FormStepProps";
import { type companyInformationSchema } from "@/types/schemas/companyInformationSchema";
import { validateCompanyInformation } from "@/utils/formValidation";

const CompanyInformation: React.FC<FormStepProps> = ({
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
    z.infer<typeof companyInformationSchema>
  >(validateCompanyInformation, hasSubmit ? onSubmit : onNext, validateCaptcha);

  return (
    <Form
      id={id}
      isActive={isActive}
      isPending={isPending}
      legend="Company information"
      onBack={onBack}
      onNext={!hasSubmit ? validateAndSubmit : undefined}
      onSubmit={hasSubmit ? validateAndSubmit : undefined}
    >
      <Input
        defaultValue={initialFormData?.company}
        errors={errors.company}
        label="Which company do you represent?"
        name="company"
        placeholder="ACME S.L."
      />
      <Input
        defaultValue={initialFormData?.name}
        errors={errors.name}
        label="What is your full name?"
        name="name"
        placeholder="Jane Doe"
      />
      <Input
        defaultValue={initialFormData?.email}
        errors={errors.email}
        label="What is your contact e-mail?"
        name="email"
        placeholder="jane@companyname.com"
        type="email"
      />
    </Form>
  );
};

export default CompanyInformation;
