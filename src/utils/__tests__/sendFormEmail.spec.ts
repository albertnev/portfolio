import * as nodemailer from "nodemailer";
import { type NodemailerMock } from "nodemailer-mock";

import { sendFormEmail } from "../sendFormEmail";

const { mock: mailMock } = nodemailer as unknown as NodemailerMock;

describe("Util sendFormEmail", () => {
  const formData = {
    company: "My company",
    email: "test@email.com",
    extras: "My test extras",
    job: "Test Job",
    name: "Test name",
    reasons: "My test reasons",
    remote: "full-remote",
    salary: "80000",
    seniority: "Senior",
    tasks: "My test tasks",
    vacationDays: "30",
  };

  beforeEach(() => {
    mailMock.reset();
    process.env.EMAIL_ADDRESS = "myemail@email.com";
  });

  it("sends job offer e-mail with correct contact name and subject to the right e-mail address", async () => {
    await sendFormEmail(formData);
    const jobOfferEmail = mailMock
      .getSentMail()
      .find((mail) => mail.to === process.env.EMAIL_ADDRESS)!;

    expect(jobOfferEmail).toBeDefined();
    expect(jobOfferEmail.html).toMatch(/Position information/);
    expect(jobOfferEmail.from).toEqual({
      address: process.env.EMAIL_ADDRESS,
      name: "Portfolio Job Offer",
    });
    expect(jobOfferEmail.replyTo).toEqual(formData.email);
    expect(jobOfferEmail.subject).toEqual(
      `Portfolio Form - ${formData.name}, from ${formData.company}`,
    );
  });

  it("sends confirmation e-mail with correct contact name and subject to the right e-mail address", async () => {
    await sendFormEmail(formData);
    const confirmationEmail = mailMock
      .getSentMail()
      .find((mail) => mail.to === formData.email)!;
    expect(confirmationEmail).toBeDefined();
    expect(confirmationEmail.html).toMatch(
      /The information you submitted has been received/,
    );
    expect(confirmationEmail.from).toEqual({
      address: process.env.EMAIL_ADDRESS,
      name: "Albert Nevado",
    });
    expect(confirmationEmail.replyTo).toEqual("no-reply@noreply.com");
    expect(confirmationEmail.subject).toEqual(
      "Job offer for Albert Nevado submitted!",
    );
  });

  it("returns object with hasErrors as true if there is any error while sending the e-mails", async () => {
    mailMock.setShouldFail(true);
    const response = await sendFormEmail(formData);
    expect(response).toEqual(
      expect.objectContaining({
        hasErrors: true,
      }),
    );
  });

  it("returns object with hasErrors as false if the e-mail process is successful", async () => {
    const response = await sendFormEmail(formData);
    expect(response).toEqual(
      expect.objectContaining({
        errors: {},
        hasErrors: false,
      }),
    );
  });
});
