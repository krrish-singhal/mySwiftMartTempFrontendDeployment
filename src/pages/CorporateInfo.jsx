"use client"

import { FaBuilding, FaUsers, FaGlobe, FaAward, FaHandshake, FaLeaf } from "react-icons/fa"

const CorporateInfo = () => {
  const leadership = [
    {
      name: "Rajesh Kumar",
      position: "Chief Executive Officer",
      bio: "Rajesh brings over 15 years of experience in e-commerce and technology leadership.",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Priya Sharma",
      position: "Chief Technology Officer",
      bio: "Priya leads our technology vision with expertise in scalable systems and innovation.",
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      name: "Amit Patel",
      position: "Chief Operating Officer",
      bio: "Amit oversees operations and ensures seamless customer experiences across all touchpoints.",
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

  const milestones = [
    { year: "2020", event: "Swift Mart founded with a vision to revolutionize e-commerce" },
    { year: "2021", event: "Launched our first 1,000 products and reached 5,000 customers" },
    { year: "2022", event: "Introduced Mystery Box feature and expanded to 5 cities" },
    { year: "2023", event: "Launched OLX Marketplace integration and reached 25,000 users" },
    { year: "2024", event: "Achieved 50,000+ active users and expanded to 15 cities" },
  ]

  return (
    <div className="container mx-auto px-4 py-8 bg-blue-50 dark:bg-blue-950 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 dark:text-blue-100 mb-4">Corporate Information</h1>
          <p className="text-lg text-blue-700 dark:text-blue-300 leading-relaxed max-w-3xl mx-auto">
            Learn more about Swift Mart's corporate structure, leadership, and commitment to excellence in e-commerce.
          </p>
        </div>

        {/* Company Overview */}
        <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg p-8 mb-12 border border-blue-200 dark:border-blue-800">
          <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-6">Company Overview</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">Legal Information</h3>
              <div className="space-y-2 text-blue-700 dark:text-blue-300">
                <p>
                  <strong>Company Name:</strong> Swift Mart Technologies Private Limited
                </p>
                <p>
                  <strong>Incorporation Date:</strong> January 15, 2020
                </p>
                <p>
                  <strong>CIN:</strong> U74999KA2020PTC123456
                </p>
                <p>
                  <strong>Registration Number:</strong> 123456
                </p>
                <p>
                  <strong>GST Number:</strong> 29ABCDE1234F1Z5
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">Registered Office</h3>
              <div className="text-blue-700 dark:text-blue-300">
                <p>Swift Mart Technologies Pvt. Ltd.</p>
                <p>123 Commerce Street, Tech Park</p>
                <p>Bangalore, Karnataka - 560001</p>
                <p>India</p>
                <p className="mt-2">
                  <strong>Phone:</strong> +91 98765 43210
                </p>
                <p>
                  <strong>Email:</strong> corporate@swiftmart.com
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Leadership Team */}
        <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg p-8 mb-12 border border-blue-200 dark:border-blue-800">
          <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-8 text-center">Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((leader, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden border-4 border-blue-200 dark:border-blue-700">
                  <img
                    src={leader.image || "/placeholder.svg"}
                    alt={leader.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-1">{leader.name}</h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">{leader.position}</p>
                <p className="text-blue-700 dark:text-blue-300 text-sm">{leader.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Corporate Values */}
        <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg p-8 mb-12 border border-blue-200 dark:border-blue-800">
          <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="text-center">
              <FaUsers className="text-4xl text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">Customer First</h3>
              <p className="text-blue-600 dark:text-blue-400 text-sm">
                Every decision we make is centered around delivering exceptional customer experiences.
              </p>
            </div>
            <div className="text-center">
              <FaHandshake className="text-4xl text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">Integrity</h3>
              <p className="text-blue-600 dark:text-blue-400 text-sm">
                We conduct business with honesty, transparency, and ethical practices in all our operations.
              </p>
            </div>
            <div className="text-center">
              <FaAward className="text-4xl text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">Excellence</h3>
              <p className="text-blue-600 dark:text-blue-400 text-sm">
                We strive for excellence in everything we do, continuously improving our products and services.
              </p>
            </div>
            <div className="text-center">
              <FaGlobe className="text-4xl text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">Innovation</h3>
              <p className="text-blue-600 dark:text-blue-400 text-sm">
                We embrace innovation and technology to create unique shopping experiences for our customers.
              </p>
            </div>
            <div className="text-center">
              <FaLeaf className="text-4xl text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">Sustainability</h3>
              <p className="text-blue-600 dark:text-blue-400 text-sm">
                We are committed to sustainable practices and promoting circular economy through our marketplace.
              </p>
            </div>
            <div className="text-center">
              <FaBuilding className="text-4xl text-blue-600 dark:text-blue-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">Growth</h3>
              <p className="text-blue-600 dark:text-blue-400 text-sm">
                We believe in sustainable growth that benefits our customers, employees, and stakeholders.
              </p>
            </div>
          </div>
        </div>

        {/* Company Milestones */}
        <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg p-8 mb-12 border border-blue-200 dark:border-blue-800">
          <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-8 text-center">
            Company Milestones
          </h2>
          <div className="space-y-6">
            {milestones.map((milestone, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="bg-blue-600 dark:bg-blue-700 text-white w-16 h-16 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">
                  {milestone.year}
                </div>
                <div className="flex-1 pt-3">
                  <p className="text-blue-700 dark:text-blue-300">{milestone.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Investor Relations */}
        <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg p-8 border border-blue-200 dark:border-blue-800">
          <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-6">Investor Relations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">Contact Information</h3>
              <div className="text-blue-700 dark:text-blue-300 space-y-1">
                <p>
                  <strong>Email:</strong> investors@swiftmart.com
                </p>
                <p>
                  <strong>Phone:</strong> +91 98765 43212
                </p>
                <p>
                  <strong>Address:</strong> Same as registered office
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-3">Financial Information</h3>
              <div className="text-blue-700 dark:text-blue-300 space-y-1">
                <p>Annual reports and financial statements are available upon request.</p>
                <p>For partnership and investment opportunities, please contact our investor relations team.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CorporateInfo
