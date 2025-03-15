import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import HeadTail from "../../pages/HeadTail";
import "@testing-library/jest-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  Link: ({ children, ...props }) => <a {...props}>{children}</a>,
}));

describe("HeadTail Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the HeadTail title", () => {
    render(
      <MemoryRouter>
        <HeadTail />
      </MemoryRouter>
    );
    const title = screen.getByText(/Head & Tail Game/i);
    expect(title).toBeInTheDocument();
  });

  it("renders the select and submit buttons", () => {
    render(
      <MemoryRouter>
        <HeadTail />
      </MemoryRouter>
    );
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /reset/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/select value/i)).toBeInTheDocument();
  });

  it("renders the select options", () => {
    render(
      <MemoryRouter>
        <HeadTail />
      </MemoryRouter>
    );

    const select = screen.getByPlaceholderText('Select value');
    fireEvent.change(select, { target: { value: "H" } });
    expect(select.value).toBe("H");
  });

});
