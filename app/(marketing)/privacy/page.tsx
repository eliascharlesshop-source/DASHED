export default function PrivacyPage() {
  return (
    <div className="container max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold tracking-tight text-center mb-2">Privacy Policy</h1>
      <p className="text-center text-gray-600 mb-12">Last updated: April 3, 2024</p>

      <div className="prose prose-gray max-w-none">
        <h2>Introduction</h2>
        <p>
          At DASHED, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and
          safeguard your information when you use our DASHED OS and related services.
        </p>

        <h2>Information We Collect</h2>
        <h3>Personal Information</h3>
        <ul>
          <li>Name and contact information</li>
          <li>Device information and identifiers</li>
          <li>Usage data and preferences</li>
          <li>Location data (with your consent)</li>
        </ul>

        <h3>Device Information</h3>
        <p>When you use DASHED OS, we collect information about your connected devices, including:</p>
          <ul>
            <li>Device types and models</li>
            <li>Device settings and configurations</li>
            <li>Usage patterns and automation preferences</li>
            <li>Performance and diagnostic data</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use the collected information to:</p>
          <ul>
            <li>Provide and improve DASHED OS services</li>
            <li>Personalize your experience</li>
            <li>Ensure security and prevent fraud</li>
            <li>Communicate with you about updates and features</li>
            <li>Analyze and improve our services</li>
          </ul>

          <h2>Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to protect your personal information,
            including encryption, access controls, and regular security assessments.
          </p>

          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Opt-out of certain data processing activities</li>
            <li>Export your data</li>
          </ul>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at:
            <br />
            <a href="mailto:privacy@dashed.com" className="text-accent-500 hover:text-accent-400">
              privacy@dashed.com
            </a>
          </p>
        </div>
      </div>
    )
  }
