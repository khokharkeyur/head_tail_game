import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import InputField from "../components/InputField";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await axios.post("http://localhost:5000/api/auth/signup", values, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        toast.success("Signup successful! Redirecting to login...");

        navigate("/login");
      } catch (err) {
        toast.error("Signup failed. Error is a", err);
      }
      setSubmitting(false);
    },
  });

  return (
    <div className="lg:w-1/3 mx-2 backdrop-blur-xl bg-white/10 p-10 rounded-xl shadow-xl border border-white/20">
      <h2 className="text-2xl font-semibold text-center mb-6">Sign Up</h2>

      <form onSubmit={formik.handleSubmit}>
        <InputField label="Name" type="text" name="name" formik={formik} />
        <InputField label="Email" type="email" name="email" formik={formik} />
        <InputField
          label="Password"
          type="password"
          name="password"
          formik={formik}
        />
        <button
          type="submit"
          disabled={formik.isSubmitting}
          className="w-full py-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 disabled:bg-gray-300"
        >
          Sign Up
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
