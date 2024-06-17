"use client";

import { clsx } from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaCaretRight } from "react-icons/fa6";

const MainMenu = () => {
  const [activeSection, setActiveSection] = useState<string>();
  const menuEntries = [
    { id: "about", title: "About me" },
    { id: "skillset", title: "Skillset" },
    { id: "work-experience", title: "Work experience" },
    { id: "education", title: "Education" },
    { id: "hobbies", title: "Hobbies" },
  ];

  useEffect(() => {
    const sections = menuEntries.map((section) =>
      document.getElementById(section.id),
    );
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0% -50% 0%", // Intersecting element's top/bottom at the center of the viewport
      threshold: 0,
    };

    // Each time a section enters the viewport, callback is called
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const activeEntry = menuEntries.find(
            (section) => entry.target.id === section.id,
          );
          if (activeEntry) {
            setActiveSection(activeEntry.id);
          }
        }
      });
    }, observerOptions);

    // Which sections (or elements) to observe
    sections?.forEach((section) => {
      section && observer.observe(section);
    });

    // Disconnect on unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <ul className="border-l-2 border-cyan-200 space-y-2">
      {menuEntries.map((page) => {
        const isActive = activeSection === page.id;

        return (
          <li
            key={page.id}
            className={clsx(
              "relative flex items-center transition-all duration-1000",
              {
                "opacity-70": !isActive,
                "text-cyan-200 font-bold opacity-100 ml-4": isActive,
              },
            )}
          >
            <FaCaretRight
              className={clsx("mr-2 transition-opacity duration-1000", {
                "opacity-0": !isActive,
                "opacity-100": isActive,
              })}
            />
            <Link href={`#${page.id}`}>{page.title}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default MainMenu;
