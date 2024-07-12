import "@testing-library/jest-dom";
import "./app/globals.css";

import { getMockFor } from "nodemailer-mock";

globalThis.jest = {
  ...globalThis.jest,
  advanceTimersByTime: vi.advanceTimersByTime.bind(vi),
};

const MockIntersectionObserver = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn(),
}));
vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);

Element.prototype.scrollIntoView = vi.fn();
vi.mock("next/navigation", async () => {
  return {
    ...(await vi.importActual("next/navigation")),
    redirect: vi.fn(),
    useRouter: vi.fn(() => ({
      push: vi.fn(),
      replace: vi.fn(),
    })),
    useSearchParams: vi.fn(),
  };
});

vi.mock("nodemailer", async () => {
  return getMockFor(await vi.importActual("nodemailer"));
});

beforeEach(() => {
  process.env.CONTACT_FORM_ENABLED = "true";
});

afterEach(() => {
  vi.restoreAllMocks();
});
