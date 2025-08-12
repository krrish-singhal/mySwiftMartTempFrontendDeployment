"use client"

import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { FaShoppingCart, FaTrash, FaArrowLeft } from "react-icons/fa"
import { Link } from "react-router-dom"

const OlxCart = () => {
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(false)

  // Load cart from localStorage
  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem("olxCart")
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart)
          setCart(parsedCart)
        }
      } catch (error) {
        console.error("Error loading cart:", error)
        localStorage.removeItem("olxCart")
        setCart([])
      }
    }

    loadCart()

    // Listen for cart updates
    const handleCartUpdate = () => {
      loadCart()
    }

    window.addEventListener("cartUpdated", handleCartUpdate)
    return () => window.removeEventListener("cartUpdated", handleCartUpdate)
  }, [])

  const removeFromCart = (productId) => {
    try {
      const updatedCart = cart.filter((item) => item._id !== productId)
      setCart(updatedCart)
      localStorage.setItem("olxCart", JSON.stringify(updatedCart))

      // Dispatch event for other components
      window.dispatchEvent(new CustomEvent("cartUpdated"))

      toast.success("Item removed from cart")
    } catch (error) {
      console.error("Error removing from cart:", error)
      toast.error("Failed to remove item")
    }
  }

  const handleCheckout = async (product) => {
    try {
      setLoading(true)

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/olx/purchase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          productId: product._id,
        }),
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
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + Number(item.sellingPrice || 0), 0)
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl bg-blue-50 dark:bg-blue-950 min-h-screen">
      <div className="flex items-center gap-2 mb-6">
        <Link
          to="/olx-marketplace"
          className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
        >
          <FaArrowLeft size={12} />
          Back to Marketplace
        </Link>
      </div>

      <div className="bg-white dark:bg-blue-900 rounded-xl shadow-2xl p-6 border border-blue-200 dark:border-blue-800">
        <div className="flex items-center gap-2 mb-6">
          <FaShoppingCart className="text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl font-bold text-blue-900 dark:text-blue-100">
            Your Cart ({cart.length} {cart.length === 1 ? "item" : "items"})
          </h1>
        </div>

        {cart.length === 0 ? (
          <div className="text-center py-8">
            <FaShoppingCart className="mx-auto text-6xl text-blue-300 dark:text-blue-600 mb-4" />
            <p className="text-blue-500 dark:text-blue-400 mb-4 text-lg">Your cart is empty</p>
            <p className="text-blue-400 dark:text-blue-500 mb-6">Add some products to get started!</p>
            <Link
              to="/olx-marketplace"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:scale-105 duration-300"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <>
            <div className="divide-y divide-blue-200 dark:divide-blue-700">
              {cart.map((product) => (
                <div key={product._id} className="py-6 flex flex-col md:flex-row gap-4">
                  <div className="md:w-1/4">
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0] || "/placeholder.svg?height=128&width=128"}
                        alt={product.name}
                        className="w-full h-32 object-cover rounded-lg border border-blue-200 dark:border-blue-700 shadow-sm"
                      />
                    ) : (
                      <div className="w-full h-32 bg-blue-100 dark:bg-blue-800 rounded-lg flex items-center justify-center border border-blue-200 dark:border-blue-700">
                        <span className="text-blue-500 dark:text-blue-400">No image</span>
                      </div>
                    )}
                  </div>

                  <div className="md:w-2/4">
                    <h3 className="font-semibold text-lg text-blue-900 dark:text-blue-100 mb-2">{product.name}</h3>
                    <p className="text-sm text-blue-600 dark:text-blue-400 mb-2 capitalize">
                      <span className="font-medium">Category:</span> {product.category}
                    </p>
                    <p className="text-sm text-blue-700 dark:text-blue-300 line-clamp-3">{product.description}</p>
                  </div>

                  <div className="md:w-1/4 flex flex-col items-end justify-between">
                    <div className="text-xl font-bold text-blue-700 dark:text-blue-300 mb-4">
                      ₹{Number(product.sellingPrice).toLocaleString()}
                    </div>

                    <div className="flex gap-2 w-full md:w-auto">
                      <button
                        onClick={() => removeFromCart(product._id)}
                        className="flex-1 md:flex-none px-3 py-2 bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-400 rounded hover:bg-red-200 dark:hover:bg-red-800 transition-colors flex items-center justify-center gap-2"
                        title="Remove from cart"
                      >
                        <FaTrash size={14} />
                        <span className="md:hidden">Remove</span>
                      </button>

                      <button
                        onClick={() => handleCheckout(product)}
                        disabled={loading}
                        className="flex-1 md:flex-none px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors shadow-lg hover:scale-105 duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {loading ? "Processing...Just Wait " : "Buy Now"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t border-blue-200 dark:border-blue-700">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold text-lg text-blue-900 dark:text-blue-100">
                  Total ({cart.length} {cart.length === 1 ? "item" : "items"}):
                </span>
                <span className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                  ₹{calculateTotal().toLocaleString()}
                </span>
              </div>

              <div className="text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-800 p-3 rounded-lg">
                <p className="font-medium mb-1">Important Notes:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>Each item will be purchased individually from its respective seller</li>
                  <li>Shipping details will be provided by individual sellers</li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default OlxCart
