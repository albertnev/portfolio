import { clsx } from "clsx";
import { useInView } from "react-intersection-observer";

import { type FCProps } from "@/types/FCProps";

interface SectionWrapperProps extends FCProps {
  id: string;
  title: string;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({
  children,
  className = "",
  id,
}) => {
  const { inView, ref } = useInView({ triggerOnce: true, threshold: 0.2 });

  return (
    <section
      ref={ref}
      className={clsx(
        "lg:mt-24 transition-opacity delay-300 duration-1000 ease-in",
        {
          "opacity-0": !inView,
          "opacity-100": inView,
        },
        className,
      )}
      id={id}
    >
      <div>{children}</div>
    </section>
  );
};

export default SectionWrapper;
