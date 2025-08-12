"use client"

import { useEffect, useState } from "react"
import moment from "moment"
import displayINRCurrency from "../helpers/displayCurrency"
import { toast } from "react-toastify"

function Order() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchOrderDetails = async () => {
    try {
      setLoading(true)
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/order-list`, {
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
      console.log("Order data received:", responseData)

      if (responseData.success) {
        setData(responseData.data || [])
      } else {
        setError(responseData.message || "Failed to fetch orders")
        toast.error(responseData.message || "Failed to fetch orders")
      }
    } catch (err) {
      console.error("Error fetching orders:", err)
      setError(err.message || "Something went wrong")
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
      <div className="min-h-screen flex justify-center items-center pt-20 bg-blue-50 dark:bg-blue-950">
        <div className="p-4 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-blue-800 dark:text-blue-200">Loading your orders...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center pt-20 bg-blue-50 dark:bg-blue-950">
        <div className="p-4 text-center text-red-500 max-w-md">
          <p className="text-lg mb-4">Error loading orders</p>
          <p>{error}</p>
          <button
            onClick={fetchOrderDetails}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 transition-colors shadow-lg hover:scale-105 duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div className="min-h-screen pt-20 bg-blue-50 dark:bg-blue-950">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold mb-6 text-blue-900 dark:text-blue-100">My Orders</h1>
          <div className="bg-white dark:bg-blue-900 p-8 rounded-xl shadow-lg text-center border border-blue-200 dark:border-blue-800">
            <p className="text-blue-500 dark:text-blue-400 mb-4">You haven't placed any orders yet.</p>
            <a
              href="/"
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors shadow-lg hover:scale-105 duration-300"
            >
              Start Shopping
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 mt-20 bg-blue-50 dark:bg-blue-950 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-blue-900 dark:text-blue-100">My Orders</h1>

      {data.map((item) => (
        <div
          key={item._id}
          className="mb-8 bg-white dark:bg-blue-900 rounded-xl shadow-lg overflow-hidden border border-blue-200 dark:border-blue-800"
        >
          <div className="bg-blue-50 dark:bg-blue-800 p-4 border-b border-blue-200 dark:border-blue-700 flex flex-wrap justify-between items-center">
            <div>
              <p className="text-sm text-blue-600 dark:text-blue-400">Order Placed</p>
              <p className="font-medium text-blue-900 dark:text-blue-100">{moment(item.createdAt).format("LL")}</p>
            </div>
            <div>
              <p className="text-sm text-blue-600 dark:text-blue-400">Order ID</p>
              <p className="font-medium text-blue-900 dark:text-blue-100">{item._id.substring(0, 8)}</p>
            </div>
            <div>
              <p className="text-sm text-blue-600 dark:text-blue-400">Total</p>
              <p className="font-medium text-blue-700 dark:text-blue-300">
                {displayINRCurrency(item.totalAmount || 0)}
              </p>
            </div>
          </div>

          <div className="p-4">
            {Array.isArray(item?.productDetails) &&
              item.productDetails.map((product, index) => (
                <div
                  key={`${product.productId || "product"}-${index}`}
                  className="flex flex-col md:flex-row gap-4 p-4 border-b border-blue-200 dark:border-blue-700 last:border-b-0"
                >
                  <div className="w-28 h-28 flex-shrink-0">
                    <img
                      src={(product.image && product.image[0]) || "/placeholder-image.jpg"}
                      alt={product.name || "Product"}
                      className="w-full h-full object-contain bg-blue-50 dark:bg-blue-800 p-2 rounded-lg border border-blue-200 dark:border-blue-700"
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
              ))}
          </div>

          <div className="bg-blue-50 dark:bg-blue-800 p-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h3 className="font-medium mb-2 text-blue-900 dark:text-blue-100">Payment Details</h3>
              <p className="text-blue-700 dark:text-blue-300">
                Method:{" "}
                {Array.isArray(item.paymentDetails?.payment_method_type)
                  ? item.paymentDetails.payment_method_type[0]
                  : item.paymentDetails?.payment_method_type || "Card"}
              </p>
              <p className="text-blue-700 dark:text-blue-300">
                Status: <span className="capitalize">{item.paymentDetails?.payment_status || "completed"}</span>
              </p>
            </div>

            <div>
              <h3 className="font-medium mb-2 text-blue-900 dark:text-blue-100">Shipping Details</h3>
              <p className="text-blue-700 dark:text-blue-300">
                Shipping Cost: {displayINRCurrency(item.shipping_options?.[0]?.shipping_amount ?? 100)}
              </p>
              {item.shipping_options?.[0]?.shippingAddress && (
                <p className="line-clamp-2 text-blue-700 dark:text-blue-300">
                  Address: {item.shipping_options[0].shippingAddress.line1}
                  {item.shipping_options[0].shippingAddress.city
                    ? `, ${item.shipping_options[0].shippingAddress.city}`
                    : ""}
                  {item.shipping_options[0].shippingAddress.postal_code
                    ? ` ${item.shipping_options[0].shippingAddress.postal_code}`
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

export default Order
