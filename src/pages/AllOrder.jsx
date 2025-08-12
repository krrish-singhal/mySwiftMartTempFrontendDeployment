"use client"

import { useEffect, useState } from "react"
import moment from "moment"
import displayINRCurrency from "../helpers/displayCurrency"
import { toast } from "react-toastify"

const AllOrder = () => {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchOrderDetails = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/all-orders`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const responseData = await response.json()

      if (responseData.success) {
        setOrders(responseData.data || [])
      } else {
        setError(responseData.message || "Failed to fetch orders")
        toast.error(responseData.message || "Failed to fetch orders")
      }
    } catch (error) {
      console.error("Fetch Error:", error)
      setError(error.message || "Something went wrong")
      toast.error("Failed to load orders. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrderDetails()
  }, [])

  if (loading) {
    return (
      <div className="h-[calc(100vh-190px)] flex justify-center items-center bg-blue-50 dark:bg-blue-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg font-medium text-blue-800 dark:text-blue-200">Loading orders...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="h-[calc(100vh-190px)] flex justify-center items-center bg-blue-50 dark:bg-blue-950">
        <div className="text-center text-red-500 max-w-md">
          <p className="text-lg font-medium mb-2">Error loading orders</p>
          <p>{error}</p>
          <button
            onClick={fetchOrderDetails}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="h-[calc(100vh-190px)] flex justify-center items-center bg-blue-50 dark:bg-blue-950">
        <div className="text-center">
          <p className="text-lg font-medium text-blue-800 dark:text-blue-200">No Orders Available</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-[calc(100vh-190px)] overflow-y-auto scrollbar-none p-4 bg-blue-50 dark:bg-blue-950">
      <h2 className="text-xl font-bold mb-6 text-blue-900 dark:text-blue-100">All Customer Orders</h2>

      {orders.map((order) => (
        <div
          key={order._id}
          className="mb-6 bg-white dark:bg-blue-900 rounded-xl shadow-lg overflow-hidden border border-blue-200 dark:border-blue-800"
        >
          <div className="bg-blue-50 dark:bg-blue-800 p-4 border-b border-blue-200 dark:border-blue-700 flex flex-wrap justify-between items-center gap-3">
            <div>
              <p className="text-sm text-blue-600 dark:text-blue-400">Order Date</p>
              <p className="font-medium text-blue-900 dark:text-blue-100">{moment(order.createdAt).format("LL")}</p>
            </div>
            <div>
              <p className="text-sm text-blue-600 dark:text-blue-400">Customer</p>
              <p className="font-medium text-blue-900 dark:text-blue-100">{order.email || "Unknown"}</p>
            </div>
            <div>
              <p className="text-sm text-blue-600 dark:text-blue-400">Order ID</p>
              <p className="font-medium text-blue-900 dark:text-blue-100">{order._id.substring(0, 8)}</p>
            </div>
            <div>
              <p className="text-sm text-blue-600 dark:text-blue-400">Amount</p>
              <p className="font-medium text-blue-700 dark:text-blue-300">{displayINRCurrency(order.totalAmount)}</p>
            </div>
          </div>

          <div className="p-4">
            {Array.isArray(order.productDetails) && order.productDetails.length > 0 ? (
              order.productDetails.map((product, idx) => (
                <div
                  key={`${product.productId || "product"}-${idx}`}
                  className="flex flex-col md:flex-row gap-4 p-4 border-b border-blue-200 dark:border-blue-700 last:border-b-0"
                >
                  <div className="w-28 h-28 flex-shrink-0">
                    <img
                      src={(product.image && product.image[0]) || "/placeholder-image.jpg"}
                      alt={product.name || "Product"}
                      className="w-full h-full object-contain bg-blue-50 dark:bg-blue-800 p-2 rounded-lg"
                    />
                  </div>

                  <div className="flex-1">
                    <h3 className="font-medium text-lg line-clamp-1 text-blue-900 dark:text-blue-100">
                      {product.name || "Product Name"}
                    </h3>
                    <div className="mt-2 flex flex-wrap gap-x-8 gap-y-2 text-sm">
                      <p className="text-blue-700 dark:text-blue-300">
                        Price: <span className="font-medium">{displayINRCurrency(product.price || 0)}</span>
                      </p>
                      <p className="text-blue-700 dark:text-blue-300">
                        Quantity: <span className="font-medium">{product.quantity || 0}</span>
                      </p>
                      <p className="text-blue-700 dark:text-blue-300">
                        Subtotal:{" "}
                        <span className="font-medium">{displayINRCurrency(product.price * product.quantity || 0)}</span>
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="py-3 text-center text-blue-500 dark:text-blue-400">No product details available</p>
            )}
          </div>

          <div className="bg-blue-50 dark:bg-blue-800 p-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-medium mb-2 text-blue-900 dark:text-blue-100">Payment Details</h3>
              <p className="text-blue-700 dark:text-blue-300">
                Method:{" "}
                {Array.isArray(order.paymentDetails?.payment_method_type)
                  ? order.paymentDetails.payment_method_type[0]
                  : order.paymentDetails?.payment_method_type || "Card"}
              </p>
              <p className="text-blue-700 dark:text-blue-300">
                Status: <span className="capitalize">{order.paymentDetails?.payment_status || "completed"}</span>
              </p>
              <p className="text-blue-700 dark:text-blue-300">
                Payment ID:{" "}
                <span className="text-xs">{order.paymentDetails?.paymentId?.substring(0, 12) || "N/A"}</span>
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-2 text-blue-900 dark:text-blue-100">Shipping Details</h3>
              <p className="text-blue-700 dark:text-blue-300">
                Shipping Cost: {displayINRCurrency(order.shipping_options?.[0]?.shipping_amount ?? 100)}
              </p>
              {order.shipping_options?.[0]?.shippingAddress && (
                <p className="line-clamp-2 text-blue-700 dark:text-blue-300">
                  Address: {order.shipping_options[0].shippingAddress.line1}
                  {order.shipping_options[0].shippingAddress.city
                    ? `, ${order.shipping_options[0].shippingAddress.city}`
                    : ""}
                  {order.shipping_options[0].shippingAddress.postal_code
                    ? ` ${order.shipping_options[0].shippingAddress.postal_code}`
                    : ""}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default AllOrder
