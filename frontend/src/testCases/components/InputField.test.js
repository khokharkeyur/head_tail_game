import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import InputField from "../../components/InputField";

// Mock Formik props
const mockFormik = {
  values: { name: "" },
  errors: { name: "Name is required" },
  touched: { name: true },
  handleChange: jest.fn(),
  handleBlur: jest.fn(),
};

describe("InputField", () => {
    it("renders the input field", () => {
        render(
        <InputField label="Name" type="text" name="name" formik={mockFormik} />
        );
    
        const input = screen.getByPlaceholderText("Enter your Name");
        expect(input).toBeInTheDocument();
    });

    it("calls handleChange when the input value changes", async () => {
        render(
          <InputField label="Name" type="text" name="name" formik={mockFormik} />
        );
    
        const input = screen.getByPlaceholderText("Enter your Name");
    
        await userEvent.type(input, "Test1");
    
        expect(mockFormik.handleChange).toHaveBeenCalled();
    });

  it("calls handleBlur when the input loses focus", () => {
    render(
      <InputField label="Name" type="text" name="name" formik={mockFormik} />
    );

    const input = screen.getByPlaceholderText("Enter your Name");

    fireEvent.blur(input);

    expect(mockFormik.handleBlur).toHaveBeenCalled();
  });

  it("displays error message when the field is touched and has an error", () => {
    render(
      <InputField label="Name" type="text" name="name" formik={mockFormik} />
    );

    const errorMessage = screen.getByText("Name is required");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveClass("text-red-500");
  });

  it("does not display an error message when the field is not touched", () => {
    const mockFormikNoError = {
      ...mockFormik,
      touched: { name: false },
      errors: { name: "Name is required" },
    };

    render(
      <InputField
        label="Name"
        type="text"
        name="name"
        formik={mockFormikNoError}
      />
    );

    const errorMessage = screen.queryByText("Name is required");
    expect(errorMessage).toBeNull();
  });
});
