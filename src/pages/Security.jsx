"use client"

import { FaShieldAlt, FaLock, FaUserShield, FaKey, FaEye, FaServer } from "react-icons/fa"

const Security = () => {
  const securityFeatures = [
    {
      icon: <FaLock className="text-4xl text-blue-600 dark:text-blue-400" />,
      title: "SSL Encryption",
      description:
        "All data transmission is protected with 256-bit SSL encryption to ensure your information stays secure.",
    },
    {
      icon: <FaUserShield className="text-4xl text-blue-600 dark:text-blue-400" />,
      title: "Secure Authentication",
      description:
        "Multi-factor authentication and secure login processes protect your account from unauthorized access.",
    },
    {
      icon: <FaKey className="text-4xl text-blue-600 dark:text-blue-400" />,
      title: "Payment Security",
      description:
        "PCI DSS compliant payment processing ensures your financial information is handled with the highest security standards.",
    },
    {
      icon: <FaServer className="text-4xl text-blue-600 dark:text-blue-400" />,
      title: "Secure Infrastructure",
      description: "Our servers are hosted in secure data centers with 24/7 monitoring and regular security updates.",
    },
    {
      icon: <FaEye className="text-4xl text-blue-600 dark:text-blue-400" />,
      title: "Fraud Detection",
      description:
        "Advanced fraud detection systems monitor transactions in real-time to prevent unauthorized activities.",
    },
    {
      icon: <FaShieldAlt className="text-4xl text-blue-600 dark:text-blue-400" />,
      title: "Data Protection",
      description: "Your personal data is protected with industry-standard security measures and access controls.",
    },
  ]

  return (
    <div className="container mx-auto px-4 py-8 bg-blue-50 dark:bg-blue-950 min-h-screen">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-900 dark:text-blue-100 mb-4 flex items-center justify-center">
            <FaShieldAlt className="mr-3" />
            Security & Trust
          </h1>
          <p className="text-lg text-blue-700 dark:text-blue-300 leading-relaxed max-w-3xl mx-auto">
            Your security is our top priority. We implement comprehensive security measures to protect your data,
            transactions, and privacy.
          </p>
        </div>

        {/* Security Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {securityFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-blue-900 rounded-xl shadow-lg p-6 border border-blue-200 dark:border-blue-800 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="text-center mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 text-center mb-3">
                {feature.title}
              </h3>
              <p className="text-blue-600 dark:text-blue-400 text-center">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Security Measures */}
        <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg p-8 mb-12 border border-blue-200 dark:border-blue-800">
          <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-8 text-center">
            Our Security Measures
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-4">Technical Security</h3>
              <ul className="space-y-3 text-blue-700 dark:text-blue-300">
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  <span>256-bit SSL/TLS encryption for all data transmission</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  <span>Advanced firewall protection and intrusion detection</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  <span>Regular security audits and penetration testing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  <span>Automated security monitoring and threat detection</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  <span>Secure coding practices and code reviews</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  <span>Regular software updates and security patches</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-blue-800 dark:text-blue-200 mb-4">Operational Security</h3>
              <ul className="space-y-3 text-blue-700 dark:text-blue-300">
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  <span>24/7 security monitoring and incident response</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  <span>Employee background checks and security training</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  <span>Strict access controls and principle of least privilege</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  <span>Secure data centers with physical security measures</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  <span>Regular backup and disaster recovery procedures</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                  <span>Incident response team and security protocols</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Payment Security */}
        <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg p-8 mb-12 border border-blue-200 dark:border-blue-800">
          <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-6">Payment Security</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4">PCI DSS Compliance</h3>
              <p className="text-blue-700 dark:text-blue-300 mb-4">
                We are fully compliant with the Payment Card Industry Data Security Standard (PCI DSS), ensuring that
                all payment card data is handled with the highest level of security.
              </p>
              <ul className="space-y-2 text-blue-700 dark:text-blue-300">
                <li>• Secure payment processing through certified gateways</li>
                <li>• Tokenization of sensitive payment information</li>
                <li>• No storage of complete card details on our servers</li>
                <li>• Regular compliance audits and assessments</li>
              </ul>
            </div>
            <div className="bg-blue-50 dark:bg-blue-800 rounded-lg p-6">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-3">Supported Payment Methods</h4>
              <div className="grid grid-cols-2 gap-3 text-sm text-blue-700 dark:text-blue-300">
                <div>• Credit Cards</div>
                <div>• Debit Cards</div>
                <div>• UPI</div>
                <div>• Net Banking</div>
                <div>• Digital Wallets</div>
                <div>• EMI Options</div>
              </div>
            </div>
          </div>
        </div>

        {/* Account Security */}
        <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg p-8 mb-12 border border-blue-200 dark:border-blue-800">
          <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-6">
            Account Security Best Practices
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4">For Your Protection</h3>
              <ul className="space-y-3 text-blue-700 dark:text-blue-300">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Use a strong, unique password for your account</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Enable two-factor authentication when available</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Log out from shared or public computers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Regularly review your account activity</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Keep your contact information updated</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4">Warning Signs</h3>
              <ul className="space-y-3 text-blue-700 dark:text-blue-300">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">⚠</span>
                  <span>Unexpected login notifications</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">⚠</span>
                  <span>Unfamiliar transactions in your account</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">⚠</span>
                  <span>Emails asking for password or personal information</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">⚠</span>
                  <span>Suspicious links or attachments</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">⚠</span>
                  <span>Changes to your account you didn't make</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Reporting Security Issues */}
        <div className="bg-white dark:bg-blue-900 rounded-xl shadow-lg p-8 border border-blue-200 dark:border-blue-800">
          <h2 className="text-2xl font-semibold text-blue-800 dark:text-blue-200 mb-6">Report Security Issues</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4">Security Concerns</h3>
              <p className="text-blue-700 dark:text-blue-300 mb-4">
                If you discover a security vulnerability or have concerns about the security of our platform, please
                report it to us immediately.
              </p>
              <div className="space-y-2 text-blue-700 dark:text-blue-300">
                <p>
                  <strong>Email:</strong> security@swiftmart.com
                </p>
                <p>
                  <strong>Phone:</strong> +91 98765 43210 (24/7 Security Hotline)
                </p>
                <p>
                  <strong>Response Time:</strong> Within 24 hours
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-blue-800 dark:text-blue-200 mb-4">What to Include</h3>
              <ul className="space-y-2 text-blue-700 dark:text-blue-300">
                <li>• Detailed description of the issue</li>
                <li>• Steps to reproduce the problem</li>
                <li>• Screenshots or evidence (if applicable)</li>
                <li>• Your contact information</li>
                <li>• Any potential impact assessment</li>
              </ul>
              <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-800 rounded-lg">
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  <strong>Note:</strong> We take all security reports seriously and will investigate promptly. We
                  appreciate responsible disclosure and may offer recognition for valid security findings.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Security
