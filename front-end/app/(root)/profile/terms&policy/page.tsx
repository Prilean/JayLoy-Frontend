/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { useState } from "react"
import { TabWithCancelButton } from "@/layouts/Tabbar"
import { useRouter } from "next/navigation"
import logo from "@/public/images/logo.png"
import Image from "next/image"
import LoadingOverlay from "@/components/LoadingOverlay"

function TermsPage() {
  const router = useRouter()
  const [actionLoading, setActionLoading] = useState<string | null>(null)

  const handleAcceptTerms = async () => {
    try {
      setActionLoading("Processing")
      // Accept terms logic
      // ...
    } catch (error: any) {
      console.log(error)
    } finally {
      setActionLoading(null)
    }
  }

  return (
    <>
      <LoadingOverlay 
        isLoading={!!actionLoading} 
        message={actionLoading || "Loading..."} 
      />
      <TabWithCancelButton text="Terms & Privacy Policy" onClick={() => router.push("/profile")} />

      <div className="min-h-screen pt-16 px-4 bg-background pb-24">
        <div className="max-w-md mx-auto">
          {/* Logo and Title */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-[100px] h-[100px] relative mb-2">
              <Image src={logo} alt="JayLoy Logo" fill className="object-contain" />
            </div>
            <h1 className="text-xl font-medium">JayLoy</h1>
          </div>

          {/* Terms Content */}
          <div className="bg-white rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4">Terms:</h2>

            <div className="space-y-4">
              <section>
                <h3 className="mb-2">1.1 Acceptance of Terms:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <p className="text-sm">
                      By using JayLoy, you agree to these Terms and our Privacy Policy. If you don&apos;t agree, please
                      don&apos;t use the app.
                    </p>
                  </li>
                </ul>
              </section>

              <section>
                <h3 className="mb-2">1.2 Use of the App:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <p className="text-sm">
                      JayLoy is designed for personal use in tracking food waste. You agree not to misuse the app for
                      any illegal or unauthorized purposes.
                    </p>
                  </li>
                </ul>
              </section>

              <section>
                <h3 className="mb-2">1.3 User Responsibilities:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <p className="text-sm">
                      You are responsible for ensuring that your device meets the requirements of the app.
                    </p>
                  </li>
                </ul>
              </section>

              <section>
                <h3 className="mb-2">1.4 Data Privacy:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <p className="text-sm">
                      We collect and process your data in accordance with our Privacy Policy. Your privacy and data
                      security are important to us.
                    </p>
                  </li>
                </ul>
              </section>

              <section>
                <h3 className="mb-2">1.5 App Updates:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <p className="text-sm">
                      We may update the app periodically to improve functionality and security. You agree to install
                      these updates to continue using the app.
                    </p>
                  </li>
                </ul>
              </section>

              <section>
                <h3 className="mb-2">1.6 Intellectual Property:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <p className="text-sm">
                      All content and intellectual property within the app belong to JayLoy. You may not copy or
                      distribute any part of the app without permission.
                    </p>
                  </li>
                </ul>
              </section>

              <section>
                <h3 className="mb-2">1.7 Account Security:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <p className="text-sm">
                      You are responsible for maintaining the security of your account and password. Notify us
                      immediately of any unauthorized access.
                    </p>
                  </li>
                </ul>
              </section>

              <section>
                <h3 className="mb-2">1.8 Termination:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <p className="text-sm">
                      We reserve the right to terminate or suspend access to the app for violations of these terms or
                      any other reason we deem appropriate.
                    </p>
                  </li>
                </ul>
              </section>
            </div>

            <div className="mt-8 text-center text-sm text-gray-500">Last Updated: March 14, 2025</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TermsPage