"use client"

import { FaTruck, FaClock, FaMapMarkerAlt, FaBox, FaShippingFast, FaGlobe } from "react-icons/fa"

const Shipping = () => {
  const shippingOptions = [
    {
      name: "Standard Shipping",
      duration: "3-7 Business Days",
      cost: "Free on orders above ₹499",
      description: "Regular delivery for most locations across India",
      icon: <FaTruck className="text-3xl text-blue-600 dark:text-blue-400" />,
    },
    {
      name: "Express Shipping",
      duration: "1-3 Business Days",
      cost: "₹99 - ₹199",
      description: "Faster delivery for urgent orders",
      icon: <FaShippingFast className="text-3xl text-blue-600 dark:text-blue-400" />,
    },
    {
      name: "Same Day Delivery",
      duration: "Within 24 Hours",
      cost: "₹299",
      description: "Available in select metro cities",
      icon: <FaClock className="text-3xl text-blue-600 dark:text-blue-400" />,
    },
  ]

  const deliveryZones = [
    {
      zone: "Metro Cities",
      cities: "Mumbai, Delhi, Bangalore, Chennai, Kolkata, Hyderabad, Pune",
      duration: "1-3 days",
      sameDay: true,
    },
    {
      zone: "Tier 1 Cities",
      cities: "Ahmedabad, Jaipur, Lucknow, Kanpur, Nagpur, Indore, Bhopal",
      duration: "2-4 days",
      sameDay: false,
    },
    {
      zone: "Tier 2 Cities",
      cities: "Coimbatore, Kochi, Chandigarh, Guwahati, Dehradun",
      duration: "3-5 days",
      sameDay: false,
    },
    {
      zone: "Remote Areas",
      cities: "Hill stations, remote villages, and other locations",
      duration: "5-7 days",
      sameDay: false,
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8 bg-blue-50 dark:bg-blue-950 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 dark:text-blue-100 mb-4">Shipping Information</h1>
          <p className="text-lg text-blue-700 dark:text-blue-300 leading-relaxed max-w-3xl mx-auto">
            We deliver across India with multiple shipping options to suit your needs. Fast, reliable, and secure
            delivery is our priority.
          </p>
        </div>

        {/* Shipping Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {shippingOptions.map((option, index) => (
            <div
              key={index}
              className="bg-white dark:bg-blue-900 rounded-xl shadow-lg p-6 border border-blue-200 dark:border-blue-800 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-center mb-4">{option.icon}</div>
              <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 text-center mb-2">{option.name}</h3>
              <div className="text-center mb-4">
                <p className="text-blue-600 dark:text-blue-400 font-medium">{option.duration}</p>
                <p className="text-blue-700 dark:text-blue-300 font-semibold">{option.cost}</p>
              </div>
              <p className="text-blue-600 dark:text-blue-400 text-sm text-center">{option.description}</p>
            </div>
          ))}
        </div>

        {/* Delivery Coverage */}
        <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg p-8 mb-12 border border-blue-200 dark:border-blue-800">
          <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-8 text-center flex items-center justify-center">
            <FaGlobe className="mr-3" />
            Delivery Coverage
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {deliveryZones.map((zone, index) => (
              <div key={index} className="border border-blue-200 dark:border-blue-700 rounded-lg p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200">{zone.zone}</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-blue-600 dark:text-blue-400 font-medium">{zone.duration}</span>
                    {zone.sameDay && (
                      <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-2 py-1 rounded-full text-xs font-medium">
                        Same Day Available
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-blue-700 dark:text-blue-300 text-sm">{zone.cities}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Process */}
        <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg p-8 mb-12 border border-blue-200 dark:border-blue-800">
          <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-8 text-center">
            How Shipping Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">1</span>
              </div>
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Order Placed</h4>
              <p className="text-blue-600 dark:text-blue-400 text-sm">
                Your order is confirmed and payment is processed securely.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">2</span>
              </div>
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Processing</h4>
              <p className="text-blue-600 dark:text-blue-400 text-sm">
                We prepare your order and pack it securely for shipping.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">3</span>
              </div>
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Shipped</h4>
              <p className="text-blue-600 dark:text-blue-400 text-sm">
                Your order is dispatched with tracking information sent to you.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">4</span>
              </div>
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Delivered</h4>
              <p className="text-blue-600 dark:text-blue-400 text-sm">
                Your order arrives at your doorstep safely and on time.
              </p>
            </div>
          </div>
        </div>

        {/* Shipping Policies */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg p-8 border border-blue-200 dark:border-blue-800">
            <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-6 flex items-center">
              <FaBox className="mr-3" />
              Packaging & Handling
            </h3>
            <ul className="space-y-3 text-blue-700 dark:text-blue-300">
              <li>• All items are carefully packed to prevent damage</li>
              <li>• Fragile items receive extra protective packaging</li>
              <li>• Eco-friendly packaging materials when possible</li>
              <li>• Discreet packaging for privacy</li>
              <li>• Order confirmation and invoice included</li>
            </ul>
          </div>

          <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg p-8 border border-blue-200 dark:border-blue-800">
            <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-6 flex items-center">
              <FaMapMarkerAlt className="mr-3" />
              Delivery Information
            </h3>
            <ul className="space-y-3 text-blue-700 dark:text-blue-300">
              <li>• Signature required for high-value items</li>
              <li>• Multiple delivery attempts if you're not available</li>
              <li>• Safe drop-off options in secure locations</li>
              <li>• SMS and email notifications for delivery updates</li>
              <li>• Contact delivery partner directly if needed</li>
            </ul>
          </div>
        </div>

        {/* Important Notes */}
        <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg p-8 border border-blue-200 dark:border-blue-800">
          <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-6">
            Important Shipping Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">Processing Time</h4>
              <ul className="space-y-2 text-blue-700 dark:text-blue-300 text-sm">
                <li>• Standard items: 1-2 business days</li>
                <li>• Custom/personalized items: 3-5 business days</li>
                <li>• Mystery boxes: Same day processing</li>
                <li>• OLX marketplace items: Varies by seller</li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">Shipping Restrictions</h4>
              <ul className="space-y-2 text-blue-700 dark:text-blue-300 text-sm">
                <li>• Some items may have shipping restrictions</li>
                <li>• Hazardous materials cannot be shipped</li>
                <li>• International shipping not available currently</li>
                <li>• PO Box addresses may have limitations</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-800 rounded-lg">
            <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Holiday Shipping</h4>
            <p className="text-blue-700 dark:text-blue-300 text-sm">
              During peak seasons and holidays, shipping times may be extended. We recommend placing orders early to
              ensure timely delivery. Check our website for holiday shipping deadlines and special offers.
            </p>
          </div>
        </div>

        {/* Contact for Shipping */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-4">Questions about shipping?</h3>
          <p className="text-blue-700 dark:text-blue-300 mb-6">
            Our customer service team is here to help with any shipping-related questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact-us"
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 hover:scale-105 transform shadow-lg"
            >
              Contact Support
            </a>
            <a
              href="/track-order"
              className="bg-white dark:bg-blue-800 border border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-700 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 hover:scale-105 transform"
            >
              Track Your Order
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shipping
