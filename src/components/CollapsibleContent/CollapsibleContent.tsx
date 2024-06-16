import { FCProps } from "@/types/FCProps";
import { clsx } from "clsx";
import { useState } from "react";
import { FaCaretDown, FaCaretRight } from "react-icons/fa6";

interface CollapsibleContentProps extends FCProps {
  title?: string;
  shownByDefault?: boolean;
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
        onClick={() => setIsShown((current) => !current)}
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
