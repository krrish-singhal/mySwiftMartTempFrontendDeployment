"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import loginIcons from "../assets/signin.gif"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/forgot-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (data.success) {
        toast.success(data.message)
        setEmailSent(true)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="forgot-password" className="bg-blue-50 dark:bg-blue-950 min-h-screen">
      <div className="mx-auto w-screen container p-4 flex items-center justify-center min-h-screen">
        <div className="bg-white dark:bg-blue-900 p-8 w-full max-w-sm mx-auto rounded-xl shadow-2xl border border-blue-200 dark:border-blue-800">
          <div className="w-20 h-20 mx-auto mb-6">
            <img src={loginIcons || "/placeholder.svg"} alt="login icon" className="w-full h-full object-contain" />
          </div>

          {!emailSent ? (
            <>
              <h2 className="text-xl font-semibold text-center mt-4 text-blue-900 dark:text-blue-100">
                Forgot Password
              </h2>
              <p className="text-sm text-blue-600 dark:text-blue-400 text-center mt-2 mb-6">
                Enter your email address and we'll send you a link to reset your password.
              </p>

              <form className="pt-2 flex flex-col gap-4" onSubmit={handleSubmit}>
                <div className="grid">
                  <label className="text-blue-800 dark:text-blue-200 font-medium mb-2">Email:</label>
                  <div className="bg-blue-50 dark:bg-blue-800 p-3 rounded-lg border border-blue-200 dark:border-blue-700">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full h-full outline-none bg-transparent text-blue-900 dark:text-blue-100 placeholder-blue-500 dark:placeholder-blue-400"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 w-full rounded-full hover:scale-105 transition-all mx-auto block mt-4 disabled:bg-blue-400 font-semibold shadow-lg"
                >
                  {isSubmitting ? "Sending..." : "Reset Password"}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center mt-4">
              <h2 className="text-xl font-semibold text-blue-900 dark:text-blue-100">Email Sent!</h2>
              <p className="text-sm text-blue-600 dark:text-blue-400 mt-2 mb-4">
                Check your email for a link to reset your password. If it doesn't appear within a few minutes, check
                your spam folder.
              </p>
            </div>
          )}

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

export default ForgotPassword
