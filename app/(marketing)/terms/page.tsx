export default function TermsPage() {
  return (
    <main className="flex-1 bg-white">
      <div className="bg-accent-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-accent-700 mb-4">Terms of Service</h1>
          <p className="text-gray-600">Effective date: April 3, 2024</p>
        </div>
      </div>

      <div className="container max-w-3xl mx-auto px-4 py-12">
        <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
          <div className="prose prose-gray max-w-none">
            <h2>1. Introduction</h2>
            <p>
              Welcome to DASHED OS. By accessing or using our service, you agree to be bound by these Terms of Service.
            </p>

            <h2>2. Using our Services</h2>
            <p>
              You must follow any policies made available to you within the Services. You may use our Services only as
              permitted by law. We may suspend or stop providing our Services to you if you do not comply with our terms
              or policies or if we are investigating suspected misconduct.
            </p>

            <blockquote>
              "DASHED OS is designed to empower users while maintaining the highest standards of security and privacy.
              Our terms reflect our commitment to these principles."
            </blockquote>

            <h2>3. Privacy & Security</h2>
            <p>
              DASHED OS's privacy policies explain how we treat your personal data and protect your privacy when you use
              our Services. By using our Services, you agree that DASHED OS can use such data in accordance with our
              privacy policies.
            </p>

            <h2>4. Software License</h2>
            <p>
              DASHED OS gives you a personal, worldwide, royalty-free, non-assignable and non-exclusive license to use
              the software provided to you by DASHED OS as part of the Services.
            </p>

            <h2>5. Modifications to the Service</h2>
            <p>
              DASHED OS reserves the right to modify or discontinue, temporarily or permanently, the Service (or any
              part thereof) with or without notice. You agree that DASHED OS shall not be liable to you or to any third
              party for any modification, suspension or discontinuance of the Service.
            </p>

            <h2>6. Termination</h2>
            <p>
              DASHED OS may terminate your access to all or any part of the Service at any time, with or without cause,
              with or without notice, effective immediately. If you wish to terminate this Agreement, you may simply
              discontinue using the Service.
            </p>

            <h2>7. Limitation of Liability</h2>
            <p>
              In no event will DASHED OS, or its suppliers or licensors, be liable with respect to any subject matter of
              this agreement under any contract, negligence, strict liability or other legal or equitable theory for:
              (i) any special, incidental or consequential damages; (ii) the cost of procurement for substitute products
              or services; (iii) for interruption of use or loss or corruption of data.
            </p>

            <h2>8. Governing Law</h2>
            <p>
              These Terms shall be governed and construed in accordance with the laws of the United States and the State
              of California, without regard to its conflict of law provisions.
            </p>

            <h2>9. Changes to Terms</h2>
            <p>
              DASHED OS reserves the right, at its sole discretion, to modify or replace any part of this Agreement. It
              is your responsibility to check this Agreement periodically for changes. Your continued use of or access
              to the Service following the posting of any changes to this Agreement constitutes acceptance of those
              changes.
            </p>

            <h2>10. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at{" "}
              <a href="mailto:legal@dashed.com" className="text-accent-500 hover:text-accent-600">
                legal@dashed.com
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
