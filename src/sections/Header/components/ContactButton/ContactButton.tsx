"use client";

import { FaMessage } from "react-icons/fa6";

import { Button } from "@/components/Button";
import { type FCProps } from "@/types/FCProps";

const ContactButton: React.FC<FCProps> = (props) => {
  return (
    <Button {...props} icon={FaMessage} onClick={() => null}>
      Contact me
    </Button>
  );
};

export default ContactButton;
