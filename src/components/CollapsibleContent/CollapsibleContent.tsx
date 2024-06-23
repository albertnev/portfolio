"use client";

import { clsx } from "clsx";
import { useState } from "react";
import { FaCaretDown, FaCaretRight } from "react-icons/fa6";

import { type FCProps } from "@/types/FCProps";

export interface CollapsibleContentProps extends FCProps {
  shownByDefault?: boolean;
  title?: string;
}

const CollapsibleContent: React.FC<CollapsibleContentProps> = ({
  children,
  className,
  shownByDefault = false,
  title = "More about it",
}) => {
  const [isShown, setIsShown] = useState(shownByDefault);

  return (
    <div className={className}>
      <button
        className={clsx(
          "flex items-center text-cyan-200 text-sm underline underline-offset-4",
          { "mb-4": isShown },
        )}
        data-testid="collapsible-content-toggle"
        type="button"
        onClick={() => {
          setIsShown((current) => !current);
        }}
      >
        {isShown ? (
          <FaCaretDown className="mr-2" />
        ) : (
          <FaCaretRight className="mr-2" />
        )}{" "}
        {title}
      </button>
      <div
        className={clsx("transition-opacity duration-300 ease-in", {
          "invisible h-0 opacity-0 ": !isShown,
          "visible h-auto opacity-100": isShown,
        })}
      >
        {children}
      </div>
    </div>
  );
};

export default CollapsibleContent;
