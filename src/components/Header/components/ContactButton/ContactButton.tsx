"use client";

import { FaMessage } from "react-icons/fa6";

import { LinkButton } from "@/components/LinkButton";
import { type FCProps } from "@/types/FCProps";

const ContactButton: React.FC<FCProps> = (props) => {
  return (
    <LinkButton {...props} href="/contact" icon={FaMessage}>
      Contact me
    </LinkButton>
  );
};

export default ContactButton;
