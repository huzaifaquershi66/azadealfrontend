import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FiLock, FiMail } from "react-icons/fi";
import { FaGoogle, FaFacebook, FaGraduationCap } from "react-icons/fa6";
import academy from "./assets/academy.png"; // Adjust the import path as necessary

const LoginPage = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const loginSchema = Yup.object().shape({
    contact: Yup.string().required("Email/Phone is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/users/login",
        values,
        { withCredentials: true }
      );
      localStorage.setItem("user", JSON.stringify(response.data.data.user));
      const userId = response.data.data.user._id;
      localStorage.setItem("userId", userId);
      localStorage.setItem("token", response.data.token);
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Login failed. Please try again.");
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white font-sans">
      <div className="flex flex-col md:flex-row rounded-3xl shadow-2xl border border-gray-100 overflow-hidden bg-white max-w-5xl w-full mx-2 md:mx-0">
        {/* LEFT SIDE */}
        <div className="flex flex-col justify-center items-center md:w-[46%] w-full px-7 py-10 bg-white">
          {/* Logo as text with icon */}
          <div className="flex items-center gap-3 mb-5">
            <FaGraduationCap className="text-4xl text-fuchsia-700 drop-shadow" />
            <span className="text-3xl md:text-4xl font-extrabold font-jakarta text-purple-900 tracking-tight drop-shadow-lg">
              Azad Education
            </span>
          </div>
          {/* Main Tagline */}
          <h1 className="text-xl md:text-2xl font-bold font-jakarta text-fuchsia-700 mb-5 text-center tracking-tight">
            Taleem Har Ghar Tak
          </h1>
          {/* Image */}
          <img
               src={academy}
                          alt="Education Visual"
                          className="w-[400px] h-[100px] max-w-full rounded-3xl   object-cover"
                           style={{ minHeight: 440, maxHeight: 300, background: "transparent" }}
          />
          {/* Secondary Tagline */}
          <div className="text-base md:text-lg text-center text-purple-800 font-semibold mt-2 font-inter">
            Academy, Teachers, Students — ab aik click par!
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="flex flex-col justify-center items-center md:w-[54%] w-full px-4 md:px-10 py-8 bg-white">
          <div className="w-full max-w-md">
            <h2 className="text-2xl md:text-3xl font-extrabold font-jakarta text-center bg-gradient-to-r from-purple-700 to-fuchsia-600 bg-clip-text text-transparent mb-7 tracking-tight drop-shadow-md">
              Login to Your Account
            </h2>
            {error && (
              <p className="text-red-500 text-center mb-4 font-medium font-inter">{error}</p>
            )}
            <Formik
              initialValues={{ contact: "", password: "" }}
              validationSchema={loginSchema}
              onSubmit={handleLogin}
            >
              {({ isSubmitting }) => (
                <Form className="space-y-5">
                  {/* Email/Phone */}
                  <div>
                    <label className="flex items-center gap-2 text-gray-700 font-semibold font-inter mb-2">
                      <FiMail className="text-fuchsia-600" />
                      Email Address or Phone Number
                    </label>
                    <Field
                      name="contact"
                      autoComplete="username"
                      className="w-full px-4 py-3 rounded-lg border border-purple-200 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100/80 bg-white placeholder-gray-400 text-gray-900 font-inter shadow-sm text-base"
                      placeholder="your@email.com or +923xxxxxxxxx"
                    />
                    <ErrorMessage name="contact" component="p" className="text-red-500 text-xs mt-1 font-inter" />
                  </div>
                  {/* Password */}
                  <div>
                    <label className="flex items-center gap-2 text-gray-700 font-semibold font-inter mb-2">
                      <FiLock className="text-fuchsia-600" />
                      Password
                    </label>
                    <Field
                      type="password"
                      name="password"
                      autoComplete="current-password"
                      className="w-full px-4 py-3 rounded-lg border border-purple-200 focus:border-fuchsia-400 focus:ring-4 focus:ring-fuchsia-100/80 bg-white placeholder-gray-400 text-gray-900 font-inter shadow-sm text-base"
                      placeholder="Enter your password"
                    />
                    <ErrorMessage name="password" component="p" className="text-red-500 text-xs mt-1 font-inter" />
                  </div>
                  {/* Forgot Password */}
                  <div className="text-right mb-1">
                    <a href="/forgot-password" className="text-xs text-fuchsia-600 hover:underline font-semibold font-inter">
                      Forgot Password?
                    </a>
                  </div>
                  {/* Submit */}
                  <button
                    type="submit"
                    className="w-full py-3 bg-gradient-to-r from-purple-700 via-fuchsia-600 to-violet-700 text-white font-jakarta font-semibold rounded-lg shadow-lg hover:shadow-fuchsia-400/30 hover:scale-[1.01] active:scale-95 transition-all duration-200 text-lg"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Logging in..." : "Login"}
                  </button>
                  {/* OR divider */}
                  <div className="flex items-center my-3">
                    <div className="flex-grow border-t border-gray-200"></div>
                    <span className="mx-2 text-gray-400 font-medium text-xs font-inter">OR</span>
                    <div className="flex-grow border-t border-gray-200"></div>
                  </div>
                  {/* Social Login */}
                  <div className="flex flex-col gap-3">
                    <button
                      type="button"
                      className="flex items-center justify-center gap-3 py-2.5 w-full border border-gray-200 rounded-lg font-semibold bg-white hover:bg-fuchsia-50 shadow-sm transition text-base text-gray-700"
                    >
                      <span className="flex items-center justify-center bg-gradient-to-br from-white via-fuchsia-100 to-fuchsia-200 rounded-full p-2 shadow mr-2">
                        <FaGoogle className="text-red-500 text-xl" />
                      </span>
                      <span className="font-inter tracking-wide">Continue with Google</span>
                    </button>
                    <button
                      type="button"
                      className="flex items-center justify-center gap-3 py-2.5 w-full border border-gray-200 rounded-lg font-semibold bg-white hover:bg-blue-50 shadow-sm transition text-base text-gray-700"
                    >
                      <span className="flex items-center justify-center bg-gradient-to-br from-white via-blue-100 to-blue-200 rounded-full p-2 shadow mr-2">
                        <FaFacebook className="text-blue-600 text-xl" />
                      </span>
                      <span className="font-inter tracking-wide">Continue with Facebook</span>
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
            {/* Signup */}
            <p className="text-center text-gray-700 mt-7 font-inter text-sm">
              Don&apos;t have an account?{" "}
              <a
                href="/signup"
                className="text-fuchsia-600 hover:text-fuchsia-700 font-semibold hover:underline"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
