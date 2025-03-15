import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const { data } = await axios.post(
          "http://localhost:5000/api/auth/login",
          values,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        Cookies.set("authToken", data.token, {
          expires: 1,
          secure: true,
          sameSite: "Strict",
        });
        toast.success("Login successful!");
        console.log(data.token);
        navigate("/");
      } catch (err) {
        toast.error("Login failed. Error is a", err);
      }
      setSubmitting(false);
    },
  });

  return (
    <div className="lg:w-1/3 mx-2 backdrop-blur-xl bg-white/10 p-10 rounded-xl shadow-xl border border-white/20">
      <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

      <form onSubmit={formik.handleSubmit}>
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
          Login
        </button>
      </form>

      <div className="mt-4 text-center">
        <p className="text-sm">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-500 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
