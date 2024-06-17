"use client";

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
  const { inView, ref } = useInView({
    rootMargin: "-200px 0px -200px 0px",
    triggerOnce: true,
  });

  return (
    <section
      ref={ref}
      className={clsx(
        "pt-24 transition-opacity delay-200 duration-1000 ease-in md:pt-16 lg:pt-24",
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
