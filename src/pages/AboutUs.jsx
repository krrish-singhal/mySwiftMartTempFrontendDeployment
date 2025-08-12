"use client"

import { FaShoppingCart, FaUsers, FaAward, FaGlobe, FaRocket, FaHeart } from "react-icons/fa"

const AboutUs = () => {
  return (
    <div className="container mx-auto px-4 py-8 bg-blue-50 dark:bg-blue-950 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 dark:text-blue-100 mb-4">About Swift Mart</h1>
          <p className="text-lg text-blue-700 dark:text-blue-300 leading-relaxed max-w-3xl mx-auto">
            Your trusted partner in online shopping, bringing you quality products, exciting mystery boxes, and
            innovative marketplace experiences all in one place.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg p-8 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center mb-4">
              <FaRocket className="text-3xl text-blue-600 dark:text-blue-400 mr-4" />
              <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200">Our Mission</h2>
            </div>
            <p className="text-blue-700 dark:text-blue-300 leading-relaxed">
              To revolutionize the online shopping experience by providing a seamless, secure, and enjoyable platform
              where customers can discover quality products, exciting mystery boxes, and unique marketplace deals.
            </p>
          </div>

          <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg p-8 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center mb-4">
              <FaHeart className="text-3xl text-blue-600 dark:text-blue-400 mr-4" />
              <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200">Our Vision</h2>
            </div>
            <p className="text-blue-700 dark:text-blue-300 leading-relaxed">
              To become the most trusted and innovative e-commerce platform, connecting millions of customers with
              quality products while fostering a community of satisfied shoppers and sellers.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg p-6 text-center border border-blue-200 dark:border-blue-800 hover:shadow-xl transition-shadow duration-300">
            <FaUsers className="text-4xl text-blue-600 dark:text-blue-400 mx-auto mb-3" />
            <h3 className="text-3xl font-bold text-blue-800 dark:text-blue-200">50K+</h3>
            <p className="text-blue-600 dark:text-blue-400">Happy Customers</p>
          </div>
          <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg p-6 text-center border border-blue-200 dark:border-blue-800 hover:shadow-xl transition-shadow duration-300">
            <FaShoppingCart className="text-4xl text-blue-600 dark:text-blue-400 mx-auto mb-3" />
            <h3 className="text-3xl font-bold text-blue-800 dark:text-blue-200">10K+</h3>
            <p className="text-blue-600 dark:text-blue-400">Products</p>
          </div>
          <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg p-6 text-center border border-blue-200 dark:border-blue-800 hover:shadow-xl transition-shadow duration-300">
            <FaAward className="text-4xl text-blue-600 dark:text-blue-400 mx-auto mb-3" />
            <h3 className="text-3xl font-bold text-blue-800 dark:text-blue-200">99%</h3>
            <p className="text-blue-600 dark:text-blue-400">Satisfaction Rate</p>
          </div>
          <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg p-6 text-center border border-blue-200 dark:border-blue-800 hover:shadow-xl transition-shadow duration-300">
            <FaGlobe className="text-4xl text-blue-600 dark:text-blue-400 mx-auto mb-3" />
            <h3 className="text-3xl font-bold text-blue-800 dark:text-blue-200">24/7</h3>
            <p className="text-blue-600 dark:text-blue-400">Support</p>
          </div>
        </div>

        {/* Our Story */}
        <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg p-8 mb-12 border border-blue-200 dark:border-blue-800">
          <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-6">Our Story</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <p className="text-blue-700 dark:text-blue-300 leading-relaxed mb-4">
                Founded in 2020, Swift Mart began as a small startup with a big dream: to create an e-commerce platform
                that goes beyond traditional online shopping. We wanted to bring excitement, trust, and innovation to
                every customer interaction.
              </p>
              <p className="text-blue-700 dark:text-blue-300 leading-relaxed">
                Today, we've grown into a comprehensive platform offering everything from everyday essentials to
                thrilling mystery boxes and a vibrant marketplace for pre-owned goods. Our journey is driven by our
                commitment to customer satisfaction and continuous innovation.
              </p>
            </div>
            <div className="bg-blue-50 dark:bg-blue-800 rounded-lg p-6">
              <img
                src="/placeholder.svg?height=300&width=400"
                alt="Swift Mart Team"
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          </div>
        </div>

        {/* What Makes Us Special */}
        <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg p-8 border border-blue-200 dark:border-blue-800">
          <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-8 text-center">
            What Makes Us Special
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🎁</span>
              </div>
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">Mystery Boxes</h3>
              <p className="text-blue-600 dark:text-blue-400 text-sm">
                Experience the thrill of surprise with our curated mystery boxes containing valuable items worth more
                than you pay.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛒</span>
              </div>
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">OLX Marketplace</h3>
              <p className="text-blue-600 dark:text-blue-400 text-sm">
                Buy and sell pre-owned items in our integrated marketplace with secure transactions and admin approval.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">Secure Payments</h3>
              <p className="text-blue-600 dark:text-blue-400 text-sm">
                Shop with confidence using our secure payment gateway with multiple payment options and fraud
                protection.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚚</span>
              </div>
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">Fast Delivery</h3>
              <p className="text-blue-600 dark:text-blue-400 text-sm">
                Get your orders delivered quickly with our efficient logistics network and real-time tracking.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">24/7 Support</h3>
              <p className="text-blue-600 dark:text-blue-400 text-sm">
                Our dedicated customer support team is always ready to help you with any questions or concerns.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">Quality Assurance</h3>
              <p className="text-blue-600 dark:text-blue-400 text-sm">
                Every product goes through our quality check process to ensure you receive only the best items.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs
