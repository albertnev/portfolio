"use client";

import { FCProps } from "@/types/FCProps";

interface ButtonProps extends FCProps {
  icon?: React.ComponentType<{
    className?: string;
  }>;
  onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({
  className = "",
  children,
  icon,
  onClick,
}) => {
  const IconComponent = icon;

  return (
    <button
      className={`flex items-center justify-center opacity-85 p-2 px-6 rounded font-medium bg-slate-300 text-slate-700 hover:opacity-100 ${className}`}
      onClick={onClick}
    >
      {IconComponent && <IconComponent className="mr-2" />}
      <span>{children}</span>
    </button>
  );
};

export default Button;
