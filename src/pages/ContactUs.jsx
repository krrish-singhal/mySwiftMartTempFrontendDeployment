"use client"

import { useState } from "react"
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from "react-icons/fa"
import { toast } from "react-toastify"

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle form submission here
    toast.success("Message sent successfully! We'll get back to you soon.")
    setFormData({ name: "", email: "", subject: "", message: "" })
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-blue-50 dark:bg-blue-950 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 dark:text-blue-100 mb-4">Contact Us</h1>
          <p className="text-lg text-blue-700 dark:text-blue-300">
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-6">Get in Touch</h2>

            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 dark:bg-blue-700 p-3 rounded-full">
                  <FaMapMarkerAlt className="text-white text-lg" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-800 dark:text-blue-200">Address</h3>
                  <p className="text-blue-700 dark:text-blue-300">
                    123 Commerce Street
                    <br />
                    Tech City, TC 12345
                    <br />
                    India
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 dark:bg-blue-700 p-3 rounded-full">
                  <FaPhone className="text-white text-lg" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-800 dark:text-blue-200">Phone</h3>
                  <p className="text-blue-700 dark:text-blue-300">+91 98765 43210</p>
                  <p className="text-blue-700 dark:text-blue-300">+91 98765 43211</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 dark:bg-blue-700 p-3 rounded-full">
                  <FaEnvelope className="text-white text-lg" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-800 dark:text-blue-200">Email</h3>
                  <p className="text-blue-700 dark:text-blue-300">support@swiftmart.com</p>
                  <p className="text-blue-700 dark:text-blue-300">info@swiftmart.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="bg-blue-600 dark:bg-blue-700 p-3 rounded-full">
                  <FaClock className="text-white text-lg" />
                </div>
                <div>
                  <h3 className="font-semibold text-blue-800 dark:text-blue-200">Business Hours</h3>
                  <p className="text-blue-700 dark:text-blue-300">Monday - Friday: 9:00 AM - 6:00 PM</p>
                  <p className="text-blue-700 dark:text-blue-300">Saturday: 10:00 AM - 4:00 PM</p>
                  <p className="text-blue-700 dark:text-blue-300">Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg p-8 border border-blue-200 dark:border-blue-800">
            <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-6">Send us a Message</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-blue-800 dark:text-blue-200 font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-800 text-blue-900 dark:text-blue-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  placeholder="Your full name"
                />
              </div>

              <div>
                <label className="block text-blue-800 dark:text-blue-200 font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-800 text-blue-900 dark:text-blue-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-blue-800 dark:text-blue-200 font-medium mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-800 text-blue-900 dark:text-blue-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  placeholder="What is this about?"
                />
              </div>

              <div>
                <label className="block text-blue-800 dark:text-blue-200 font-medium mb-2">Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-800 text-blue-900 dark:text-blue-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 resize-none"
                  placeholder="Tell us how we can help you..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 hover:scale-105 transform shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactUs
