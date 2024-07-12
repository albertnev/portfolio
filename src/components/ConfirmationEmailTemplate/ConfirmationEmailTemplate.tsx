import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

const ConfirmationEmailTemplate = () => {
  const previewText = `Thank you for contacting me! I will contact you as soon as I can.`;

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
                  src="cid:emailheart@confirmationemail.albertnev.com"
                  width="100"
                />
              </div>
            </div>
            <Section className="">
              <Heading className="text-slate-900 text-2xl mb-4 text-center">
                Thank you for contacting me!
              </Heading>
              <Text className="my-4 text-base">
                The information you submitted has been received. If your job
                offer fits in what I'm looking for right now, I will contact you
                as soon as I can.
              </Text>
              <Text className="my-4 text-sm">
                This is just a confirmation e-mail. Please, do not respond.
              </Text>
            </Section>
            <Hr className="my-[16px] mx-0 w-full" />
            <Section>
              <Text className="my-4 text-xs">
                You're receiving this e-mail because you submitted a contact
                form{" "}
                <Link href="https://albertnev.vercel.app/">
                  in my portfolio
                </Link>
                . You will not receive any further automated e-mails.
              </Text>
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default ConfirmationEmailTemplate;
