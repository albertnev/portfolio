import { redirect } from "next/navigation";

import { ContactHeader } from "@/components/ContactHeader";
import { ContactForm } from "@/sections/ContactForm";

const Contact: React.FC = () => {
  if (process.env.CONTACT_FORM_ENABLED !== "true") {
    redirect("/");
  }

  return (
    <>
      <ContactHeader className="half-screen" />
      <main className="half-screen">
        <div className="section-pt max-h-screen flex md:pb-6">
          <ContactForm />
        </div>
      </main>
    </>
  );
};

export default Contact;
