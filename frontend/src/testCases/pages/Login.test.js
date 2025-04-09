import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../../pages/Login";
import "@testing-library/jest-dom";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

jest.mock("js-cookie", () => ({
  set: jest.fn(),
}));
jest.mock("react-hot-toast", () => ({
  success: jest.fn(),
  error: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Login Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  it("renders the Login heading", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const heading = screen.getByRole("heading", { name: /login/i });
    expect(heading).toBeInTheDocument();
  });

  it("renders email and password input fields", () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
  });

  it("displays validation errors when form fields are empty", async () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    const submitButton = screen.getByRole("button", { name: /login/i });
    fireEvent.click(submitButton);

    expect(await screen.findByText("Email is required")).toBeInTheDocument();
    expect(await screen.findByText("Password is required")).toBeInTheDocument();
  });

  it("calls API and handles successful login", async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({ token: "mocked_token" }),
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    const submitButton = screen.getByRole("button", { name: /login/i });
    fireEvent.click(submitButton);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));
    expect(global.fetch).toHaveBeenCalledWith(
      "http://localhost:5000/api/auth/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: "test@example.com", password: "password123" }),
      }
    );

    expect(Cookies.set).toHaveBeenCalledWith("authToken", "mocked_token", {
      expires: 1,
      secure: true,
      sameSite: "Strict",
    });
    expect(toast.success).toHaveBeenCalledWith("Login successful!");
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("handles login failure", async () => {
    global.fetch.mockResolvedValue({
      ok: false,
      json: jest.fn().mockResolvedValue({ message: "Login failed" }),
    });

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: "password123" },
    });

    const submitButton = screen.getByRole("button", { name: /login/i });
    fireEvent.click(submitButton);

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    expect(toast.error).toHaveBeenCalledWith("Login failed");
  });
});
