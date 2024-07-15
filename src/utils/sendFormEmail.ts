"use server";

import { render } from "@react-email/components";
import path from "node:path";
import { createTransport } from "nodemailer";
import type Mail from "nodemailer/lib/mailer";

import { ConfirmationEmailTemplate } from "@/components/ConfirmationEmailTemplate";
import { EmailTemplate } from "@/components/EmailTemplate";
import { type EmailTemplateProps } from "@/components/EmailTemplate/EmailTemplate";

export const sendFormEmail = async (data: Record<string, string>) => {
  const transport = createTransport({
    auth: {
      pass: process.env.EMAIL_PWD,
      user: process.env.EMAIL_ADDRESS,
    },
    service: "gmail",
  });

  const emailImagePath = path.join(
    process.cwd(),
    process.env.VERCEL_URL ? "" : "public",
    "email_heart.png",
  );

  const jobMailOptions: Mail.Options = {
    attachments: [
      {
        cid: "emailheart@jobofferemail.albertnev.com",
        filename: "email_heart.png",
        path: emailImagePath,
      },
    ],
    from: { address: process.env.EMAIL_ADDRESS!, name: "Portfolio Job Offer" },
    html: render(EmailTemplate(data as unknown as EmailTemplateProps)),
    replyTo: data.email,
    subject: `Portfolio Form - ${data.name}, from ${data.company}`,
    to: process.env.EMAIL_ADDRESS,
  };

  const confirmationMailOptions: Mail.Options = {
    attachments: [
      {
        cid: "emailheart@confirmationemail.albertnev.com",
        filename: "email_heart.png",
        path: emailImagePath,
      },
    ],
    from: { address: process.env.EMAIL_ADDRESS!, name: "Albert Nevado" },
    html: render(ConfirmationEmailTemplate()),
    replyTo: "no-reply@noreply.com",
    subject: `Job offer for Albert Nevado submitted!`,
    to: data.email,
  };

  try {
    // Send job e-mail to myself
    await transport.sendMail(jobMailOptions);

    // Send confirmation e-mail to sender
    await transport.sendMail(confirmationMailOptions);
  } catch (err) {
    return {
      errors: { mail: JSON.stringify(err) },
      hasErrors: true,
    };
  }

  return {
    errors: {},
    hasErrors: false,
  };
};
