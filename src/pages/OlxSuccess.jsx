"use client"

import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { FaCheckCircle, FaShoppingCart, FaArrowLeft, FaTrash } from "react-icons/fa"

const OlxSuccess = () => {
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const isListing = queryParams.get("type") === "listing"
  const productId = queryParams.get("productId")

  const [showRemoveOption, setShowRemoveOption] = useState(false)

  useEffect(() => {
    if (!isListing && productId) {
      // Show option to remove purchased item from cart
      setShowRemoveOption(true)
    }
  }, [isListing, productId])

  const removeFromCart = () => {
    try {
      const savedCart = localStorage.getItem("olxCart")
      if (savedCart) {
        const cart = JSON.parse(savedCart)
        const updatedCart = cart.filter((item) => item._id !== productId)
        localStorage.setItem("olxCart", JSON.stringify(updatedCart))

        // Update cart count
        if (window.updateOlxCartCount) {
          window.updateOlxCartCount(updatedCart.length)
        }

        // Dispatch custom event for cart update
        window.dispatchEvent(new CustomEvent("cartUpdated"))

        setShowRemoveOption(false)
      }
    } catch (error) {
      console.error("Error removing item from cart:", error)
    }
  }

  return (
    <div className="container mx-auto p-4 max-w-2xl bg-blue-50 dark:bg-blue-950 min-h-screen flex items-center justify-center">
      <div className="bg-white dark:bg-blue-900 rounded-xl shadow-2xl p-8 text-center border border-blue-200 dark:border-blue-800 w-full">
        <div className="flex justify-center mb-6">
          <FaCheckCircle className="text-green-500 dark:text-green-400 text-6xl" />
        </div>

        <h1 className="text-2xl font-bold mb-4 text-blue-900 dark:text-blue-100">
          {isListing ? "Product Listed Successfully!" : "Purchase Successful!"}
        </h1>

        <p className="text-blue-600 dark:text-blue-400 mb-8">
          {isListing
            ? "Your product has been listed and is awaiting admin approval. You will be notified once it is approved."
            : "Thank you for your purchase! The seller has been notified and will contact you soon regarding shipping details."}
        </p>

        {/* Remove from cart option for purchases */}
        {showRemoveOption && (
          <div className="mb-6 p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg border border-yellow-200 dark:border-yellow-700">
            <p className="text-yellow-800 dark:text-yellow-200 mb-3">
              Would you like to remove this item from your cart since you've purchased it?
            </p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={removeFromCart}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center gap-2 transition-colors"
              >
                <FaTrash size={12} />
                Remove from Cart
              </button>
              <button
                onClick={() => setShowRemoveOption(false)}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                Keep in Cart
              </button>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
            to="/olx-marketplace"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2 transition-colors shadow-lg hover:scale-105 duration-300"
          >
            <FaArrowLeft size={12} />
            Back to Marketplace
          </Link>

          {!isListing && (
            <Link
              to="/olx-purchases"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2 transition-colors shadow-lg hover:scale-105 duration-300"
            >
              <FaShoppingCart size={12} />
              View My Purchases
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

export default OlxSuccess
