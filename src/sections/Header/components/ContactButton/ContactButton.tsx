"use client";

import { Button } from "@/components/Button";
import { FCProps } from "@/types/FCProps";
import { FaMessage } from "react-icons/fa6";

const ContactButton: React.FC<FCProps> = (props) => {
  return (
    <Button {...props} onClick={() => null} icon={FaMessage}>
      Contact me
    </Button>
  );
};

export default ContactButton;
