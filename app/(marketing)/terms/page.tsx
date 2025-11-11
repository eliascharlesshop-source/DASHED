"use client"

import { useEffect, useMemo, useState } from "react"

export default function TermsPage() {
  const sections = useMemo(() => [
    { id: "introduction", title: "Introduction" },
    { id: "using-services", title: "Using our Services" },
    { id: "privacy-security", title: "Privacy & Security" },
    { id: "software-license", title: "Software License" },
    { id: "modifications", title: "Modifications to the Service" },
    { id: "termination", title: "Termination" },
    { id: "liability", title: "Limitation of Liability" },
    { id: "governing-law", title: "Governing Law" },
    { id: "changes", title: "Changes to Terms" },
    { id: "contact", title: "Contact Information" },
  ] as const, [])

  const [activeId, setActiveId] = useState<string>("introduction")
  const [showBackToTop, setShowBackToTop] = useState(false)

  // Observe headings to highlight TOC and update URL hash without scroll jump
  useEffect(() => {
    const headings = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"))
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (a.boundingClientRect.top < b.boundingClientRect.top ? -1 : 1))
        const top = visible[0]?.target as HTMLElement | undefined
        if (top?.id && top.id !== activeId) {
          setActiveId(top.id)
          // Update hash without scrolling
          history.replaceState(null, "", `#${top.id}`)
          // Persist to localStorage
          localStorage.setItem("terms-last-read", top.id)
        }
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 1] },
    )
    headings.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Restore from localStorage and handle back-to-top visibility
  useEffect(() => {
    const saved = localStorage.getItem("terms-last-read")
    if (saved && sections.some((s) => s.id === saved)) {
      setActiveId(saved)
      // Optionally scroll to it, but user might prefer to start fresh
    }

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [sections])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const appVersion = useMemo(() => process.env.APP_VERSION ?? "1.1.0", [])

  return (
    <div className="bg-white dark:bg-gray-950">
      {/* Header */}
      <div className="bg-accent-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-10">
          <h1 className="text-3xl md:text-5xl font-bold text-accent-700 dark:text-accent-300">Terms of Service</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">Comprehensive terms covering usage, privacy, licensing, and compliance.</p>
          <div className="mt-3 text-sm text-gray-500 dark:text-gray-400 flex items-center gap-3">
            <span>
              Effective date:
              {" "}
              {new Date(2024, 3, 3).toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
            </span>
            <span className="h-1 w-1 rounded-full bg-gray-300 dark:bg-gray-700 inline-block align-middle" />
            <span>Version {appVersion}</span>
          </div>
        </div>
      </div>

      {/* Content with sticky TOC */}
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* TOC */}
          <aside className="lg:col-span-3">
            <div className="sticky top-24 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
              <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200 mb-3">Table of Contents</h2>
              <nav className="space-y-2 text-sm">
                {sections.map((s) => {
                  const isActive = s.id === activeId
                  return (
                    <div key={s.id} className="space-y-1">
                      <a
                        href={`#${s.id}`}
                        aria-current={isActive ? "true" : undefined}
                        className={
                          `block rounded px-2 py-1 transition-colors ` +
                          (isActive
                            ? "text-accent-700 dark:text-accent-300 bg-accent-50 dark:bg-gray-800"
                            : "text-gray-700 dark:text-gray-300 hover:text-accent-600")
                        }
                      >
                        {s.title}
                      </a>
                    </div>
                  )
                })}
              </nav>
              {/* Back to top button for mobile */}
              {showBackToTop && (
                <button
                  onClick={scrollToTop}
                  className="mt-4 w-full bg-accent-500 hover:bg-accent-600 text-white text-sm font-medium py-2 px-3 rounded-md transition-colors lg:hidden"
                  aria-label="Back to top"
                >
                  ↑ Back to top
                </button>
              )}
            </div>
          </aside>

          {/* Main */}
          <main className="lg:col-span-9 scroll-smooth">
            <div className="prose max-w-none prose-gray dark:prose-invert">
              <section id="introduction" className="scroll-mt-28">
                <h2>Introduction</h2>
                <p>
                  Welcome to DASHED OS. By accessing or using our service, you agree to be bound by these Terms of
                  Service.
                </p>
                <p>
                  These terms outline your rights and responsibilities when using our products and services across
                  devices.
                </p>
              </section>

              <section id="using-services" className="scroll-mt-28">
                <h2>Using our Services</h2>
                <p>
                  You must follow any policies made available to you within the Services. You may use our Services only
                  as permitted by law. We may suspend or stop providing our Services to you if you do not comply with
                  our terms or policies or if we are investigating suspected misconduct.
                </p>
                <blockquote>
                  "DASHED OS is designed to empower users while maintaining the highest standards of security and
                  privacy. Our terms reflect our commitment to these principles."
                </blockquote>
              </section>

              <section id="privacy-security" className="scroll-mt-28">
                <h2>Privacy & Security</h2>
                <p>
                  Our privacy policies explain how we treat your personal data and protect your privacy when you use our
                  Services. By using our Services, you agree that DASHED OS can use such data in accordance with our
                  privacy policies.
                </p>
              </section>

              <section id="software-license" className="scroll-mt-28">
                <h2>Software License</h2>
                <p>
                  DASHED OS grants you a personal, worldwide, royalty-free, non-assignable and non-exclusive license to
                  use the software provided to you by DASHED OS as part of the Services.
                </p>
              </section>

              <section id="modifications" className="scroll-mt-28">
                <h2>Modifications to the Service</h2>
                <p>
                  We may modify or discontinue, temporarily or permanently, the Service (or any part thereof) with or
                  without notice. You agree that DASHED OS shall not be liable for any modification, suspension or
                  discontinuance of the Service.
                </p>
              </section>

              <section id="termination" className="scroll-mt-28">
                <h2>Termination</h2>
                <p>
                  We may terminate your access to all or any part of the Service at any time, with or without cause,
                  with or without notice, effective immediately. If you wish to terminate this Agreement, you may simply
                  discontinue using the Service.
                </p>
              </section>

              <section id="liability" className="scroll-mt-28">
                <h2>Limitation of Liability</h2>
                <p>
                  In no event will DASHED OS, or its suppliers or licensors, be liable with respect to any subject
                  matter of this agreement under any contract, negligence, strict liability or other legal or equitable
                  theory for: (i) any special, incidental or consequential damages; (ii) the cost of procurement for
                  substitute products or services; (iii) interruption of use or loss or corruption of data.
                </p>
              </section>

              <section id="governing-law" className="scroll-mt-28">
                <h2>Governing Law</h2>
                <p>
                  These Terms shall be governed and construed in accordance with the laws of the United States and the
                  State of California, without regard to its conflict of law provisions.
                </p>
              </section>

              <section id="changes" className="scroll-mt-28">
                <h2>Changes to Terms</h2>
                <p>
                  We reserve the right, at our sole discretion, to modify or replace any part of this Agreement. It is
                  your responsibility to check this Agreement periodically for changes. Your continued use of or access
                  to the Service following the posting of any changes constitutes acceptance of those changes.
                </p>
              </section>

              <section id="contact" className="scroll-mt-28">
                <h2>Contact Information</h2>
                <p>
                  For questions about these Terms, contact us at
                  <a href="mailto:legal@dashed.com" className="text-accent-500 hover:text-accent-600 ml-1">
                    legal@dashed.com
                  </a>
                  .
                </p>
              </section>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
