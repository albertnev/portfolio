import { clsx } from "clsx";
import React, { type HTMLProps } from "react";
import { FaExclamationCircle } from "react-icons/fa";

import { type FCProps } from "@/types/FCProps";

export interface InputProps extends FCProps, HTMLProps<HTMLInputElement> {
  errors?: string[];
  label?: string;
}

const Input: React.FC<InputProps> = ({
  className = "",
  errors,
  label,
  ...rest
}) => {
  return (
    <label className={className}>
      {label ? (
        <span className="block uppercase tracking-wide text-slate-300 text-xs font-bold mb-2">
          {label}
        </span>
      ) : null}
      <input
        className={clsx(
          "appearance-none block w-full bg-transparent text-slate-300 border rounded py-3 px-4 mb-1 leading-tight focus:backdrop-blur-sm focus:outline-none focus:bg-white/5",
          { "border-red-100": !!errors },
        )}
        type="text" // default type to text
        {...rest}
      />
      {errors ? (
        <span className="text-red-300 text-sm flex items-center">
          <FaExclamationCircle className="mr-2" /> {errors[0]}
        </span>
      ) : null}
    </label>
  );
};

export default Input;
