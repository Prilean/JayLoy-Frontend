"use client"

import React, { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Icon } from "@iconify/react"
import LoadingOverlay from "@/components/LoadingOverlay"

const NavBar: React.FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const [navLoading, setNavLoading] = useState<string | null>(null)

  const handleNavigation = (route: string, label: string) => {
    setNavLoading(label)
    router.push(route)
    
    setTimeout(() => {
      setNavLoading(null)
    }, 1000)
  }

  const getActiveIndex = () => {
    switch (pathname) {
      case '/':
        return 0
      case '/chart':
        return 1
      case '/transaction':
        return 2
      case '/report':
        return 3
      default:
        // Check if the pathname starts with '/profile' to handle profile and its child pages
        return pathname.startsWith('/profile') ? 4 : 0
    }
  }

  return (
    <div>
      
      <div className="fixed z-50 w-full h-16 max-w-lg -translate-x-1/2 rounded-xl bottom-0 left-1/2 shadow-lg bg-white">
        <div className="relative grid h-full max-w-lg grid-cols-5 mx-auto">
          {/* Active Indicator */}
          <div 
            className="absolute bottom-0 h-1 bg-primary transition-transform duration-300 ease-in-out"
            style={{
              width: '20%',
              transform: `translateX(${getActiveIndex() * 100}%)`
            }}
          />
          
          {/* Home Button */}
          <button
            type="button"
            onClick={() => handleNavigation("/", "Home")}
            className={`inline-flex flex-col items-center justify-center px-5 group text-gray-500 hover:text-primary transition-colors duration-200 ${pathname === '/' ? 'text-primary' : ''}`}
          >
            <Icon icon="lucide:house" width="24" height="24" />
            <span className="sr-only">Home</span>
          </button>

          {/* Chart Button */}
          <button
            type="button"
            onClick={() => handleNavigation("/chart", "Charts")}
            className={`inline-flex flex-col items-center justify-center px-5 group text-gray-500 hover:text-primary transition-colors duration-200 ${pathname === '/chart' ? 'text-primary' : ''}`}
          >
            <Icon icon="gg:chart" width="24" height="24" />
            <span className="sr-only">Chart</span>
          </button>

          {/* Add Button */}
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={() => handleNavigation("/transaction", "Transaction")}
              className={`inline-flex items-center justify-center w-10 h-10 font-medium bg-variant rounded-full hover:bg-primary group focus:ring-4 focus:ring-variant focus:outline-none dark:focus:ring-variant transition-colors duration-200 ${pathname === '/transaction' ? 'bg-primary' : ''}`}
            >
              <Icon icon="gg:add" width="24" height="24" className={pathname === '/transaction' ? 'text-white' : ''} />
              <span className="sr-only">New item</span>
            </button>
          </div>

          {/* Report Button */}
          <button
            type="button"
            onClick={() => handleNavigation("/report", "Reports")}
            className={`inline-flex flex-col items-center justify-center px-5 group text-gray-500 hover:text-primary transition-colors duration-200 ${pathname === '/report' ? 'text-primary' : ''}`}
          >
            <Icon icon="mi:document" width="24" height="24" />
            <span className="sr-only">Report</span>
          </button>

          {/* Profile Button */}
          <button
            type="button"
            onClick={() => handleNavigation("/profile", "Profile")}
            className={`inline-flex flex-col items-center justify-center px-5 group text-gray-500 hover:text-primary transition-colors duration-200 ${pathname === '/profile' ? 'text-primary' : ''}`}
          >
            <Icon icon="iconamoon:profile-duotone" width="24" height="24" />
            <span className="sr-only">Profile</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default NavBar
