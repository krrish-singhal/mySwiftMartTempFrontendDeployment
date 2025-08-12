"use client"

import { FaShieldAlt, FaUserShield, FaLock, FaEye } from "react-icons/fa"

const PrivacyPolicy = () => {
  return (
    <div className="container mx-auto px-4 py-8 bg-blue-50 dark:bg-blue-950 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center justify-center">
            <FaShieldAlt className="mr-3" />
            Privacy Policy
          </h1>
          <p className="text-lg text-blue-700 dark:text-blue-300">Last updated: December 2024</p>
          <p className="text-blue-600 dark:text-blue-400 mt-2">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
        </div>

        {/* Quick Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg p-6 text-center border border-blue-200 dark:border-blue-800">
            <FaUserShield className="text-4xl text-blue-600 dark:text-blue-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">Data Protection</h3>
            <p className="text-blue-600 dark:text-blue-400 text-sm">
              We use industry-standard security measures to protect your personal information.
            </p>
          </div>
          <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg p-6 text-center border border-blue-200 dark:border-blue-800">
            <FaLock className="text-4xl text-blue-600 dark:text-blue-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">Secure Transactions</h3>
            <p className="text-blue-600 dark:text-blue-400 text-sm">
              All payment information is encrypted and processed through secure channels.
            </p>
          </div>
          <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg p-6 text-center border border-blue-200 dark:border-blue-800">
            <FaEye className="text-4xl text-blue-600 dark:text-blue-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">Transparency</h3>
            <p className="text-blue-600 dark:text-blue-400 text-sm">
              We're transparent about what data we collect and how we use it.
            </p>
          </div>
        </div>

        {/* Privacy Policy Content */}
        <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg border border-blue-200 dark:border-blue-800">
          <div className="p-8 space-y-8">
            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-4">
                1. Information We Collect
              </h2>
              <div className="space-y-4 text-blue-700 dark:text-blue-300">
                <div>
                  <h3 className="text-lg font-medium text-blue-800 dark:text-blue-200 mb-2">Personal Information</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Name, email address, and phone number</li>
                    <li>Shipping and billing addresses</li>
                    <li>Payment information (processed securely by third-party providers)</li>
                    <li>Account credentials and preferences</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-blue-800 dark:text-blue-200 mb-2">Usage Information</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>Browsing history and search queries on our website</li>
                    <li>Device information (IP address, browser type, operating system)</li>
                    <li>Cookies and similar tracking technologies</li>
                    <li>Purchase history and preferences</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* How We Use Information */}
            <section>
              <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-4">
                2. How We Use Your Information
              </h2>
              <div className="text-blue-700 dark:text-blue-300 space-y-2">
                <p>We use your information to:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Process and fulfill your orders</li>
                  <li>Provide customer support and respond to inquiries</li>
                  <li>Send order confirmations, shipping updates, and important notices</li>
                  <li>Personalize your shopping experience and recommend products</li>
                  <li>Improve our website, products, and services</li>
                  <li>Prevent fraud and ensure security</li>
                  <li>Send marketing communications (with your consent)</li>
                  <li>Comply with legal obligations</li>
                </ul>
              </div>
            </section>

            {/* Information Sharing */}
            <section>
              <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-4">3. Information Sharing</h2>
              <div className="text-blue-700 dark:text-blue-300 space-y-4">
                <p>
                  We do not sell, trade, or rent your personal information to third parties. We may share your
                  information only in the following circumstances:
                </p>
                <div>
                  <h3 className="text-lg font-medium text-blue-800 dark:text-blue-200 mb-2">Service Providers</h3>
                  <p>We work with trusted third-party service providers who help us operate our business, including:</p>
                  <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                    <li>Payment processors for secure transaction handling</li>
                    <li>Shipping companies for order delivery</li>
                    <li>Email service providers for communications</li>
                    <li>Analytics providers to improve our services</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-blue-800 dark:text-blue-200 mb-2">Legal Requirements</h3>
                  <p>
                    We may disclose your information when required by law or to protect our rights, property, or safety.
                  </p>
                </div>
              </div>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-4">4. Data Security</h2>
              <div className="text-blue-700 dark:text-blue-300 space-y-2">
                <p>We implement appropriate security measures to protect your personal information:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>SSL encryption for data transmission</li>
                  <li>Secure servers and databases</li>
                  <li>Regular security audits and updates</li>
                  <li>Access controls and employee training</li>
                  <li>PCI DSS compliance for payment processing</li>
                </ul>
              </div>
            </section>

            {/* Cookies and Tracking */}
            <section>
              <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-4">5. Cookies and Tracking</h2>
              <div className="text-blue-700 dark:text-blue-300 space-y-4">
                <p>We use cookies and similar technologies to enhance your experience:</p>
                <div>
                  <h3 className="text-lg font-medium text-blue-800 dark:text-blue-200 mb-2">Essential Cookies</h3>
                  <p>Required for basic website functionality, such as shopping cart and login features.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-blue-800 dark:text-blue-200 mb-2">Analytics Cookies</h3>
                  <p>Help us understand how visitors use our website to improve performance and user experience.</p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-blue-800 dark:text-blue-200 mb-2">Marketing Cookies</h3>
                  <p>Used to deliver relevant advertisements and track campaign effectiveness (with your consent).</p>
                </div>
              </div>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-4">6. Your Rights</h2>
              <div className="text-blue-700 dark:text-blue-300 space-y-2">
                <p>You have the following rights regarding your personal information:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Access and review your personal information</li>
                  <li>Update or correct inaccurate information</li>
                  <li>Delete your account and personal information</li>
                  <li>Opt-out of marketing communications</li>
                  <li>Request data portability</li>
                  <li>Object to certain data processing activities</li>
                </ul>
                <p className="mt-4">To exercise these rights, please contact us at privacy@swiftmart.com</p>
              </div>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-4">7. Data Retention</h2>
              <div className="text-blue-700 dark:text-blue-300">
                <p>We retain your personal information only as long as necessary to:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                  <li>Provide our services and support</li>
                  <li>Comply with legal obligations</li>
                  <li>Resolve disputes and enforce agreements</li>
                  <li>Improve our products and services</li>
                </ul>
                <p className="mt-4">When information is no longer needed, we securely delete or anonymize it.</p>
              </div>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-4">8. Children's Privacy</h2>
              <div className="text-blue-700 dark:text-blue-300">
                <p>
                  Our services are not intended for children under 13 years of age. We do not knowingly collect personal
                  information from children under 13. If we become aware that we have collected such information, we
                  will take steps to delete it promptly.
                </p>
              </div>
            </section>

            {/* Changes to Policy */}
            <section>
              <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-4">
                9. Changes to This Policy
              </h2>
              <div className="text-blue-700 dark:text-blue-300">
                <p>We may update this privacy policy from time to time. When we make changes, we will:</p>
                <ul className="list-disc list-inside space-y-1 ml-4 mt-2">
                  <li>Post the updated policy on our website</li>
                  <li>Update the "Last updated" date</li>
                  <li>Notify you of significant changes via email or website notice</li>
                </ul>
                <p className="mt-4">
                  Your continued use of our services after changes become effective constitutes acceptance of the
                  updated policy.
                </p>
              </div>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-4">10. Contact Us</h2>
              <div className="text-blue-700 dark:text-blue-300">
                <p>If you have questions about this privacy policy or our data practices, please contact us:</p>
                <div className="mt-4 space-y-1">
                  <p>
                    <strong>Email:</strong> privacy@swiftmart.com
                  </p>
                  <p>
                    <strong>Phone:</strong> +91 98765 43210
                  </p>
                  <p>
                    <strong>Address:</strong> Swift Mart Technologies Pvt. Ltd., 123 Commerce Street, Bangalore,
                    Karnataka - 560001
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPolicy
