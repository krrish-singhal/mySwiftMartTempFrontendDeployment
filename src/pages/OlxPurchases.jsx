"use client"

import { useState, useEffect } from "react"
import { toast } from "react-toastify"
import { FaShoppingBag, FaArrowLeft, FaCalendarAlt, FaUser, FaTag, FaRupeeSign } from "react-icons/fa"
import { Link } from "react-router-dom"

const OlxPurchases = () => {
  const [purchases, setPurchases] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        setLoading(true)
        console.log("🔍 Fetching purchases from frontend...")

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/olx/my-purchases`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        })

        console.log("📡 Response status:", response.status)
        console.log("📡 Response headers:", response.headers)

        if (!response.ok) {
          const errorText = await response.text()
          console.error("❌ Error response:", errorText)
          throw new Error(`HTTP ${response.status}: ${errorText}`)
        }

        const data = await response.json()
        console.log("✅ Purchases data received:", data)
        console.log("📦 Number of purchases:", data.purchases?.length || 0)

        setPurchases(data.purchases || [])
      } catch (error) {
        console.error("❌ Error fetching purchases:", error)
        toast.error(`Failed to load purchases: ${error.message}`)
      } finally {
        setLoading(false)
      }
    }

    fetchPurchases()
  }, [])

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }
    return new Date(dateString).toLocaleDateString(undefined, options)
  }

  const formatCurrency = (amount) => {
    return Number(amount).toLocaleString()
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
          <FaShoppingBag className="text-blue-600 dark:text-blue-400" />
          <h1 className="text-2xl font-bold text-blue-900 dark:text-blue-100">My Purchases ({purchases.length})</h1>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-blue-500 dark:text-blue-400">Loading your purchases...</p>
          </div>
        ) : purchases.length === 0 ? (
          <div className="text-center py-8">
            <FaShoppingBag className="mx-auto text-6xl text-blue-300 dark:text-blue-600 mb-4" />
            <p className="text-blue-500 dark:text-blue-400 mb-4 text-lg">You haven't made any purchases yet</p>
            <p className="text-blue-400 dark:text-blue-500 mb-6">Start shopping to see your purchase history here!</p>
            <Link
              to="/olx-marketplace"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:scale-105 duration-300"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {purchases.map((purchase) => (
              <div
                key={purchase._id}
                className="border border-blue-200 dark:border-blue-700 rounded-lg p-6 bg-blue-50 dark:bg-blue-800"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Product Image */}
                  <div className="lg:w-1/4">
                    {purchase.product?.images && purchase.product.images.length > 0 ? (
                      <img
                        src={purchase.product.images[0] || "/placeholder.svg?height=200&width=200"}
                        alt={purchase.product.name}
                        className="w-full h-48 lg:h-32 object-cover rounded-lg border border-blue-200 dark:border-blue-700 shadow-sm"
                      />
                    ) : (
                      <div className="w-full h-48 lg:h-32 bg-blue-100 dark:bg-blue-700 rounded-lg flex items-center justify-center border border-blue-200 dark:border-blue-600">
                        <span className="text-blue-500 dark:text-blue-400">No image</span>
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="lg:w-3/4">
                    <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-xl text-blue-900 dark:text-blue-100 mb-2">
                          {purchase.product?.name || "Product"}
                        </h3>
                        <div className="flex items-center gap-2 mb-2">
                          <FaRupeeSign className="text-green-600 dark:text-green-400" />
                          <span className="text-lg font-bold text-green-600 dark:text-green-400">
                            ₹{formatCurrency(purchase.amount)}
                          </span>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-sm text-blue-500 dark:text-blue-400 mb-1">Order ID</div>
                        <div className="font-mono text-sm text-blue-700 dark:text-blue-300 bg-blue-100 dark:bg-blue-700 px-2 py-1 rounded">
                          {purchase._id.slice(-8).toUpperCase()}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <FaCalendarAlt className="text-blue-500 dark:text-blue-400" />
                          <span className="text-sm text-blue-600 dark:text-blue-400">
                            <span className="font-medium">Purchase Date:</span>
                          </span>
                        </div>
                        <div className="text-sm text-blue-900 dark:text-blue-100 ml-6">
                          {formatDate(purchase.createdAt)}
                        </div>

                        <div className="flex items-center gap-2">
                          <FaTag className="text-blue-500 dark:text-blue-400" />
                          <span className="text-sm text-blue-600 dark:text-blue-400">
                            <span className="font-medium">Category:</span>
                          </span>
                        </div>
                        <div className="text-sm text-blue-900 dark:text-blue-100 ml-6 capitalize">
                          {purchase.product?.category || "N/A"}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <FaUser className="text-blue-500 dark:text-blue-400" />
                          <span className="text-sm text-blue-600 dark:text-blue-400">
                            <span className="font-medium">Seller:</span>
                          </span>
                        </div>
                        <div className="text-sm text-blue-900 dark:text-blue-100 ml-6">
                          {purchase.seller?.name || "Unknown"}
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-sm text-blue-600 dark:text-blue-400">
                            <span className="font-medium">Payment Status:</span>
                          </span>
                        </div>
                        <div className="ml-6">
                          <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-full">
                            Completed
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Seller Contact Note */}
                    <div className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg border border-yellow-200 dark:border-yellow-700">
                      <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        <span className="font-medium">📞 Seller Contact:</span> The seller has been notified of your
                        purchase and will contact you soon with shipping details and delivery arrangements.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default OlxPurchases
