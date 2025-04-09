import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "../../pages/Home";
import "@testing-library/jest-dom";
import Cookies from "js-cookie";

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

jest.mock("js-cookie", () => ({
  remove: jest.fn(),
}));

describe("Home Component", () => {
  it("renders the Welcome heading", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const heading = screen.getByRole("heading", { name: /welcome/i });
    expect(heading).toBeInTheDocument();
  });

  it("renders the About Us link", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const aboutLink = screen.getByRole("link", { name: /about us/i });
    expect(aboutLink).toBeInTheDocument();
    expect(aboutLink).toHaveAttribute("href", "/about");
  });

  it("renders the Play Head & Tail link", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const playLink = screen.getByRole("link", { name: /play head & tail/i });
    expect(playLink).toBeInTheDocument();
    expect(playLink).toHaveAttribute("href", "/head-tail");
  });

  it("calls handleLogout when Logout button is clicked", () => {
    render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    const logoutButton = screen.getByRole("button", { name: /logout/i });
    fireEvent.click(logoutButton);

    expect(Cookies.remove).toHaveBeenCalledWith("authToken", {
      secure: true,
      sameSite: "Strict",
    });
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });
});
