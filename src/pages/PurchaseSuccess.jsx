"use client"

import { useEffect } from "react"
import { Link } from "react-router-dom"
import { FaCheckCircle, FaShoppingBag, FaArrowLeft } from "react-icons/fa"

const PurchaseSuccess = () => {
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const productId = urlParams.get("productId")

    if (productId) {
      try {
        const savedCart = localStorage.getItem("olxCart")
        if (savedCart) {
          const cart = JSON.parse(savedCart)
          const updatedCart = cart.filter((item) => item._id !== productId)
          localStorage.setItem("olxCart", JSON.stringify(updatedCart))

          if (window.updateOlxCartCount) {
            window.updateOlxCartCount(updatedCart.length)
          }
        }
      } catch (error) {
        console.error("Error updating cart:", error)
      }
    }
  }, [])

  return (
    <div className="container mx-auto p-4 max-w-2xl bg-blue-50 dark:bg-blue-950 min-h-screen flex items-center justify-center">
      <div className="bg-white dark:bg-blue-900 rounded-xl shadow-2xl p-8 text-center border border-blue-200 dark:border-blue-800 w-full">
        <div className="flex justify-center mb-6">
          <FaCheckCircle className="text-green-500 dark:text-green-400 text-6xl" />
        </div>

        <h1 className="text-2xl font-bold mb-4 text-blue-900 dark:text-blue-100">Purchase Successful!</h1>

        <p className="text-blue-600 dark:text-blue-400 mb-8">
          Thank you for your purchase! The seller has been notified and will contact you soon regarding shipping
          details.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/olx-marketplace"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 transition-colors shadow-lg hover:scale-105 duration-300"
          >
            <FaArrowLeft size={12} />
            Back to Marketplace
          </Link>

          <Link
            to="/olx-purchases"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2 transition-colors shadow-lg hover:scale-105 duration-300"
          >
            <FaShoppingBag size={12} />
            View My Purchases
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PurchaseSuccess
