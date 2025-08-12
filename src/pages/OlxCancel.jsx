"use client"

import { useEffect } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { FaTimesCircle } from "react-icons/fa"

const OlxCancel = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const productId = searchParams.get("product_id")

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(productId ? `/olx-marketplace/product/${productId}` : "/olx-marketplace")
    }, 5000)

    return () => clearTimeout(timer)
  }, [navigate, productId])

  return (
    <div className="min-h-screen bg-blue-50 dark:bg-blue-950 pt-24 pb-12 px-4">
      <div className="max-w-lg mx-auto bg-white dark:bg-blue-900 rounded-xl shadow-2xl p-8 text-center border border-blue-200 dark:border-blue-800">
        <div className="text-red-500 dark:text-red-400 text-6xl mb-6">
          <FaTimesCircle className="mx-auto" />
        </div>
        <h1 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-4">Payment Cancelled</h1>
        <p className="text-blue-600 dark:text-blue-400 mb-6">
          Your payment was cancelled. You will be redirected back to the marketplace in a few seconds.
        </p>
        <button
          onClick={() => navigate("/olx-marketplace")}
          className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors shadow-lg hover:scale-105 duration-300"
        >
          Return to Marketplace
        </button>
      </div>
    </div>
  )
}

export default OlxCancel
