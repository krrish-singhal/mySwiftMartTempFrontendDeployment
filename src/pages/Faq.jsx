"use client"

import { useState } from "react"
import { FaSearch, FaChevronDown, FaChevronUp, FaQuestionCircle } from "react-icons/fa"

const FAQ = () => {
  const [searchTerm, setSearchTerm] = useState("")
  const [openFaq, setOpenFaq] = useState(null)
  const [selectedCategory, setSelectedCategory] = useState("all")

  const faqCategories = [
    { id: "all", name: "All Questions" },
    { id: "orders", name: "Orders & Shipping" },
    { id: "payments", name: "Payments & Refunds" },
    { id: "mystery", name: "Mystery Boxes" },
    { id: "olx", name: "OLX Marketplace" },
    { id: "account", name: "Account & Profile" },
  ]

  const faqData = [
    {
      id: 1,
      category: "orders",
      question: "How do I place an order?",
      answer:
        "To place an order, browse our products, add items to your cart, and proceed to checkout. You'll need to provide shipping information and payment details to complete your purchase. Once confirmed, you'll receive an order confirmation email with tracking details.",
    },
    {
      id: 2,
      category: "payments",
      question: "What payment methods do you accept?",
      answer:
        "We accept all major credit cards (Visa, MasterCard, American Express), debit cards, UPI, net banking, and digital wallets like Paytm, PhonePe, and Google Pay. All payments are processed securely through our encrypted payment gateway with SSL protection.",
    },
    {
      id: 3,
      category: "mystery",
      question: "How do Mystery Boxes work?",
      answer:
        "Mystery Boxes contain surprise items worth more than the box price. Choose from Basic (₹500), Premium (₹1000), or Ultimate (₹2000) boxes. Each box guarantees items worth the specified value range. Once you purchase and claim your box, you'll receive a random high-value item from our curated selection.",
    },
    {
      id: 4,
      category: "olx",
      question: "What is the OLX Marketplace?",
      answer:
        "Our OLX Marketplace allows users to buy and sell pre-owned items. Sellers can list their products for admin approval, and buyers can purchase approved items securely. All transactions are protected, and we ensure quality control through our approval process.",
    },
    {
      id: 5,
      category: "orders",
      question: "How can I track my order?",
      answer:
        "After placing an order, you'll receive a tracking number via email and SMS. You can also check your order status in the 'My Orders' section of your account or use our Track Order page by entering your order ID.",
    },
    {
      id: 6,
      category: "payments",
      question: "What is your refund policy?",
      answer:
        "We offer a 30-day return policy for most items. Products must be in original condition with tags attached. Refunds are processed within 5-7 business days after we receive the returned item. Some items like personalized products may not be eligible for returns.",
    },
    {
      id: 7,
      category: "orders",
      question: "How long does shipping take?",
      answer:
        "Standard shipping takes 3-7 business days within India. Express shipping is available for 1-3 business days at additional cost. Shipping times may vary based on your location and product availability. Remote areas may take longer.",
    },
    {
      id: 8,
      category: "account",
      question: "How do I create an account?",
      answer:
        "Click on 'Sign Up' in the top right corner, enter your email, create a password, and verify your email address. You can also sign up using your Google or Facebook account for faster registration.",
    },
    {
      id: 9,
      category: "mystery",
      question: "Can I return Mystery Box items?",
      answer:
        "Mystery Box items are generally non-returnable unless they are defective or damaged. This is because the surprise element is part of the mystery box experience. However, if you receive a damaged item, please contact our support team immediately.",
    },
    {
      id: 10,
      category: "olx",
      question: "How do I sell items on OLX Marketplace?",
      answer:
        "To sell on our OLX Marketplace, create an account, go to the marketplace section, and click 'List Item'. Fill in product details, upload photos, set your price, and submit for admin approval. Once approved, your item will be visible to buyers.",
    },
    {
      id: 11,
      category: "account",
      question: "I forgot my password. How do I reset it?",
      answer:
        "Click on 'Forgot Password' on the login page, enter your email address, and we'll send you a password reset link. Follow the instructions in the email to create a new password. The reset link is valid for 24 hours.",
    },
    {
      id: 12,
      category: "payments",
      question: "Is my payment information secure?",
      answer:
        "Yes, absolutely. We use industry-standard SSL encryption and PCI DSS compliant payment processors. We never store your complete card details on our servers. All transactions are processed through secure, encrypted channels.",
    },
  ]

  const filteredFaqs = faqData.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleFaq = (id) => {
    setOpenFaq(openFaq === id ? null : id)
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-blue-50 dark:bg-blue-950 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center justify-center">
            <FaQuestionCircle className="mr-3" />
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-blue-700 dark:text-blue-300">
            Find answers to common questions about Swift Mart. Can't find what you're looking for? Contact our support
            team.
          </p>
        </div>

        {/* Search */}
        <div className="mb-8">
          <div className="relative">
            <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 dark:text-blue-400" />
            <input
              type="text"
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-lg border border-blue-300 dark:border-blue-700 bg-white dark:bg-blue-900 text-blue-900 dark:text-blue-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {faqCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === category.id
                    ? "bg-blue-600 text-white"
                    : "bg-white dark:bg-blue-900 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700 hover:bg-blue-100 dark:hover:bg-blue-800"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ List */}
        <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg border border-blue-200 dark:border-blue-800">
          <div className="p-6">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-12">
                <FaQuestionCircle className="text-6xl text-blue-300 dark:text-blue-700 mx-auto mb-4" />
                <p className="text-blue-600 dark:text-blue-400 text-lg mb-2">No results found</p>
                <p className="text-blue-500 dark:text-blue-500">Try different keywords or browse all categories</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFaqs.map((faq) => (
                  <div key={faq.id} className="border border-blue-200 dark:border-blue-700 rounded-lg">
                    <button
                      onClick={() => toggleFaq(faq.id)}
                      className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-blue-50 dark:hover:bg-blue-800 transition-colors duration-200 rounded-lg"
                    >
                      <span className="font-medium text-blue-800 dark:text-blue-200 pr-4">{faq.question}</span>
                      {openFaq === faq.id ? (
                        <FaChevronUp className="text-blue-600 dark:text-blue-400 flex-shrink-0" />
                      ) : (
                        <FaChevronDown className="text-blue-600 dark:text-blue-400 flex-shrink-0" />
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
        <div className="mt-12 bg-white dark:bg-blue-900 rounded-xl shadow-lg p-8 text-center border border-blue-200 dark:border-blue-800">
          <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-4">Still have questions?</h3>
          <p className="text-blue-700 dark:text-blue-300 mb-6">
            Our support team is here to help you with any questions or concerns you may have.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact-us"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 hover:scale-105 transform shadow-lg"
            >
              Contact Support
            </a>
            <a
              href="mailto:support@swiftmart.com"
              className="bg-white dark:bg-blue-800 border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-700 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 hover:scale-105 transform"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FAQ
