import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import About from "../../pages/About";
import "@testing-library/jest-dom";

describe("About Component", () => {
  it("renders the About Us heading", () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    const heading = screen.getByRole("heading", { name: /about us/i });
    expect(heading).toBeInTheDocument();
  });

  it("renders the About Us description", () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    const description = screen.getByText(/Lorem ipsum dolor sit amet/i);
    expect(description).toBeInTheDocument();
  });

  it("renders the Back to Home link", () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>
    );

    const link = screen.getByRole("link", { name: /back to home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });
});
