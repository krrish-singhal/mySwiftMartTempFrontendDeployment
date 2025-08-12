"use client"

import { Link } from "react-router-dom"
import { FaHome, FaShoppingCart, FaBox, FaUser, FaQuestionCircle, FaShieldAlt } from "react-icons/fa"

const Sitemap = () => {
  const siteStructure = [
    {
      category: "Main Pages",
      icon: <FaHome className="text-blue-600 dark:text-blue-400" />,
      pages: [
        { name: "Home", path: "/" },
        { name: "Product Categories", path: "/product-category" },
        { name: "Search Products", path: "/search" },
        { name: "Shopping Cart", path: "/cart" },
        { name: "My Orders", path: "/order" },
      ],
    },
    {
      category: "Special Features",
      icon: <FaBox className="text-blue-600 dark:text-blue-400" />,
      pages: [
        { name: "Mystery Boxes", path: "/mystery-box" },
        { name: "Claim Box", path: "/claim-box" },
        { name: "Prize Gallery", path: "/prize" },
        { name: "OLX Marketplace", path: "/olx-marketplace" },
        { name: "OLX Cart", path: "/olx-cart" },
        { name: "OLX Purchases", path: "/olx-purchases" },
      ],
    },
    {
      category: "Account & Authentication",
      icon: <FaUser className="text-blue-600 dark:text-blue-400" />,
      pages: [
        { name: "Login", path: "/login" },
        { name: "Sign Up", path: "/sign-up" },
        { name: "Forgot Password", path: "/forgot-password" },
        { name: "Reset Password", path: "/reset-password/:token" },
      ],
    },
    {
      category: "Admin Panel",
      icon: <FaShieldAlt className="text-blue-600 dark:text-blue-400" />,
      pages: [
        { name: "Admin Dashboard", path: "/admin-panel" },
        { name: "All Users", path: "/admin-panel/all-users" },
        { name: "All Products", path: "/admin-panel/all-products" },
        { name: "All Orders", path: "/admin-panel/all-orders" },
        { name: "Admin Products", path: "/admin-panel/admin-products" },
      ],
    },
    {
      category: "Company Information",
      icon: <FaQuestionCircle className="text-blue-600 dark:text-blue-400" />,
      pages: [
        { name: "About Us", path: "/about-us" },
        { name: "Careers", path: "/careers" },
        { name: "Press", path: "/press" },
        { name: "Corporate Info", path: "/corporate-info" },
      ],
    },
    {
      category: "Customer Service",
      icon: <FaShoppingCart className="text-blue-600 dark:text-blue-400" />,
      pages: [
        { name: "Contact Us", path: "/contact-us" },
        { name: "Returns", path: "/returns" },
        { name: "FAQ", path: "/faq" },
        { name: "Shipping", path: "/shipping" },
        { name: "Track Order", path: "/track-order" },
      ],
    },
    {
      category: "Legal & Policies",
      icon: <FaShieldAlt className="text-blue-600 dark:text-blue-400" />,
      pages: [
        { name: "Privacy Policy", path: "/privacy-policy" },
        { name: "Terms of Use", path: "/terms-of-use" },
        { name: "Security", path: "/security" },
        { name: "Sitemap", path: "/sitemap" },
      ],
    },
    {
      category: "Success & Status Pages",
      icon: <FaShoppingCart className="text-blue-600 dark:text-blue-400" />,
      pages: [
        { name: "Order Success", path: "/success" },
        { name: "Payment Cancel", path: "/cancel" },
        { name: "OLX Success", path: "/olx-success" },
        { name: "Purchase Success", path: "/olx-purchase-success" },
      ],
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8 bg-blue-50 dark:bg-blue-950 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 dark:text-blue-100 mb-4">Sitemap</h1>
          <p className="text-lg text-blue-700 dark:text-blue-300 leading-relaxed max-w-3xl mx-auto">
            Navigate through all pages and sections of Swift Mart. Find exactly what you're looking for with our
            comprehensive site structure.
          </p>
        </div>

        {/* Site Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {siteStructure.map((section, index) => (
            <div
              key={index}
              className="bg-white dark:bg-blue-900 rounded-xl shadow-lg border border-blue-200 dark:border-blue-800"
            >
              <div className="p-6 border-b border-blue-200 dark:border-blue-800">
                <h2 className="text-xl font-semibold text-blue-800 dark:text-blue-200 flex items-center">
                  <span className="mr-3">{section.icon}</span>
                  {section.category}
                </h2>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {section.pages.map((page, pageIndex) => (
                    <li key={pageIndex}>
                      <Link
                        to={page.path}
                        className="text-blue-700 dark:text-blue-300 hover:text-blue-600 dark:hover:text-blue-200 transition-colors duration-200 hover:underline flex items-center"
                      >
                        <span className="w-2 h-2 bg-blue-400 dark:bg-blue-500 rounded-full mr-3"></span>
                        {page.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-white dark:bg-blue-900 rounded-xl shadow-lg p-8 border border-blue-200 dark:border-blue-800">
          <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-6 text-center">
            Additional Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">Total Pages</h3>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                {siteStructure.reduce((total, section) => total + section.pages.length, 0)}
              </p>
              <p className="text-blue-700 dark:text-blue-300 text-sm mt-1">Available pages</p>
            </div>

            <div className="text-center">
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">Categories</h3>
              <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">{siteStructure.length}</p>
              <p className="text-blue-700 dark:text-blue-300 text-sm mt-1">Main sections</p>
            </div>

            <div className="text-center">
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">Last Updated</h3>
              <p className="text-lg font-semibold text-blue-600 dark:text-blue-400">Dec 2024</p>
              <p className="text-blue-700 dark:text-blue-300 text-sm mt-1">Sitemap version</p>
            </div>
          </div>
        </div>

        {/* Search Help */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-4">
            Can't find what you're looking for?
          </h3>
          <p className="text-blue-700 dark:text-blue-300 mb-6">
            Use our search function or contact our support team for assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/search"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 hover:scale-105 transform shadow-lg"
            >
              Search Products
            </Link>
            <Link
              to="/contact-us"
              className="bg-white dark:bg-blue-800 border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-700 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 hover:scale-105 transform"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sitemap
