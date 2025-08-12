"use client"

import { useState } from "react"
import { FaSearch, FaChevronDown, FaChevronUp } from "react-icons/fa"

const HelpCenter = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [openFaq, setOpenFaq] = useState(null)

  const faqData = [
    {
      id: 1,
      question: "How do I place an order?",
      answer:
        "To place an order, browse our products, add items to your cart, and proceed to checkout. You'll need to provide shipping information and payment details to complete your purchase.",
    },
    {
      id: 2,
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards, debit cards, UPI, net banking, and digital wallets. All payments are processed securely through our encrypted payment gateway.",
    },
    {
      id: 3,
      question: "How do Mystery Boxes work?",
      answer:
        "Mystery Boxes contain surprise items worth more than the box price. Choose from Basic (₹500), Premium (₹1000), or Ultimate (₹2000) boxes. Each box guarantees items worth the specified value range.",
    },
    {
      id: 4,
      question: "What is the OLX Marketplace?",
      answer:
        "Our OLX Marketplace allows users to buy and sell pre-owned items. Sellers can list their products for admin approval, and buyers can purchase approved items securely.",
    },
    {
      id: 5,
      question: "How can I track my order?",
      answer:
        "After placing an order, you'll receive a tracking number via email. You can also check your order status in the 'My Orders' section of your account.",
    },
    {
      id: 6,
      question: "What is your return policy?",
      answer:
        "We offer a 30-day return policy for most items. Products must be in original condition with tags attached. Some items like personalized products may not be eligible for returns.",
    },
    {
      id: 7,
      question: "How long does shipping take?",
      answer:
        "Standard shipping takes 3-7 business days. Express shipping is available for 1-3 business days. Shipping times may vary based on your location and product availability.",
    },
    {
      id: 8,
      question: "How do I contact customer support?",
      answer:
        "You can reach our customer support team via email at support@swiftmart.com, phone at +91 98765 43210, or through our contact form. We're available Monday-Friday 9 AM-6 PM.",
    },
  ]

  const filteredFaqs = faqData.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id)
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-blue-50 dark:bg-blue-950 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 dark:text-blue-100 mb-4">Help Center</h1>
          <p className="text-lg text-blue-700 dark:text-blue-300">
            Find answers to frequently asked questions and get the help you need.
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 dark:text-blue-400" />
            <input
              type="text"
              placeholder="Search for help..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-lg border border-blue-300 dark:border-blue-700 bg-white dark:bg-blue-900 text-blue-900 dark:text-blue-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            />
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg p-6 text-center border border-blue-200 dark:border-blue-800 hover:shadow-xl transition-shadow duration-200">
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">Order Issues</h3>
            <p className="text-blue-600 dark:text-blue-400 text-sm">Problems with your order, shipping, or delivery</p>
          </div>
          <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg p-6 text-center border border-blue-200 dark:border-blue-800 hover:shadow-xl transition-shadow duration-200">
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">Account Help</h3>
            <p className="text-blue-600 dark:text-blue-400 text-sm">Login issues, password reset, account settings</p>
          </div>
          <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg p-6 text-center border border-blue-200 dark:border-blue-800 hover:shadow-xl transition-shadow duration-200">
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">Payment Help</h3>
            <p className="text-blue-600 dark:text-blue-400 text-sm">Payment methods, refunds, billing questions</p>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg border border-blue-200 dark:border-blue-800">
          <div className="p-6 border-b border-blue-200 dark:border-blue-800">
            <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200">Frequently Asked Questions</h2>
          </div>

          <div className="p-6">
            {filteredFaqs.length === 0 ? (
              <p className="text-center text-blue-600 dark:text-blue-400 py-8">
                No results found for "{searchTerm}". Try different keywords.
              </p>
            ) : (
              <div className="space-y-4">
                {filteredFaqs.map((faq) => (
                  <div key={faq.id} className="border border-blue-200 dark:border-blue-700 rounded-lg">
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-blue-50 dark:hover:bg-blue-800 transition-colors duration-200 rounded-lg"
                    >
                      <span className="font-medium text-blue-800 dark:text-blue-200">{faq.question}</span>
                      {openFaq === faq.id ? (
                        <FaChevronUp className="text-blue-600 dark:text-blue-400" />
                      ) : (
                        <FaChevronDown className="text-blue-600 dark:text-blue-400" />
                      )}
                    </button>
                    {openFaq === faq.id && (
                      <div className="px-6 pb-4">
                        <p className="text-blue-700 dark:text-blue-300 leading-relaxed">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Contact Support */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-4">Still need help?</h3>
          <p className="text-blue-700 dark:text-blue-300 mb-6">
            Our support team is here to help you with any questions or concerns.
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

export default HelpCenter
