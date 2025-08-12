"use client"

import { FaGavel, FaHandshake, FaExclamationTriangle, FaUserCheck } from "react-icons/fa"

const TermsOfUse = () => {
  return (
    <div className="container mx-auto px-4 py-8 bg-blue-50 dark:bg-blue-950 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center justify-center">
            <FaGavel className="mr-3" />
            Terms of Use
          </h1>
          <p className="text-lg text-blue-700 dark:text-blue-300">Last updated: December 2024</p>
          <p className="text-blue-600 dark:text-blue-400 mt-2">
            Please read these terms carefully before using our services.
          </p>
        </div>

        {/* Key Points */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg p-6 text-center border border-blue-200 dark:border-blue-800">
            <FaUserCheck className="text-4xl text-blue-600 dark:text-blue-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">User Responsibilities</h3>
            <p className="text-blue-600 dark:text-blue-400 text-sm">
              Users must provide accurate information and use our services responsibly.
            </p>
          </div>
          <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg p-6 text-center border border-blue-200 dark:border-blue-800">
            <FaHandshake className="text-4xl text-blue-600 dark:text-blue-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">Fair Usage</h3>
            <p className="text-blue-600 dark:text-blue-400 text-sm">
              Our platform should be used fairly and in accordance with applicable laws.
            </p>
          </div>
          <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg p-6 text-center border border-blue-200 dark:border-blue-800">
            <FaExclamationTriangle className="text-4xl text-blue-600 dark:text-blue-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-2">Prohibited Activities</h3>
            <p className="text-blue-600 dark:text-blue-400 text-sm">
              Certain activities are strictly prohibited to maintain platform integrity.
            </p>
          </div>
        </div>

        {/* Terms Content */}
        <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg border border-blue-200 dark:border-blue-800">
          <div className="p-8 space-y-8">
            {/* Acceptance of Terms */}
            <section>
              <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-4">1. Acceptance of Terms</h2>
              <div className="text-blue-700 dark:text-blue-300 space-y-2">
                <p>
                  By accessing and using Swift Mart's website and services, you accept and agree to be bound by the
                  terms and provision of this agreement. If you do not agree to abide by the above, please do not use
                  this service.
                </p>
                <p>These terms apply to all visitors, users, and others who access or use our service.</p>
              </div>
            </section>

            {/* Description of Service */}
            <section>
              <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-4">
                2. Description of Service
              </h2>
              <div className="text-blue-700 dark:text-blue-300 space-y-2">
                <p>Swift Mart provides an e-commerce platform that includes:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Online marketplace for buying and selling products</li>
                  <li>Mystery box feature with surprise items</li>
                  <li>OLX marketplace for pre-owned goods</li>
                  <li>Payment processing and order management</li>
                  <li>Customer support services</li>
                </ul>
              </div>
            </section>

            {/* User Accounts */}
            <section>
              <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-4">3. User Accounts</h2>
              <div className="text-blue-700 dark:text-blue-300 space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-blue-800 dark:text-blue-200 mb-2">Account Creation</h3>
                  <ul className="list-disc list-inside space-y-1 ml-4">
                    <li>You must be at least 18 years old to create an account</li>
                    <li>Provide accurate, current, and complete information</li>
                    <li>Maintain and update your account information</li>
                    <li>Keep your password secure and confidential</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-blue-800 dark:text-blue-200 mb-2">Account Responsibility</h3>
                  <p>
                    You are responsible for all activities that occur under your account. Notify us immediately of any
                    unauthorized use of your account.
                  </p>
                </div>
              </div>
            </section>

            {/* Prohibited Uses */}
            <section>
              <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-4">4. Prohibited Uses</h2>
              <div className="text-blue-700 dark:text-blue-300 space-y-2">
                <p>You may not use our service:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li>
                    To violate any international, federal, provincial, or state regulations, rules, laws, or local
                    ordinances
                  </li>
                  <li>
                    To infringe upon or violate our intellectual property rights or the intellectual property rights of
                    others
                  </li>
                  <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  <li>To submit false or misleading information</li>
                  <li>To upload or transmit viruses or any other type of malicious code</li>
                  <li>To collect or track the personal information of others</li>
                  <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
                  <li>For any obscene or immoral purpose</li>
                  <li>To interfere with or circumvent the security features of our service</li>
                </ul>
              </div>
            </section>

            {/* Products and Services */}
            <section>
              <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-4">5. Products and Services</h2>
              <div className="text-blue-700 dark:text-blue-300 space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-blue-800 dark:text-blue-200 mb-2">Product Information</h3>
                  <p>
                    We strive to provide accurate product descriptions, but we do not warrant that product descriptions
                    or other content is accurate, complete, reliable, current, or error-free.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-blue-800 dark:text-blue-200 mb-2">Pricing</h3>
                  <p>
                    Prices are subject to change without notice. We reserve the right to modify or discontinue products
                    at any time.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-blue-800 dark:text-blue-200 mb-2">Mystery Boxes</h3>
                  <p>
                    Mystery box contents are random and cannot be returned unless defective. The value guarantee applies
                    to the retail value of items included.
                  </p>
                </div>
              </div>
            </section>

            {/* Payment Terms */}
            <section>
              <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-4">6. Payment Terms</h2>
              <div className="text-blue-700 dark:text-blue-300 space-y-2">
                <p>Payment terms include:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>All prices are in Indian Rupees (INR)</li>
                  <li>Payment is due at the time of purchase</li>
                  <li>We accept various payment methods as displayed at checkout</li>
                  <li>You authorize us to charge your payment method for all purchases</li>
                  <li>You are responsible for any applicable taxes</li>
                  <li>Refunds are processed according to our return policy</li>
                </ul>
              </div>
            </section>

            {/* Shipping and Delivery */}
            <section>
              <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-4">7. Shipping and Delivery</h2>
              <div className="text-blue-700 dark:text-blue-300 space-y-2">
                <p>Shipping terms:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Delivery times are estimates and not guaranteed</li>
                  <li>Risk of loss passes to you upon delivery to the carrier</li>
                  <li>You are responsible for providing accurate shipping information</li>
                  <li>Additional charges may apply for remote locations</li>
                  <li>We are not responsible for delays caused by shipping carriers</li>
                </ul>
              </div>
            </section>

            {/* Returns and Refunds */}
            <section>
              <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-4">8. Returns and Refunds</h2>
              <div className="text-blue-700 dark:text-blue-300 space-y-2">
                <p>Our return policy includes:</p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>30-day return window for most items</li>
                  <li>Items must be in original condition</li>
                  <li>Some items are non-returnable (see our Returns page)</li>
                  <li>Return shipping costs may apply</li>
                  <li>Refunds processed within 5-7 business days</li>
                </ul>
              </div>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-4">
                9. Intellectual Property Rights
              </h2>
              <div className="text-blue-700 dark:text-blue-300 space-y-2">
                <p>
                  The service and its original content, features, and functionality are and will remain the exclusive
                  property of Swift Mart and its licensors. The service is protected by copyright, trademark, and other
                  laws.
                </p>
                <p>
                  You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly
                  perform, republish, download, store, or transmit any of the material on our service without prior
                  written consent.
                </p>
              </div>
            </section>

            {/* Disclaimer */}
            <section>
              <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-4">10. Disclaimer</h2>
              <div className="text-blue-700 dark:text-blue-300 space-y-2">
                <p>
                  The information on this website is provided on an "as is" basis. To the fullest extent permitted by
                  law, this Company:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Excludes all representations and warranties relating to this website and its contents</li>
                  <li>Does not warrant that the service will be uninterrupted or error-free</li>
                  <li>Makes no representations about the accuracy or completeness of content</li>
                  <li>Disclaims liability for any damages arising from use of the service</li>
                </ul>
              </div>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-4">
                11. Limitation of Liability
              </h2>
              <div className="text-blue-700 dark:text-blue-300">
                <p>
                  In no event shall Swift Mart, nor its directors, employees, partners, agents, suppliers, or
                  affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages,
                  including without limitation, loss of profits, data, use, goodwill, or other intangible losses,
                  resulting from your use of the service.
                </p>
              </div>
            </section>

            {/* Termination */}
            <section>
              <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-4">12. Termination</h2>
              <div className="text-blue-700 dark:text-blue-300 space-y-2">
                <p>
                  We may terminate or suspend your account and bar access to the service immediately, without prior
                  notice or liability, under our sole discretion, for any reason whatsoever, including but not limited
                  to a breach of the Terms.
                </p>
                <p>If you wish to terminate your account, you may simply discontinue using the service.</p>
              </div>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-4">13. Governing Law</h2>
              <div className="text-blue-700 dark:text-blue-300">
                <p>
                  These Terms shall be interpreted and governed by the laws of India. Any disputes relating to these
                  terms shall be subject to the exclusive jurisdiction of the courts of Bangalore, Karnataka.
                </p>
              </div>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-4">14. Changes to Terms</h2>
              <div className="text-blue-700 dark:text-blue-300">
                <p>
                  We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a
                  revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
                </p>
              </div>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-4">15. Contact Information</h2>
              <div className="text-blue-700 dark:text-blue-300">
                <p>If you have any questions about these Terms of Use, please contact us:</p>
                <div className="mt-4 space-y-1">
                  <p>
                    <strong>Email:</strong> legal@swiftmart.com
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

export default TermsOfUse
