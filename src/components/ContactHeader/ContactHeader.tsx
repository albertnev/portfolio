import Link from "next/link";
import React from "react";
import { FaArrowLeft } from "react-icons/fa6";

import { type FCProps } from "@/types/FCProps";

const ContactHeader: React.FC<FCProps> = ({ className = "" }) => {
  return (
    <header
      className={`section-pt max-h-screen flex flex-col justify-between space-y-6 md:sticky md:top-0 ${className}`}
    >
      <div>
        <h1 className="text-5xl font-bold">Contact form</h1>
        <Link
          className="text-xl font-medium mt-2 flex items-center hover:text-cyan-200"
          href="/"
        >
          <FaArrowLeft className="mr-2" /> <span>Go back to Portfolio</span>
        </Link>
        <p className="my-4 w-4/5 md:w-auto lg:w-4/5">
          Fill in the requested information in this form to contact me. If the
          job offer fits my profile and interests, I will get in touch with you
          as soon as possible!
        </p>
      </div>
    </header>
  );
};

export default ContactHeader;
