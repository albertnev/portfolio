"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { FaExclamationCircle } from "react-icons/fa";
import { TbMailHeart } from "react-icons/tb";

import {
  CompanyInformation,
  JobDescription,
  PositionInformation,
} from "./steps";

import { validateAndSendContactForm } from "@/utils/formValidation";

const steps = [
  {
    component: CompanyInformation,
    key: "company-information",
  },
  {
    component: PositionInformation,
    key: "position-information",
  },
  {
    component: JobDescription,
    key: "job-description",
  },
];

const ContactForm = () => {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [formError, setFormError] = useState<string | undefined>();
  const [isFormSent, setIsFormSent] = useState(false);

  const nextStep = async (data: Record<string, string>) => {
    setFormData((current) => {
      return { ...current, ...data };
    });

    setActiveStep((current) => {
      if (current + 1 >= steps.length) {
        return steps.length - 1;
      }

      return current + 1;
    });
  };

  const prevStep = () => {
    setActiveStep((current) => {
      if (current - 1 <= 0) {
        return 0;
      }

      return current - 1;
    });
  };

  const submitForm = useCallback(
    async (data: Record<string, string>) => {
      // Send also last step data included to avoid syncing problems
      setFormError(undefined);
      const resp = await validateAndSendContactForm({ ...formData, ...data });

      if (resp.hasErrors) {
        // There are errors, display error message
        setFormError(resp.errorMessage);
        return;
      }

      // Everything good, data sent via e-mail: redirect to main page
      setIsFormSent(true);
      setTimeout(() => {
        router.push("/");
      }, 4000);
    },
    [formData, router],
  );

  const copyFormData = useCallback(async () => {
    await navigator.clipboard.writeText(JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    const step = steps[activeStep];
    if (step) {
      const element = document.getElementById(step.key);
      element?.scrollIntoView({ behavior: "smooth" });
    }
  }, [activeStep]);

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_SITEKEY!}
    >
      {!isFormSent ? (
        <section className="w-full">
          {formError ? (
            <div className="bg-red-800/20 border-red-800 text-red-100 backdrop-blur-sm rounded-sm  border p-4 text-sm flex items-center mb-6">
              <FaExclamationCircle className="mr-4 shrink-0" />
              <p>
                <span>{formError}</span>{" "}
                <span>
                  If you prefer, you can contact me using Linkedin network. You
                  can{" "}
                  <button
                    className="font-bold underline underline-offset-2 hover:opacity-80"
                    type="button"
                    onClick={() => void copyFormData()}
                  >
                    copy your current data
                  </button>{" "}
                  to save some work.
                </span>
              </p>
            </div>
          ) : null}
          {steps.map((step, i) => {
            const StepComponent = step.component;
            return (
              <StepComponent
                key={step.key}
                id={step.key}
                isActive={activeStep === i}
                onNext={i < steps.length - 1 ? nextStep : undefined}
                onPrev={i !== 0 ? prevStep : undefined}
                onSubmit={i === steps.length - 1 ? submitForm : undefined}
              />
            );
          })}
        </section>
      ) : (
        <div className="h-full w-full flex flex-col items-center justify-center">
          <div className="relative overflow-hidden animate-bounce rounded-full h-32 w-32 text-6xl flex items-center justify-center p-4 bg-cyan-500/20 border-4 border-cyan-100 text-cyan-100 shadow-inner mb-10 backdrop-blur-sm">
            <div className="absolute z-10 bg-white/80 opacity-5 left-1/2 h-full w-2/3 -skew-x-12 border-2 border-l-0 border-white" />
            <TbMailHeart />
          </div>
          <span className="text-2xl font-bold">
            Thank you for contacting me!
          </span>
          <span>You are now being redirected to the main portfolio.</span>
        </div>
      )}
    </GoogleReCaptchaProvider>
  );
};

export default ContactForm;
