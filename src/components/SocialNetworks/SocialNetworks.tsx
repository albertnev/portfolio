import Link from "next/link";
import React from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa6";

import { type FCProps } from "@/types/FCProps";

interface SocialNetworksProps extends FCProps {
  networks: { link: string; type: "github" | "linkedin" | "instagram" }[];
}

const SocialNetworks: React.FC<SocialNetworksProps> = ({
  className = "",
  networks,
}) => {
  const networkIcons = {
    github: FaGithub,
    linkedin: FaLinkedin,
    instagram: FaInstagram,
  };

  return (
    <ul className={`flex space-x-5 ${className}`}>
      {networks.map(({ link, type }) => {
        const Icon = networkIcons[type];
        return (
          <li className="opacity-85 hover:opacity-100 text-4xl " key={type}>
            <Link href={link} target="_blank">
              <Icon />
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default SocialNetworks;
