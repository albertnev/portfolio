"use client";

import { clsx } from "clsx";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaCaretRight } from "react-icons/fa6";
import { LuMenu } from "react-icons/lu";

const menuEntries = [
  { id: "about", title: "About me" },
  { id: "skill-set", title: "Skill set" },
  { id: "work-experience", title: "Work experience" },
  { id: "education", title: "Education" },
  { id: "hobbies", title: "Hobbies" },
];

const MainMenu = () => {
  const [activeSection, setActiveSection] = useState<string>("about");
  const [menuOpen, setMenuOpen] = useState(false);

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
    sections.forEach((section) => {
      section && observer.observe(section);
    });

    // Disconnect on unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div
        className={clsx(
          "z-30 fixed top-0 left-0 py-20 justify-center items-center w-full !my-0 bg-cyan-700/20 backdrop-blur-md md:backdrop-blur-none md:static md:flex md:justify-normal md:bg-transparent md:w-auto md:my-auto md:py-0",
          { flex: menuOpen, hidden: !menuOpen },
        )}
      >
        <ul className="-ml-5 md:border-l-2 md:border-cyan-200 md:ml-0 space-y-2">
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
                  className={clsx(
                    "block mr-2 transition-opacity duration-1000",
                    {
                      "opacity-0": !isActive,
                      "opacity-100": isActive,
                    },
                  )}
                />
                <Link href={`#${page.id}`}>{page.title}</Link>
              </li>
            );
          })}
        </ul>
      </div>
      <button
        className={clsx(
          "fixed z-40 top-4 left-3 !mt-0 flex items-center md:hidden p-4 rounded-md backdrop-blur-sm text-2xl",
          { "bg-cyan-700/10": !menuOpen, "bg-transparent": menuOpen },
        )}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        type="button"
        onClick={() => {
          setMenuOpen((current) => !current);
        }}
      >
        {menuOpen ? <AiOutlineClose /> : <LuMenu />}
        {!menuOpen && (
          <span className="text-xl ml-5">
            {menuEntries.find((entry) => entry.id === activeSection)?.title ??
              ""}
          </span>
        )}
      </button>
    </>
  );
};

export default MainMenu;
