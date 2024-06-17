import Link from "next/link";
import React from "react";

import { ContactButton } from "./components/ContactButton";

import { MainMenu } from "@/components/MainMenu";
import { SocialNetworks } from "@/components/SocialNetworks";
import { type FCProps } from "@/types/FCProps";

const Header: React.FC<FCProps> = ({ className = "" }) => {
  return (
    <header
      className={`pt-24 max-h-screen flex flex-col justify-between space-y-6 md:pt-16 md:sticky md:top-0 lg:pt-24 ${className}`}
    >
      <div>
        <h1 className="text-5xl font-bold">Albert Nevado</h1>
        <h2 className="text-xl font-medium mt-2">Senior Frontend Engineer</h2>
        <p className="my-4 w-4/5 md:w-auto lg:w-4/5">
          My objective is to create applications that are able to make users'
          workflows to achieve a task easier.
        </p>
      </div>
      <MainMenu />
      <div className="flex items-center">
        <SocialNetworks
          networks={[
            {
              link: "https://github.com/albertnev",
              type: "github",
            },
            {
              link: "https://www.linkedin.com/in/albertnevado/",
              type: "linkedin",
            },
          ]}
        />
        <ContactButton className="hidden ml-5" />
      </div>
      <div className="flex flex-col space-y-2">
        <p className="text-sm">
          Check out{" "}
          <Link
            className="underline underline-offset-4"
            href="https://github.com/albertnev/portfolio"
            target="_blank"
          >
            the code of this portfolio
          </Link>{" "}
          on my Github!
        </p>
        <a
          className="text-xs block"
          href="https://www.svgbackgrounds.com/set/free-svg-backgrounds-and-patterns/"
        >
          SVG Background made by SVGBackgrounds.com.
        </a>
      </div>
    </header>
  );
};

export default Header;
