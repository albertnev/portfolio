import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { type z } from "zod";

import { type companyInformationSchema } from "@/types/schemas/companyInformationSchema";
import { type jobDescriptionSchema } from "@/types/schemas/jobDescriptionSchema";
import { type positionInformationSchema } from "@/types/schemas/positionInformationSchema";
import { getAmount } from "@/utils/getAmount";

export type EmailTemplateProps = z.infer<typeof companyInformationSchema> &
  z.infer<typeof jobDescriptionSchema> &
  z.infer<typeof positionInformationSchema>;

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

const getRemoteText = (remote: string) => {
  const texts: Record<string, string> = {
    "1-office": "1 day office",
    "2-office": "2 days office",
    "full-remote": "Full remote",
  };
  return texts[remote] ?? "Invalid value for remote field";
};

const renderSectionTitle = (title: string) => {
  return <Heading className="text-slate-900 text-2xl mb-4">{title}</Heading>;
};

const renderField = (title: string, value: string | number) => {
  return (
    <>
      <Heading as="h4" className="font-bold m-0 text-base">
        {title}
      </Heading>
      <Text className="p-0 m-0 mb-4">{value}</Text>
    </>
  );
};

const EmailTemplate = (data: EmailTemplateProps) => {
  const previewText = `${data.job} offer for ${getAmount(data.salary)}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-slate-800 p-6 my-auto mx-auto font-sans text-[16px]">
          <Container className="bg-white my-[20px] mx-auto p-10 rounded max-w-screen-md border-separate">
            <div className="h-full w-full block text-center align-middle">
              <div className="rounded-full h-28 w-28 inline-block p-4 bg-white border-solid border-4 border-slate-900 mb-10 text-center align-middle">
                <Img
                  alt="An e-mail with a heart"
                  className="inline-block"
                  height="100"
                  src={`${baseUrl}/images/email_heart.png`}
                  width="100"
                />
              </div>
            </div>
            <Section>
              {renderSectionTitle("Company information")}
              {renderField("Company", data.company)}
              {renderField("Contact person", `${data.name} (${data.email})`)}
            </Section>
            <Hr className="my-[16px] mx-0 w-full" />
            <Section>
              {renderSectionTitle("Position information")}
              {renderField("Title", data.job)}
              {renderField("Seniority", data.seniority)}
              {renderField("Max. yearly salary", getAmount(data.salary))}
              {renderField("Vacation days", data.vacationDays)}
            </Section>
            <Hr className="my-[16px] mx-0 w-full" />
            <Section>
              {renderSectionTitle("Job description")}
              {renderField("Remote modality", getRemoteText(data.remote))}
              {renderField("Tasks", data.tasks)}
              {renderField("Why me?", data.reasons)}
              {renderField("Some extra points:", data.extras)}
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default EmailTemplate;
