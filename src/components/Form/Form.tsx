import { clsx } from "clsx";
import React from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";

import { Button } from "../Button";

import { type FCProps } from "@/types/FCProps";

export interface FormProps extends FCProps {
  id: string;
  isActive?: boolean;
  isPending?: boolean;
  legend?: string;
  onBack?: () => void;
  onNext?: (formData: FormData) => Promise<void>;
  onSubmit?: (formData: FormData) => Promise<void>;
}

const Form: React.FC<FormProps> = ({
  children,
  className = "",
  id,
  isActive = true,
  isPending = false,
  legend = "",
  onBack,
  onNext,
  onSubmit,
}) => {
  return (
    <form
      className={clsx(
        "flex flex-col space-y-6 transition-opacity ease-in overflow-hidden",
        className,
        {
          "duration-300": !isPending,
          "invisible h-0 opacity-0 ": !isActive,
          "opacity-80 pointer-events-none animate-pulse duration-2000":
            isPending,
          "visible h-auto opacity-100": isActive,
        },
      )}
      id={id}
      name={id}
      onSubmit={(ev) => {
        ev.preventDefault();
        const formData = new FormData(ev.target as HTMLFormElement);
        const submitAction = onSubmit ?? onNext;
        void submitAction?.(formData);
      }}
    >
      {legend ? <h2 className="text-3xl mb-2">{legend}</h2> : null}
      {children}
      <div className="flex justify-between">
        {onBack ? (
          <Button icon={FaArrowLeft} onClick={onBack}>
            Back
          </Button>
        ) : (
          <div />
        )}
        {onNext ? (
          <Button
            className="bg-cyan-200"
            disabled={isPending}
            icon={FaArrowRight}
            iconPosition="right"
            type="submit"
          >
            Next
          </Button>
        ) : null}
        {onSubmit ? (
          <Button className="bg-emerald-300" disabled={isPending} type="submit">
            Submit
          </Button>
        ) : null}
      </div>
    </form>
  );
};

export default Form;
