"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"
import { toast } from "react-toastify"
import resetIcon from "../assets/signin.gif"

const ResetPassword = () => {
  const { token } = useParams()
  const navigate = useNavigate()
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [tokenValid, setTokenValid] = useState(false)
  const [tokenChecked, setTokenChecked] = useState(false)

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/verify-reset-token/${token}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })

        const data = await response.json()

        setTokenValid(data.success)
        setTokenChecked(true)

        if (!data.success) {
          toast.error("Reset link is invalid or has expired. Please request a new one.")
        }
      } catch (error) {
        console.error("Token verification error:", error)
        setTokenValid(false)
        setTokenChecked(true)
        toast.error("Failed to verify reset token. Please try again.")
      }
    }

    verifyToken()
  }, [token])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Passwords don't match")
      return
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, password }),
      })

      const data = await response.json()

      if (data.success) {
        toast.success("Password has been reset successfully")
        navigate("/login")
      } else {
        toast.error(data.message || "Failed to reset password")
      }
    } catch (error) {
      console.error("Password reset error:", error)
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!tokenChecked) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-blue-50 dark:bg-blue-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-blue-800 dark:text-blue-200">Verifying reset link...</p>
        </div>
      </div>
    )
  }

  if (!tokenValid) {
    return (
      <section id="reset-password" className="bg-blue-50 dark:bg-blue-950 min-h-screen">
        <div className="mx-auto w-screen container p-4 flex items-center justify-center min-h-screen">
          <div className="bg-white dark:bg-blue-900 p-8 w-full max-w-sm mx-auto rounded-xl shadow-2xl border border-blue-200 dark:border-blue-800">
            <div className="w-20 h-20 mx-auto mb-6">
              <img src={resetIcon || "/placeholder.svg"} alt="reset icon" className="w-full h-full object-contain" />
            </div>

            <h2 className="text-xl font-semibold text-center mt-4 text-blue-900 dark:text-blue-100">
              Invalid Reset Link
            </h2>
            <p className="text-sm text-blue-600 dark:text-blue-400 text-center mt-2 mb-6">
              This password reset link is invalid or has expired.
            </p>

            <div className="text-center">
              <Link
                to="/forgot-password"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full hover:scale-105 transition-all shadow-lg"
              >
                Request New Reset Link
              </Link>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="reset-password" className="bg-blue-50 dark:bg-blue-950 min-h-screen">
      <div className="mx-auto w-screen container p-4 flex items-center justify-center min-h-screen">
        <div className="bg-white dark:bg-blue-900 p-8 w-full max-w-sm mx-auto rounded-xl shadow-2xl border border-blue-200 dark:border-blue-800">
          <div className="w-20 h-20 mx-auto mb-6">
            <img src={resetIcon || "/placeholder.svg"} alt="reset icon" className="w-full h-full object-contain" />
          </div>

          <h2 className="text-xl font-semibold text-center mt-4 text-blue-900 dark:text-blue-100">Reset Password</h2>
          <p className="text-sm text-blue-600 dark:text-blue-400 text-center mt-2 mb-6">
            Create a new password for your account
          </p>

          <form className="pt-2 flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="grid">
              <label className="text-blue-800 dark:text-blue-200 font-medium mb-2">New Password:</label>
              <div className="bg-blue-50 dark:bg-blue-800 p-3 rounded-lg border border-blue-200 dark:border-blue-700">
                <input
                  type="password"
                  placeholder="Enter new password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full h-full outline-none bg-transparent text-blue-900 dark:text-blue-100 placeholder-blue-500 dark:placeholder-blue-400"
                  required
                  minLength={8}
                />
              </div>
              <p className="text-xs text-blue-500 dark:text-blue-400 mt-1">Must be at least 8 characters long</p>
            </div>

            <div className="grid">
              <label className="text-blue-800 dark:text-blue-200 font-medium mb-2">Confirm Password:</label>
              <div className="bg-blue-50 dark:bg-blue-800 p-3 rounded-lg border border-blue-200 dark:border-blue-700">
                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full h-full outline-none bg-transparent text-blue-900 dark:text-blue-100 placeholder-blue-500 dark:placeholder-blue-400"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full hover:scale-105 transition-all mx-auto block mt-4 disabled:bg-blue-400 font-semibold shadow-lg"
            >
              {isSubmitting ? "Resetting..." : "Reset Password"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link to="/login" className="text-blue-600 hover:text-blue-700 hover:underline font-medium">
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ResetPassword
