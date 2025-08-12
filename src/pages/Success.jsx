"use client"

import { useEffect, useContext } from "react"
import { Link, useLocation } from "react-router-dom"
import { toast } from "react-toastify"
import Context from "../context"
import { FaCheckCircle, FaShoppingBag, FaArrowLeft } from "react-icons/fa"

const Success = () => {
  const location = useLocation()
  const context = useContext(Context)
  const queryParams = new URLSearchParams(location.search)
  const isPaymentSuccess = queryParams.get("payment") === "success"

  useEffect(() => {
    if (isPaymentSuccess) {
      toast.success("Payment successful! Your order has been placed.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      })

      if (context && context.fetchUserAddToCart) {
        context.fetchUserAddToCart()
      }
    }
  }, [isPaymentSuccess, context])

  return (
    <div className="container mx-auto p-4 max-w-2xl mt-20 bg-blue-50 dark:bg-blue-950 min-h-screen flex items-center justify-center">
      <div className="bg-white dark:bg-blue-900 rounded-xl shadow-2xl p-8 text-center border border-blue-200 dark:border-blue-800 w-full">
        <div className="flex justify-center mb-6">
          <FaCheckCircle className="text-green-500 dark:text-green-400 text-6xl" />
        </div>

        <h1 className="text-2xl font-bold mb-4 text-blue-900 dark:text-blue-100">Order Successful!</h1>

        <p className="text-blue-600 dark:text-blue-400 mb-8">
          Thank you for your purchase! Your order has been placed successfully and will be processed soon.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 transition-colors shadow-lg hover:scale-105 duration-300"
          >
            <FaArrowLeft size={12} />
            Continue Shopping
          </Link>

          <Link
            to="/order"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2 transition-colors shadow-lg hover:scale-105 duration-300"
          >
            <FaShoppingBag size={12} />
            View My Orders
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Success
