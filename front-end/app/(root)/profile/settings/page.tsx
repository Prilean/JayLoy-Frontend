/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { TabWithCancelButton } from "@/layouts/Tabbar"
import { useRouter } from "next/navigation"
import { Icon } from "@iconify/react"
import { signOut } from "next-auth/react"
import { useState, useEffect } from "react"
import LoadingOverlay from "@/components/LoadingOverlay"

function SettingsPage() {
  const router = useRouter()
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [modalConfig, setModalConfig] = useState({
    title: "",
    message: "",
    confirmAction: () => {},
    cancelAction: () => {},
    confirmText: "Confirm",
    cancelText: "Cancel",
    confirmClass: "bg-primary",
    icon: null as React.ReactNode
  })
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showModal]);

  const handleLogout = async () => {
    try {
      setActionLoading("Log Out")
      await signOut({ redirect: false })
      localStorage.removeItem("accessToken")
      localStorage.removeItem("tokenTimestamp")
      localStorage.removeItem("refreshToken")
      router.push("/login")
    } catch (error) {
      console.error("Logout failed:", error)
    } finally {
      setActionLoading(null)
    }
  }

  const showLogoutConfirmation = () => {
    setModalConfig({
      title: "Log Out",
      message: "Are you sure you want to log out of your account?",
      confirmAction: () => {
        setShowModal(false)
        handleLogout()
      },
      cancelAction: () => setShowModal(false),
      confirmText: "Log Out",
      cancelText: "Cancel",
      confirmClass: "bg-red active:bg-red-700 transition-colors",
      icon: <Icon icon="ph:sign-out-fill" className="text-red-600" width="32" height="32" />
    })
    setShowModal(true)
  }

  const handleMenuAction = (item: any) => {
    if (item.title === "Log Out") {
      showLogoutConfirmation()
    } else if (item.action) {
      setActionLoading(item.title)
      item.action().finally(() => setActionLoading(null))
    } else if (item.route) {
      setActionLoading(item.title)
      router.push(item.route)
    }
  }

  const settingsItems = [
    {
      title: "Change password",
      icon: <Icon icon="ph:user-fill" className="text-primary" width="24" height="24" />,
      route: "/profile/settings/accountManagement",
      highlight: false,
    },
    {
      title: "Help & Support",
      icon: <Icon icon="ph:lifebuoy-fill" className="text-primary" width="24" height="24" />,
      route: "/profile/settings/support",
      highlight: false,
    },
    {
      title: "Delete Account",
      icon: <Icon icon="ph:trash-fill" className="text-primary" width="24" height="24" />,
      route: "/profile/settings/delete-account",
      highlight: true,
    },
    {
      title: "Log Out",
      icon: <Icon icon="ph:sign-out-fill" className="text-primary" width="24" height="24" />,
      highlight: true,
    },
  ]

  return (
    <>
      <LoadingOverlay 
        isLoading={!!actionLoading} 
        message={actionLoading === "Log Out" ? "Logging out..." : `Loading ${actionLoading}...`} 
      />
      {showModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn"
          onClick={() => setShowModal(false)}
        >
          <div 
            className="bg-white rounded-xl shadow-xl max-w-sm w-full animate-scaleIn"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 flex flex-col items-center">
              <div className="mb-4 w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
                {modalConfig.icon}
              </div>
              <h3 className="text-xl font-bold text-center mb-2">{modalConfig.title}</h3>
              <p className="text-gray-600 text-center mb-6">{modalConfig.message}</p>
              <div className="grid grid-cols-2 gap-3 w-full">
                <button
                  onClick={modalConfig.cancelAction}
                  className="px-4 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 active:bg-gray-100 transition-colors"
                >
                  {modalConfig.cancelText}
                </button>
                <button
                  onClick={modalConfig.confirmAction}
                  className={`px-4 py-3 rounded-lg text-white font-medium ${modalConfig.confirmClass}`}
                >
                  {modalConfig.confirmText}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <TabWithCancelButton text="Settings" onClick={() => router.push("/profile")} />

      <div className="min-h-screen pt-16 px-4 bg-background">
        <div className="max-w-md mx-auto">
          <div className="w-full mt-4">
            {settingsItems.map((item, index) => (
              <div
                key={index}
                className={`mb-2 p-3 rounded-lg flex items-center justify-between w-full ${
                  item.highlight ? "bg-red-50" : "hover:bg-gray-50"
                } cursor-pointer`}
                onClick={() => handleMenuAction(item)}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-full ${item.highlight ? "bg-red-100" : "bg-tertiary"} flex items-center justify-center`}
                  >
                    {item.icon}
                  </div>
                  <span className={`font-medium ${item.highlight ? "text-red" : "text-gray-800"}`}>{item.title}</span>
                </div>
                <Icon icon="ph:caret-right" className={`w-5 h-5 ${item.highlight ? "text-red" : "text-gray-400"}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default SettingsPage

