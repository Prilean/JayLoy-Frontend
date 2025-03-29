"use client"
import { TabWithCancelButton } from "@/layouts/Tabbar"
import { useRouter } from "next/navigation"
import Image from "next/image"
import QR from "@/public/images/QR.png" // Import the QR image

function SupportPage() {
  const router = useRouter()

  return (
    <>
      <TabWithCancelButton text="Help & Support" onClick={() => router.push("/profile/settings")} />

      <div className="min-h-screen pt-16 px-4 bg-background pb-24">
        <div className="max-w-md mx-auto">
          {/* Contact Us Section */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-2xl font-bold mb-6">Contact Us</h2>

            <div className="space-y-4">
              <div>
                <p className="font-medium mb-1">Hotline:</p>
                <a href="tel:+85512345679" className="text-primary">
                  +855 12345679
                </a>
              </div>

              <div>
                <p className="font-medium mb-1">Email:</p>
                <a href="mailto:supporth@jayloy.com" className="text-primary">
                  supporth@jayloy.com
                </a>
              </div>

              <div>
                <p className="font-medium mb-1">Facebook:</p>
                <a
                  href="https://facebook.com/jayloy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary"
                >
                  JayLoy
                </a>
              </div>

              <div>
                <p className="font-medium mb-1">Working Hour:</p>
                <p className="text-gray-600">9 AM to 5 PM, Exclude Holidays</p>
              </div>
            </div>
          </div>

          {/* Buy us Coffee Section */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold mb-6">Buy us Coffee</h2>

            <div>
              <p className="font-medium mb-2">ABA:</p>
              <div className="flex justify-center bg-white p-4 rounded-md border border-gray">
                <Image
                  src={QR}
                  alt="ABA QR Code"
                  width={200}
                  height={200}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SupportPage