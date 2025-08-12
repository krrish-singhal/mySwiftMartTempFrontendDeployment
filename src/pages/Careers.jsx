"use client"

import { useState } from "react"
import { FaBriefcase, FaMapMarkerAlt, FaClock, FaUsers, FaRocket, FaHeart } from "react-icons/fa"

const Careers = () => {
  const [selectedDepartment, setSelectedDepartment] = useState("all")

  const jobOpenings = [
    {
      id: 1,
      title: "Frontend Developer",
      department: "Engineering",
      location: "Remote / Bangalore",
      type: "Full-time",
      experience: "2-4 years",
      description:
        "Join our frontend team to build amazing user experiences using React, Next.js, and modern web technologies.",
    },
    {
      id: 2,
      title: "Backend Developer",
      department: "Engineering",
      location: "Bangalore",
      type: "Full-time",
      experience: "3-5 years",
      description:
        "Build scalable backend systems using Node.js, MongoDB, and cloud technologies to power our e-commerce platform.",
    },
    {
      id: 3,
      title: "Product Manager",
      department: "Product",
      location: "Mumbai",
      type: "Full-time",
      experience: "4-6 years",
      description: "Lead product strategy and development for our mystery box and marketplace features.",
    },
    {
      id: 4,
      title: "UI/UX Designer",
      department: "Design",
      location: "Remote / Delhi",
      type: "Full-time",
      experience: "2-4 years",
      description:
        "Create intuitive and beautiful user interfaces that enhance the shopping experience for millions of users.",
    },
    {
      id: 5,
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Pune",
      type: "Full-time",
      experience: "1-3 years",
      description: "Help our customers succeed by providing exceptional support and building lasting relationships.",
    },
    {
      id: 6,
      title: "Marketing Specialist",
      department: "Marketing",
      location: "Remote",
      type: "Full-time",
      experience: "2-4 years",
      description:
        "Drive growth through digital marketing campaigns, content creation, and brand building initiatives.",
    },
  ]

  const departments = ["all", "Engineering", "Product", "Design", "Customer Success", "Marketing"]

  const filteredJobs =
    selectedDepartment === "all" ? jobOpenings : jobOpenings.filter((job) => job.department === selectedDepartment)

  return (
    <div className="container mx-auto px-4 py-8 bg-blue-50 dark:bg-blue-950 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 dark:text-blue-100 mb-4">Join Our Team</h1>
          <p className="text-lg text-blue-700 dark:text-blue-300 leading-relaxed max-w-3xl mx-auto">
            Be part of a dynamic team that's revolutionizing e-commerce. We're looking for passionate individuals who
            want to make a difference.
          </p>
        </div>

        {/* Why Work With Us */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg p-6 text-center border border-blue-200 dark:border-blue-800">
            <FaRocket className="text-4xl text-blue-600 dark:text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-2">Innovation First</h3>
            <p className="text-blue-600 dark:text-blue-400">
              Work on cutting-edge technologies and innovative features that shape the future of e-commerce.
            </p>
          </div>
          <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg p-6 text-center border border-blue-200 dark:border-blue-800">
            <FaUsers className="text-4xl text-blue-600 dark:text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-2">Great Team</h3>
            <p className="text-blue-600 dark:text-blue-400">
              Collaborate with talented professionals who are passionate about creating exceptional user experiences.
            </p>
          </div>
          <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg p-6 text-center border border-blue-200 dark:border-blue-800">
            <FaHeart className="text-4xl text-blue-600 dark:text-blue-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-2">Work-Life Balance</h3>
            <p className="text-blue-600 dark:text-blue-400">
              Enjoy flexible working hours, remote work options, and comprehensive benefits package.
            </p>
          </div>
        </div>

        {/* Job Openings */}
        <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg border border-blue-200 dark:border-blue-800">
          <div className="p-6 border-b border-blue-200 dark:border-blue-800">
            <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-4">Current Openings</h2>

            {/* Department Filter */}
            <div className="flex flex-wrap gap-2">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    selectedDepartment === dept
                      ? "bg-blue-600 text-white"
                      : "bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-700"
                  }`}
                >
                  {dept === "all" ? "All Departments" : dept}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6">
            {filteredJobs.length === 0 ? (
              <p className="text-center text-blue-600 dark:text-blue-400 py-8">
                No openings found for the selected department.
              </p>
            ) : (
              <div className="space-y-6">
                {filteredJobs.map((job) => (
                  <div
                    key={job.id}
                    className="border border-blue-200 dark:border-blue-700 rounded-lg p-6 hover:shadow-lg transition-shadow duration-200"
                  >
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-2">{job.title}</h3>
                        <p className="text-blue-600 dark:text-blue-400 mb-3">{job.description}</p>

                        <div className="flex flex-wrap gap-4 text-sm text-blue-700 dark:text-blue-300">
                          <div className="flex items-center gap-1">
                            <FaBriefcase />
                            <span>{job.department}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FaMapMarkerAlt />
                            <span>{job.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FaClock />
                            <span>{job.type}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <FaUsers />
                            <span>{job.experience}</span>
                          </div>
                        </div>
                      </div>

                      <div className="lg:ml-6">
                        <button className="w-full lg:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 hover:scale-105 transform shadow-lg">
                          Apply Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-12 bg-white dark:bg-blue-900 rounded-xl shadow-lg p-8 border border-blue-200 dark:border-blue-800">
          <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-6 text-center">Benefits & Perks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">💰</span>
              </div>
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">Competitive Salary</h4>
              <p className="text-sm text-blue-600 dark:text-blue-400">Market-leading compensation packages</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🏥</span>
              </div>
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">Health Insurance</h4>
              <p className="text-sm text-blue-600 dark:text-blue-400">Comprehensive medical coverage</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🏠</span>
              </div>
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">Remote Work</h4>
              <p className="text-sm text-blue-600 dark:text-blue-400">Flexible work from home options</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 dark:bg-blue-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">📚</span>
              </div>
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">Learning Budget</h4>
              <p className="text-sm text-blue-600 dark:text-blue-400">Annual budget for courses and conferences</p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-4">Don't see a perfect fit?</h3>
          <p className="text-blue-700 dark:text-blue-300 mb-6">
            We're always looking for talented individuals. Send us your resume and we'll keep you in mind for future
            opportunities.
          </p>
          <a
            href="mailto:careers@swiftmart.com"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200 hover:scale-105 transform shadow-lg"
          >
            Send Your Resume
          </a>
        </div>
      </div>
    </div>
  )
}

export default Careers
