import { render } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Cookies from "js-cookie";
import ProtectedRoute from "../../components/ProtectedRoute";
import "@testing-library/jest-dom";

jest.mock("js-cookie", () => ({
  get: jest.fn(),
}));

describe("ProtectedRoute", () => {
  it("redirects to /login if no authToken is present", () => {
    Cookies.get.mockReturnValue(null);

    const { container } = render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <div>Protected Content</div>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );
    
    expect(container).toHaveTextContent("Login Page");
  });

  it("renders children when authToken is present", () => {
    Cookies.get.mockReturnValue("validToken");

    const { container } = render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <div>Protected Content</div>
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<div>Login Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(container).toHaveTextContent("Protected Content");
  });
});
