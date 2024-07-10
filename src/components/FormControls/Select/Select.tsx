import { clsx } from "clsx";
import React, { type HTMLProps } from "react";
import { FaExclamationCircle } from "react-icons/fa";

import { type FCProps } from "@/types/FCProps";

export interface SelectProps extends FCProps, HTMLProps<HTMLSelectElement> {
  errors?: string[];
  label?: string;
  placeholder?: string;
}

const Select: React.FC<SelectProps> = ({
  children = null,
  className = "",
  errors,
  label,
  placeholder = "",
  ...rest
}) => {
  return (
    <label className={className}>
      {label ? (
        <span className="block uppercase tracking-wide text-slate-300 text-xs font-bold mb-2">
          {label}
        </span>
      ) : null}
      <select
        className={clsx(
          "appearance-none block w-full bg-transparent text-slate-300 border rounded py-3 px-4 mb-1 leading-tight focus:backdrop-blur-sm focus:outline-none focus:bg-white/5",
          { "border-red-100": !!errors },
        )}
        defaultValue=""
        type="text" // default type to text
        {...rest}
      >
        {placeholder ? (
          <option disabled hidden value="">
            {placeholder}
          </option>
        ) : null}
        {children}
      </select>
      {errors ? (
        <span className="text-red-300 text-sm flex items-center">
          <FaExclamationCircle className="mr-2" /> {errors[0]}
        </span>
      ) : null}
    </label>
  );
};

export default Select;
