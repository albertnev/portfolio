"use client";

import { type ComponentProps } from "react";

import { type FCProps } from "@/types/FCProps";

export interface ButtonProps extends FCProps, ComponentProps<"button"> {
  icon?: React.ComponentType<{
    className?: string;
  }>;
  iconPosition?: "left" | "right";
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  icon,
  iconPosition = "left",
  onClick,
  ...rest
}) => {
  const IconComponent = icon;

  return (
    <button
      className={`link-button disabled:opacity-40 ${className}`}
      type="button"
      onClick={onClick}
      {...rest}
    >
      {IconComponent && iconPosition === "left" ? (
        <IconComponent className="left" data-testid="button-icon" />
      ) : null}
      <span>{children}</span>
      {IconComponent && iconPosition === "right" ? (
        <IconComponent className="right" data-testid="button-icon" />
      ) : null}
    </button>
  );
};

export default Button;
