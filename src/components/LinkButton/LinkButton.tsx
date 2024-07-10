"use client";

import Link, { type LinkProps } from "next/link";

import { type FCProps } from "@/types/FCProps";

export interface LinkButtonProps extends FCProps, LinkProps {
  icon?: React.ComponentType<{
    className?: string;
  }>;
}

const LinkButton: React.FC<LinkButtonProps> = ({
  children,
  className = "",
  href,
  icon,
  ...props
}) => {
  const IconComponent = icon;

  return (
    <Link className={`link-button ${className}`} href={href} {...props}>
      {IconComponent ? (
        <IconComponent className="left" data-testid="link-button-icon" />
      ) : null}
      <span>{children}</span>
    </Link>
  );
};

export default LinkButton;
