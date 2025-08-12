"use client"

import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "react-toastify"
import { FaRupeeSign, FaShoppingCart, FaEye, FaClock } from "react-icons/fa"

const ProductCard = ({ product, refreshProducts, addToCart, showOwnerControls = false }) => {
  const [loading, setLoading] = useState(false)

  const handleBuyProduct = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/olx/purchase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ productId: product._id }),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || "Failed to process purchase")
      }
      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error("Payment URL not received")
      }
    } catch (error) {
      console.error("Purchase error:", error)
      toast.error(error.message, {
        position: "top-center",
      })
    } finally {
      setLoading(false)
    }
  }

  const handleAddToCart = () => {
    if (addToCart) {
      addToCart(product)
      toast.success("Added to cart", {
        position: "top-center",
      })
    }
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-IN", { year: "numeric", month: "short", day: "numeric" })
  }

  const discountPercentage = () => {
    if (!product.worthPrice || !product.sellingPrice) return 0
    const discount = ((product.worthPrice - product.sellingPrice) / product.worthPrice) * 100
    return Math.round(discount)
  }

  const isOwner = showOwnerControls

  return (
    <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-blue-200 dark:border-blue-800">
      <div className="relative h-48 overflow-hidden">
        {product.images && product.images.length > 0 ? (
          <img
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center">
            <span className="text-blue-500 dark:text-blue-300">No image</span>
          </div>
        )}

        <div className="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full capitalize font-medium">
          {product.category}
        </div>

        {product.status === "pending" && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
            <FaClock size={10} /> Pending
          </div>
        )}

        {product.status === "approved" && discountPercentage() > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
            {discountPercentage()}% OFF
          </div>
        )}

        {product.isSold && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-bold text-xl">SOLD</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 truncate text-blue-900 dark:text-blue-100">{product.name}</h3>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center text-blue-700 dark:text-blue-200 font-bold">
            <FaRupeeSign className="mr-1" size={14} /> {product.sellingPrice}
          </div>
          <div className="text-sm text-blue-400 dark:text-blue-500 line-through">₹{product.worthPrice}</div>
        </div>
        <p className="text-sm text-blue-600 dark:text-blue-300 mb-3 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center">
          <div className="text-xs text-blue-500 dark:text-blue-400">Listed: {formatDate(product.createdAt)}</div>
          <div className="flex gap-2">
            <Link
              to={`/olx-marketplace/product/${product._id}`}
              className="px-2 py-1 rounded text-sm bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-700 flex items-center gap-1 transition-colors"
            >
              <FaEye size={12} /> Details
            </Link>

            {product.status === "approved" && !product.isSold && !isOwner && (
              <button
                onClick={handleAddToCart}
                className="px-2 py-1 rounded text-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors"
              >
                Cart
              </button>
            )}

            {product.status === "approved" && !product.isSold && !isOwner ? (
              <button
                onClick={handleBuyProduct}
                disabled={loading}
                className="px-3 py-1 rounded text-sm flex items-center gap-1 bg-green-600 text-white hover:bg-green-700 transition-colors"
              >
                {loading ? (
                  "Processing..."
                ) : (
                  <>
                    <FaShoppingCart size={12} /> Buy Now
                  </>
                )}
              </button>
            ) : product.status === "pending" ? (
              <span className="px-3 py-1 rounded text-sm bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200">
                Awaiting Approval
              </span>
            ) : product.isSold ? (
              <span className="px-3 py-1 rounded text-sm bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                Sold Out
              </span>
            ) : (
              isOwner && (
                <span className="px-3 py-1 rounded text-sm bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200">
                  Your Listing
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
