import createFetchMock from "vitest-fetch-mock";

import {
  validateAndSendContactForm,
  validateCompanyInformation,
  validateJobDescription,
  validatePositionInformation,
} from "../formValidation";
import * as sendFormEmailModule from "../sendFormEmail";

describe("Util formValidation", () => {
  describe("validateCompanyInformation", () => {
    it("returns hasErrors as false if validation is successful", async () => {
      const validData = {
        company: "Company",
        email: "email@test.com",
        name: "Name",
      };
      expect(await validateCompanyInformation(validData)).toEqual({
        errors: {},
        hasErrors: false,
      });
    });

    it("returns hasErrors as true and an errors object if validation fails", async () => {
      const invalidData = {
        company: "",
        email: "",
        name: "",
      };
      expect(await validateCompanyInformation(invalidData)).toEqual({
        errors: {
          company: ["I need to know you are not an evil company!"],
          email: [
            "Without this, it will be hard to answer!",
            "Please, make sure this is a valid e-mail.",
          ],
          name: ["I need to know who I will be talking to!"],
        },
        hasErrors: true,
      });
    });
  });

  describe("validateJobDescription", () => {
    it("returns hasErrors as false if validation is successful", async () => {
      const validData = {
        extras: "Test extras minimum text to be valid information during tests",
        reasons:
          "Test reasons minimum text to be valid information during tests",
        remote: "full-remote",
        tasks: "Test tasks minimum text to be valid information during tests",
      };
      expect(await validateJobDescription(validData)).toEqual({
        errors: {},
        hasErrors: false,
      });
    });

    it("returns hasErrors as true and an errors object if validation fails", async () => {
      const invalidData = {
        extras: "",
        reasons: "",
        remote: "",
        tasks: "",
      };
      expect(await validateJobDescription(invalidData)).toEqual({
        errors: {
          reasons: ["At least, write something!"],
          remote: ["Remote came to stay! Select less office days."],
          tasks: ["I also accept drinking coffee the whole day!"],
        },
        hasErrors: true,
      });
    });
  });

  describe("validatePositionInformation", () => {
    it("returns hasErrors as false if validation is successful", async () => {
      const validData = {
        job: "Job",
        salary: "55000",
        seniority: "Seniority",
        vacationDays: "30",
      };
      expect(await validatePositionInformation(validData)).toEqual({
        errors: {},
        hasErrors: false,
      });
    });

    it("returns hasErrors as true and an errors object if validation fails", async () => {
      const invalidData = {
        job: "",
        salary: "",
        seniority: "",
        vacationDays: "",
      };
      expect(await validatePositionInformation(invalidData)).toEqual({
        errors: {
          job: [
            "Unlike Chandler Bing, I'd like to be able to tell the name of my job!",
          ],
          salary: ["Living is so expensive these days!"],
          seniority: ["This fields helps me see if I may fit!"],
          vacationDays: ["Sometimes people need a well deserved rest!"],
        },
        hasErrors: true,
      });
    });
  });

  describe("validateAndSendContactForm", () => {
    const validFormData = {
      company: "My company",
      email: "test@email.com",
      extras: "Test extras minimum text to be valid information during tests",
      job: "Test Job",
      name: "Test name",
      reasons: "Test reasons minimum text to be valid information during tests",
      remote: "full-remote",
      salary: "80000",
      seniority: "Senior",
      tasks: "Test tasks minimum text to be valid information during tests",
      vacationDays: "30",
    };

    const mockCaptchaValidation = (success = true) => {
      const fetchMock = createFetchMock(vi);
      fetchMock.enableMocks();
      fetchMock.mockIf(/recaptcha\/api\/siteverify/, () => ({
        body: JSON.stringify({ success }),
      }));
    };

    it("returns object with errorMessage if form data is invalid", async () => {
      expect(await validateAndSendContactForm({})).toEqual(
        expect.objectContaining({
          errorMessage:
            "Please, review your submitted information in previous steps.",
        }),
      );
    });

    it("returns object with errorMessage if captcha validation fails", async () => {
      mockCaptchaValidation(false);
      expect(await validateAndSendContactForm(validFormData)).toEqual(
        expect.objectContaining({
          errorMessage:
            "You failed the Turing test. If you're not a robot, please, try again.",
        }),
      );
    });

    it("returns object with errorMessage if email sending process fails", async () => {
      mockCaptchaValidation();
      vi.spyOn(sendFormEmailModule, "sendFormEmail").mockImplementation(
        async () => ({
          errors: {},
          hasErrors: true,
        }),
      );

      expect(await validateAndSendContactForm(validFormData)).toEqual(
        expect.objectContaining({
          errorMessage: "E-mailing process failed.",
        }),
      );
    });

    it("returns object with errorMessage as undefined and hasErrors as false if all validations complete successfully", async () => {
      mockCaptchaValidation();
      vi.spyOn(sendFormEmailModule, "sendFormEmail").mockImplementation(
        async () => ({
          errors: {},
          hasErrors: false,
        }),
      );

      expect(await validateAndSendContactForm(validFormData)).toEqual({
        errorMessage: undefined,
        errors: {},
        hasErrors: false,
      });
    });
  });
});
