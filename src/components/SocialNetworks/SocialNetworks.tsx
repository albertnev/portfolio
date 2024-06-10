import React from "react";

import { type FCProps } from "@/types/FCProps";

interface SocialNetworksProps extends FCProps {
  networks: { link: string; type: "github" | "linkedin" | "instagram" | "" }[];
}

const SocialNetworks: React.FC<SocialNetworksProps> = () => {
  return (
    <div>
      <div /> SocialNetworks
    </div>
  );
};

export default SocialNetworks;
