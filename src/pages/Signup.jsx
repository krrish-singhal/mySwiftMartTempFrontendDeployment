import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import signupSVG from "../../assest/login.gif"; // Update if needed
import { Eye, EyeOff } from "lucide-react";
import { toast } from "react-toastify";

const Signup = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isPasswordTooShort = formData.password.length > 0 && formData.password.length < 8;
  const isPasswordMismatch =
    formData.password.length >= 8 && formData.confirmPassword !== formData.password;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isPasswordTooShort) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    if (isPasswordMismatch) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(data.message);
        navigate("/login");
      } else {
        toast.error(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-r from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl w-full max-w-xl p-8 space-y-6">
        <div className="text-center">
          <img
            src={signupSVG}
            alt="Signup Illustration"
            className="mx-auto w-24 h-24 object-contain mb-2"
          />
          <p className="text-sm text-gray-500 dark:text-gray-400">Upload Photo</p>
          <h2 className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-2">
            Create Account
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Sign up to get started with Swift Mart
          </p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-blue-50 dark:bg-gray-800 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-blue-50 dark:bg-gray-800 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password
            </label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter password (min 8 characters)"
                value={formData.password}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-blue-50 dark:bg-gray-800 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setPasswordVisible((prev) => !prev)}
                className="absolute right-3 inset-y-0 flex items-center text-gray-500 dark:text-gray-300 focus:outline-none"
              >
                {passwordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {isPasswordTooShort && (
              <p className="text-xs text-red-600 mt-1">Password must be at least 8 characters long</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={confirmPasswordVisible ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full mt-1 px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-blue-50 dark:bg-gray-800 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setConfirmPasswordVisible((prev) => !prev)}
                className="absolute right-3 inset-y-0 flex items-center text-gray-500 dark:text-gray-300 focus:outline-none"
              >
                {confirmPasswordVisible ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {isPasswordMismatch && (
              <p className="text-xs text-red-600 mt-1">Passwords do not match</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 mt-4 rounded-md bg-blue-600 text-white font-semibold hover:bg-blue-700 transition duration-200"
          >
            Sign Up
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-2 my-2">
          <div className="h-px flex-grow bg-gray-300 dark:bg-gray-600" />
          <span className="text-xs text-gray-500 dark:text-gray-400">OR</span>
          <div className="h-px flex-grow bg-gray-300 dark:bg-gray-600" />
        </div>

        {/* Already have account */}
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 hover:underline dark:text-blue-400">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
