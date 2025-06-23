import React from "react"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FiLock, FiMail } from "react-icons/fi";


const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const loginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
  });

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/users/login", // ✅ API URL fixed
        values,
        {         
           withCredentials: true,
        }
        // { withCredentials: true } // ✅ Credentials enabled
      );
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
      const userId = response.data.data.user._id;
      console.log(userId)
      localStorage.setItem("userId", userId);

      console.log("User logged in:", response.data);
      const data = response.data;
      localStorage.setItem("token", data.token);
      navigate("/"); // ✅ Redirect to home after successful login
    } catch (error) {
      setError(error.response?.data?.message || "Login failed. Please try again.");
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-300 via-purple-200 to-fuchsia-200 relative overflow-hidden">
      {/* Decorative gradient glow */}
      <div className="absolute -inset-16 z-0 pointer-events-none">
        <div className="w-full h-full rounded-[2.5rem] blur-3xl opacity-60 bg-gradient-to-br from-fuchsia-300 via-purple-100 to-violet-200 animate-gradient" />
      </div>
      {/* Glassmorphic Card */}
      <div className="w-full max-w-md mx-auto p-10 rounded-3xl bg-white/80 shadow-2xl border border-purple-100/60 backdrop-blur-2xl relative z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-purple-700 via-fuchsia-600 to-violet-600 bg-clip-text text-transparent text-center font-jakarta tracking-tight drop-shadow mb-8 cursor-pointer select-none">
          Welcome Back
        </h2>

        {error && <p className="text-red-500 text-center mb-5 font-semibold font-inter">{error}</p>}

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={handleLogin}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-7">
              {/* Email */}
              <div>
  <label className="flex items-center gap-2 text-gray-700 font-jakarta font-semibold mb-2 text-base">
    <FiMail className="text-fuchsia-600" />
    Email Address or Phone Number
  </label>
  <Field
    name="contact"
    autoComplete="username"
    className="w-full px-5 py-3 rounded-xl border border-purple-200 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100/60 bg-white/70 placeholder-gray-400 text-gray-900 font-inter shadow transition-all duration-200 focus:shadow-fuchsia-200/30"
    placeholder="your@email.com or +1234567890"
  />
  <ErrorMessage name="contact" component="p" className="text-red-500 text-xs mt-2 font-inter" />
</div>
              {/* Password */}
              <div>
                <label className="flex items-center gap-2 text-gray-700 font-jakarta font-semibold mb-2 text-base">
                  <FiLock className="text-fuchsia-600" />
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  autoComplete="current-password"
                  className="w-full px-5 py-3 rounded-xl border border-purple-200 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100/60 bg-white/70 placeholder-gray-400 text-gray-900 font-inter shadow transition-all duration-200 focus:shadow-fuchsia-200/30"
                  placeholder="Enter your password"
                />
                <ErrorMessage name="password" component="p" className="text-red-500 text-xs mt-2 font-inter" />
              </div>
              {/* Submit */}
              <button
                type="submit"
                className="w-full py-4 px-6 mt-2 bg-gradient-to-r from-purple-700 via-fuchsia-600 to-violet-700 text-white font-jakarta font-semibold rounded-xl shadow-xl hover:shadow-fuchsia-500/20 hover:scale-[1.02] active:scale-95 transition-all duration-200 text-lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Logging in..." : "Login"}
              </button>
            </Form>
          )}
        </Formik>

        <p className="text-center text-gray-700 mt-6 font-inter">
          Don&apos;t have an account?{" "}
          <a
            href="/signup"
            className="text-fuchsia-600 hover:text-fuchsia-700 font-jakarta font-semibold transition-colors duration-200 hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
