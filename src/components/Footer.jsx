"use client"
import { Link } from "react-router-dom"
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaShoppingCart,
  FaBox,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
} from "react-icons/fa"

const Footer = () => {
  return (
    <footer className="w-screen bg-blue-50 dark:bg-[#101624] text-black dark:text-white border-t border-blue-200 dark:border-blue-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 text-sm">
        {/* Company Info */}
        <div className="lg:col-span-1">
          <div className="flex items-center mb-4">
            <FaShoppingCart className="text-2xl text-blue-600 dark:text-blue-400 mr-2" />
            <h2 className="text-xl font-bold text-blue-800 dark:text-blue-200">Swift Mart</h2>
          </div>
          <p className="text-sm text-blue-700 dark:text-blue-300 mb-4 leading-relaxed">
            Your one-stop destination for quality products, mystery boxes, and marketplace deals. Experience seamless shopping with Swift Mart.
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center text-blue-600 dark:text-blue-400">
              <FaMapMarkerAlt className="mr-2" />
              <span>123 Commerce Street, Tech City</span>
            </div>
            <div className="flex items-center text-blue-600 dark:text-blue-400">
              <FaPhone className="mr-2" />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center text-blue-600 dark:text-blue-400">
              <FaEnvelope className="mr-2" />
              <span>support@swiftmart.com</span>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-blue-700 dark:text-blue-300">About Swift Mart</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/about-us" className="hover:underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/careers" className="hover:underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Careers
              </Link>
            </li>
            <li>
              <Link to="/press" className="hover:underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Press
              </Link>
            </li>
            <li>
              <Link to="/corporate-info" className="hover:underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Corporate Info
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Service Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-blue-700 dark:text-blue-300">Customer Service</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/contact-us" className="hover:underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/returns" className="hover:underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Returns
              </Link>
            </li>
            <li>
              <Link to="/faq" className="hover:underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/shipping" className="hover:underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Shipping
              </Link>
            </li>
            <li>
              <Link to="/track-order" className="hover:underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Track Order
              </Link>
            </li>
          </ul>
        </div>

        {/* Policies Section */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-blue-700 dark:text-blue-300">Policies</h2>
          <ul className="space-y-2">
            <li>
              <Link to="/privacy-policy" className="hover:underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms-of-use" className="hover:underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Terms of Use
              </Link>
            </li>
            <li>
              <Link to="/security" className="hover:underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Security
              </Link>
            </li>
            <li>
              <Link to="/sitemap" className="hover:underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Sitemap
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Media & Credit */}
        <div>
          <h2 className="text-lg font-semibold mb-4 text-blue-700 dark:text-blue-300">Connect with Us</h2>
          <div className="flex space-x-3 mb-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-8 h-8 bg-blue-600 dark:bg-blue-700 text-white rounded-full flex items-center justify-center hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-200 hover:scale-110 transform"
            >
              <FaFacebookF className="text-sm" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="w-8 h-8 bg-blue-400 dark:bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-500 dark:hover:bg-blue-400 transition-colors duration-200 hover:scale-110 transform"
            >
              <FaTwitter className="text-sm" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-full flex items-center justify-center hover:from-purple-600 hover:to-pink-600 transition-all duration-200 hover:scale-110 transform"
            >
              <FaInstagram className="text-sm" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="w-8 h-8 bg-blue-700 dark:bg-blue-800 text-white rounded-full flex items-center justify-center hover:bg-blue-800 dark:hover:bg-blue-700 transition-colors duration-200 hover:scale-110 transform"
            >
              <FaLinkedinIn className="text-sm" />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-8 h-8 bg-red-600 dark:bg-red-700 text-white rounded-full flex items-center justify-center hover:bg-red-700 dark:hover:bg-red-600 transition-colors duration-200 hover:scale-110 transform"
            >
              <FaYoutube className="text-sm" />
            </a>
          </div>
          <p className="text-xs text-gray-600 dark:text-gray-400">
            Made with ❤️ by <span className="font-semibold">Swift Mart Team</span>
          </p>
        </div>
      </div>

      {/* Bottom copyright */}
      <div className="border-t border-blue-100 dark:border-blue-900 py-4 text-center text-xs text-gray-600 dark:text-gray-400 px-6">
        © {new Date().getFullYear()} Swift Mart. All rights reserved.
      </div>
    </footer>
  )
}

export default Footer
