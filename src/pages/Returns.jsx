"use client"

import { useState } from "react"
import { FaBox, FaUndo, FaClock, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa"

const Returns = () => {
  const [returnForm, setReturnForm] = useState({
    orderId: "",
    reason: "",
    description: "",
  })

  const handleInputChange = (e) => {
    setReturnForm({
      ...returnForm,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle return request submission
    console.log("Return request submitted:", returnForm)
  }

  const returnReasons = [
    "Defective/Damaged product",
    "Wrong item received",
    "Size/fit issues",
    "Not as described",
    "Changed mind",
    "Quality issues",
    "Other",
  ]

  return (
    <div className="container mx-auto px-4 py-8 bg-blue-50 dark:bg-blue-950 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 dark:text-blue-100 mb-4">Returns & Refunds</h1>
          <p className="text-lg text-blue-700 dark:text-blue-300 leading-relaxed max-w-3xl mx-auto">
            We want you to be completely satisfied with your purchase. If you're not happy, we're here to help with our
            easy return process.
          </p>
        </div>

        {/* Return Policy Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg p-6 text-center border border-blue-200 dark:border-blue-800">
            <FaClock className="text-4xl text-blue-600 dark:text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-2">30-Day Window</h3>
            <p className="text-blue-600 dark:text-blue-400">
              Return items within 30 days of delivery for a full refund or exchange.
            </p>
          </div>
          <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg p-6 text-center border border-blue-200 dark:border-blue-800">
            <FaBox className="text-4xl text-blue-600 dark:text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-2">Original Condition</h3>
            <p className="text-blue-600 dark:text-blue-400">
              Items must be unused, in original packaging with all tags attached.
            </p>
          </div>
          <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg p-6 text-center border border-blue-200 dark:border-blue-800">
            <FaUndo className="text-4xl text-blue-600 dark:text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-2">Free Returns</h3>
            <p className="text-blue-600 dark:text-blue-400">
              We provide free return shipping for defective or wrong items.
            </p>
          </div>
        </div>

        {/* Return Process */}
        <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg p-8 mb-12 border border-blue-200 dark:border-blue-800">
          <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-8 text-center">
            How to Return an Item
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">1</span>
              </div>
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Initiate Return</h4>
              <p className="text-blue-600 dark:text-blue-400 text-sm">
                Fill out the return form below or contact customer service.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">2</span>
              </div>
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Get Return Label</h4>
              <p className="text-blue-600 dark:text-blue-400 text-sm">
                We'll email you a prepaid return shipping label.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">3</span>
              </div>
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Pack & Ship</h4>
              <p className="text-blue-600 dark:text-blue-400 text-sm">
                Pack the item securely and drop it off at any courier location.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">4</span>
              </div>
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Get Refund</h4>
              <p className="text-blue-600 dark:text-blue-400 text-sm">
                Receive your refund within 5-7 business days after we receive the item.
              </p>
            </div>
          </div>
        </div>

        {/* Return Form */}
        <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg border border-blue-200 dark:border-blue-800 mb-12">
          <div className="p-6 border-b border-blue-200 dark:border-blue-800">
            <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200">Request a Return</h2>
            <p className="text-blue-600 dark:text-blue-400 mt-2">
              Fill out this form to start your return process. We'll get back to you within 24 hours.
            </p>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-blue-800 dark:text-blue-200 font-medium mb-2">Order ID *</label>
                <input
                  type="text"
                  name="orderId"
                  value={returnForm.orderId}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-800 text-blue-900 dark:text-blue-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  placeholder="Enter your order ID (e.g., ORD123456)"
                />
              </div>

              <div>
                <label className="block text-blue-800 dark:text-blue-200 font-medium mb-2">Reason for Return *</label>
                <select
                  name="reason"
                  value={returnForm.reason}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-800 text-blue-900 dark:text-blue-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                >
                  <option value="">Select a reason</option>
                  {returnReasons.map((reason, index) => (
                    <option key={index} value={reason}>
                      {reason}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-blue-800 dark:text-blue-200 font-medium mb-2">Description</label>
                <textarea
                  name="description"
                  value={returnForm.description}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-800 text-blue-900 dark:text-blue-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 resize-none"
                  placeholder="Please provide additional details about your return request..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 hover:scale-105 transform shadow-lg"
              >
                Submit Return Request
              </button>
            </form>
          </div>
        </div>

        {/* Return Policy Details */}
        <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg p-8 border border-blue-200 dark:border-blue-800">
          <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-6">Return Policy Details</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4 flex items-center">
                <FaCheckCircle className="text-green-500 mr-2" />
                Returnable Items
              </h3>
              <ul className="space-y-2 text-blue-700 dark:text-blue-300">
                <li>• Clothing and accessories (with tags attached)</li>
                <li>• Electronics (in original packaging)</li>
                <li>• Home and garden items</li>
                <li>• Books and media</li>
                <li>• Sports and outdoor equipment</li>
                <li>• Beauty products (unopened)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4 flex items-center">
                <FaExclamationTriangle className="text-yellow-500 mr-2" />
                Non-Returnable Items
              </h3>
              <ul className="space-y-2 text-blue-700 dark:text-blue-300">
                <li>• Personalized or customized items</li>
                <li>• Perishable goods</li>
                <li>• Intimate or sanitary goods</li>
                <li>• Digital downloads</li>
                <li>• Gift cards</li>
                <li>• Items damaged by misuse</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-800 rounded-lg">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Important Notes:</h4>
            <ul className="space-y-1 text-blue-700 dark:text-blue-300 text-sm">
              <li>• Refunds will be processed to the original payment method</li>
              <li>• Return shipping is free for defective or wrong items</li>
              <li>• Customer pays return shipping for change of mind returns</li>
              <li>• Mystery box items are non-returnable unless defective</li>
              <li>• OLX marketplace items follow seller-specific return policies</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Returns
