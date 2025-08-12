"use client"

import { useState } from "react"
import { FaSearch, FaBox, FaTruck, FaCheckCircle } from "react-icons/fa"

const TrackOrder = () => {
  const [orderId, setOrderId] = useState("")
  const [orderData, setOrderData] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleTrackOrder = async (e) => {
    e.preventDefault()
    if (!orderId.trim()) return

    setLoading(true)
    // Simulate API call
    setTimeout(() => {
      setOrderData({
        orderId: orderId,
        status: "In Transit",
        estimatedDelivery: "Dec 25, 2024",
        trackingSteps: [
          { step: "Order Placed", completed: true, date: "Dec 20, 2024" },
          { step: "Order Confirmed", completed: true, date: "Dec 20, 2024" },
          { step: "Shipped", completed: true, date: "Dec 21, 2024" },
          { step: "In Transit", completed: true, date: "Dec 22, 2024" },
          { step: "Out for Delivery", completed: false, date: "" },
          { step: "Delivered", completed: false, date: "" },
        ],
      })
      setLoading(false)
    }, 1000)
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-blue-50 dark:bg-blue-950 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 dark:text-blue-100 mb-4">Track Your Order</h1>
          <p className="text-lg text-blue-700 dark:text-blue-300">
            Enter your order ID to get real-time updates on your shipment.
          </p>
        </div>

        {/* Search Form */}
        <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg p-8 mb-8 border border-blue-200 dark:border-blue-800">
          <form onSubmit={handleTrackOrder} className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Enter your order ID (e.g., ORD123456)"
                className="w-full px-4 py-3 rounded-lg border border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-800 text-blue-900 dark:text-blue-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-200 hover:scale-105 transform shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <FaSearch />
                  Track Order
                </>
              )}
            </button>
          </form>
        </div>

        {/* Order Tracking Results */}
        {orderData && (
          <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg border border-blue-200 dark:border-blue-800">
            {/* Order Info */}
            <div className="p-6 border-b border-blue-200 dark:border-blue-800">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-200">Order #{orderData.orderId}</h2>
                  <p className="text-blue-600 dark:text-blue-400">
                    Status: <span className="font-medium">{orderData.status}</span>
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-blue-700 dark:text-blue-300">Estimated Delivery</p>
                  <p className="text-lg font-semibold text-blue-800 dark:text-blue-200">
                    {orderData.estimatedDelivery}
                  </p>
                </div>
              </div>
            </div>

            {/* Tracking Steps */}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-6">Tracking Progress</h3>

              <div className="space-y-6">
                {orderData.trackingSteps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          step.completed
                            ? "bg-green-500 text-white"
                            : "bg-blue-200 dark:bg-blue-700 text-blue-600 dark:text-blue-400"
                        }`}
                      >
                        {step.step === "Order Placed" && <FaBox />}
                        {step.step === "Order Confirmed" && <FaCheckCircle />}
                        {step.step === "Shipped" && <FaTruck />}
                        {step.step === "In Transit" && <FaTruck />}
                        {step.step === "Out for Delivery" && <FaTruck />}
                        {step.step === "Delivered" && <FaCheckCircle />}
                      </div>
                      {index < orderData.trackingSteps.length - 1 && (
                        <div
                          className={`w-0.5 h-8 mt-2 ${
                            step.completed ? "bg-green-500" : "bg-blue-200 dark:bg-blue-700"
                          }`}
                        ></div>
                      )}
                    </div>

                    <div className="flex-1">
                      <h4
                        className={`font-medium ${
                          step.completed ? "text-blue-800 dark:text-blue-200" : "text-blue-600 dark:text-blue-400"
                        }`}
                      >
                        {step.step}
                      </h4>
                      {step.date && <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">{step.date}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-4">Need Help?</h3>
          <p className="text-blue-700 dark:text-blue-300 mb-6">
            If you have any questions about your order, our support team is here to help.
          </p>
          <a
            href="/contact-us"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 hover:scale-105 transform shadow-lg"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  )
}

export default TrackOrder
