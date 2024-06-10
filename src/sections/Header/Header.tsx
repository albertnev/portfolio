import React from "react";

import { SocialNetworks } from "@/components/SocialNetworks";
import { type FCProps } from "@/types/FCProps";

const Header: React.FC<FCProps> = ({ className = "" }) => {
  return (
    <header className={`flex flex-col justify-between ${className}`}>
      <div>
        <h1 className="text-5xl font-bold">Albert Nevado</h1>
        <h2 className="text-xl font-medium mt-2">Senior Frontend Engineer</h2>
        <p className="mt-4">
          Etiam maximus libero pharetra mi ultricies dignissim. Praesent sit
          amet leo velit. Pellentesque condimentum orci mi, eget sodales erat
          tincidunt a.
        </p>
      </div>
      <SocialNetworks networks={[]} />
    </header>
  );
};

export default Header;
