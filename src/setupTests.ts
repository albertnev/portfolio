import "@testing-library/jest-dom";
import "./app/globals.css";

const MockIntersectionObserver = vi.fn(() => ({
  disconnect: vi.fn(),
  observe: vi.fn(),
  takeRecords: vi.fn(),
  unobserve: vi.fn(),
}));
vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);

process.env.CONTACT_FORM_ENABLED = "true";

// eslint-disable-next-line func-names -- named function to respect this scope
HTMLFormElement.prototype.requestSubmit = function () {
  if (!this.reportValidity()) {
    return;
  }
  const submitEvent = new Event("submit", { cancelable: true });
  this.dispatchEvent(submitEvent);
  if (!submitEvent.defaultPrevented) {
    this.submit();
  }
};
Element.prototype.scrollIntoView = vi.fn();
vi.mock("next/navigation", async () => {
  return {
    ...(await vi.importActual("next/navigation")),
    useRouter: vi.fn(() => ({
      push: vi.fn(),
      replace: vi.fn(),
    })),
    useSearchParams: vi.fn(),
  };
});
