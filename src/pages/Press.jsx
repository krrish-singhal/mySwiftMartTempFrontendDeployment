"use client"

import { FaCalendarAlt, FaDownload, FaNewspaper } from "react-icons/fa"

const Press = () => {
  const pressReleases = [
    {
      id: 1,
      title: "Swift Mart Launches Revolutionary Mystery Box Feature",
      date: "December 15, 2024",
      excerpt:
        "Swift Mart introduces an innovative mystery box system that guarantees value for customers while adding excitement to online shopping.",
      category: "Product Launch",
    },
    {
      id: 2,
      title: "Swift Mart Reaches 50,000 Active Users Milestone",
      date: "November 28, 2024",
      excerpt:
        "The e-commerce platform celebrates significant growth with 50,000 active users and 99% customer satisfaction rate.",
      category: "Company News",
    },
    {
      id: 3,
      title: "OLX Marketplace Integration Drives Sustainable Commerce",
      date: "October 20, 2024",
      excerpt:
        "Swift Mart's integrated marketplace for pre-owned goods promotes sustainable shopping and circular economy principles.",
      category: "Sustainability",
    },
    {
      id: 4,
      title: "Swift Mart Expands to 10 New Cities Across India",
      date: "September 10, 2024",
      excerpt:
        "Rapid expansion brings Swift Mart's innovative shopping experience to customers in tier-2 and tier-3 cities.",
      category: "Expansion",
    },
  ]

  const mediaKit = [
    {
      name: "Company Logo Pack",
      description: "High-resolution logos in various formats",
      size: "2.5 MB",
    },
    {
      name: "Brand Guidelines",
      description: "Complete brand identity and usage guidelines",
      size: "5.1 MB",
    },
    {
      name: "Product Screenshots",
      description: "High-quality screenshots of our platform",
      size: "8.3 MB",
    },
    {
      name: "Executive Photos",
      description: "Professional headshots of leadership team",
      size: "3.7 MB",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8 bg-blue-50 dark:bg-blue-950 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 dark:text-blue-100 mb-4">Press & Media</h1>
          <p className="text-lg text-blue-700 dark:text-blue-300 leading-relaxed max-w-3xl mx-auto">
            Stay updated with the latest news, announcements, and media resources from Swift Mart.
          </p>
        </div>

        {/* Press Contact */}
        <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg p-8 mb-12 border border-blue-200 dark:border-blue-800">
          <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-6">Media Contact</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">Press Inquiries</h3>
              <p className="text-blue-700 dark:text-blue-300 mb-1">Email: press@swiftmart.com</p>
              <p className="text-blue-700 dark:text-blue-300 mb-1">Phone: +91 98765 43210</p>
              <p className="text-blue-700 dark:text-blue-300">Response time: Within 24 hours</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">Partnership Inquiries</h3>
              <p className="text-blue-700 dark:text-blue-300 mb-1">Email: partnerships@swiftmart.com</p>
              <p className="text-blue-700 dark:text-blue-300 mb-1">Phone: +91 98765 43211</p>
              <p className="text-blue-700 dark:text-blue-300">Business hours: Mon-Fri, 9 AM - 6 PM IST</p>
            </div>
          </div>
        </div>

        {/* Press Releases */}
        <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg border border-blue-200 dark:border-blue-800 mb-12">
          <div className="p-6 border-b border-blue-200 dark:border-blue-800">
            <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 flex items-center">
              <FaNewspaper className="mr-3" />
              Latest Press Releases
            </h2>
          </div>
          <div className="p-6">
            <div className="space-y-6">
              {pressReleases.map((release) => (
                <div
                  key={release.id}
                  className="border border-blue-200 dark:border-blue-700 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                          {release.category}
                        </span>
                        <div className="flex items-center text-blue-600 dark:text-blue-400 text-sm">
                          <FaCalendarAlt className="mr-1" />
                          {release.date}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-2">{release.title}</h3>
                      <p className="text-blue-600 dark:text-blue-400">{release.excerpt}</p>
                    </div>
                    <button className="lg:ml-6 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 hover:scale-105 transform">
                      Read More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Media Kit */}
        <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg border border-blue-200 dark:border-blue-800">
          <div className="p-6 border-b border-blue-200 dark:border-blue-800">
            <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200">Media Kit</h2>
            <p className="text-blue-600 dark:text-blue-400 mt-2">
              Download our media assets for your stories and articles about Swift Mart.
            </p>
          </div>
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mediaKit.map((item, index) => (
                <div
                  key={index}
                  className="border border-blue-200 dark:border-blue-700 rounded-lg p-4 hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">{item.name}</h4>
                      <p className="text-blue-600 dark:text-blue-400 text-sm mb-2">{item.description}</p>
                      <span className="text-blue-500 dark:text-blue-400 text-xs">{item.size}</span>
                    </div>
                    <button className="ml-4 bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors duration-200 hover:scale-105 transform">
                      <FaDownload />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Company Facts */}
        <div className="mt-12 bg-white dark:bg-blue-900 rounded-xl shadow-lg p-8 border border-blue-200 dark:border-blue-800">
          <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-6 text-center">Quick Facts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <h4 className="text-2xl font-bold text-blue-600 dark:text-blue-400">2020</h4>
              <p className="text-blue-700 dark:text-blue-300">Founded</p>
            </div>
            <div className="text-center">
              <h4 className="text-2xl font-bold text-blue-600 dark:text-blue-400">50K+</h4>
              <p className="text-blue-700 dark:text-blue-300">Active Users</p>
            </div>
            <div className="text-center">
              <h4 className="text-2xl font-bold text-blue-600 dark:text-blue-400">10K+</h4>
              <p className="text-blue-700 dark:text-blue-300">Products</p>
            </div>
            <div className="text-center">
              <h4 className="text-2xl font-bold text-blue-600 dark:text-blue-400">15+</h4>
              <p className="text-blue-700 dark:text-blue-300">Cities</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Press
