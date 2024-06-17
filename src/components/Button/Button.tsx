"use client";

import { type FCProps } from "@/types/FCProps";

interface ButtonProps extends FCProps {
  icon?: React.ComponentType<{
    className?: string;
  }>;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  icon,
  onClick,
}) => {
  const IconComponent = icon;

  return (
    <button
      className={`flex items-center justify-center opacity-85 p-2 px-6 rounded font-medium bg-slate-300 text-slate-700 hover:opacity-100 ${className}`}
      type="button"
      onClick={onClick}
    >
      {IconComponent ? <IconComponent className="mr-2" /> : null}
      <span>{children}</span>
    </button>
  );
};

export default Button;
