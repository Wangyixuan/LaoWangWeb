"use client"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown } from "lucide-react"

export default function PublicNav() {
  const [appsOpen, setAppsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setAppsOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const t = {
    home: "Home",
    apps: "Apps",
    contact: "Contact Us",
    appList: [
      { name: "We Feel", desc: "Emotion Sharing Community", href: "/apps/wefeel" },
      { name: "Coming Soon", desc: "More apps coming soon...", href: "#" },
    ]
  }

  return (
    <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="ghost">{t.home}</Button>
          </Link>
          
          <div className="relative" ref={dropdownRef}>
            <Button 
              variant="ghost" 
              className="flex items-center gap-1"
              onClick={() => setAppsOpen(!appsOpen)}
            >
              {t.apps}
              <ChevronDown className={`w-4 h-4 transition-transform ${appsOpen ? 'rotate-180' : ''}`} />
            </Button>
            
            {appsOpen && (
              <div className="absolute top-full left-0 mt-2 w-64 bg-white border rounded-lg shadow-xl p-2 z-50">
                {t.appList.map((app, i) => (
                  <Link 
                    key={i} 
                    href={app.href}
                    onClick={() => setAppsOpen(false)}
                    className="block p-3 hover:bg-gray-50 rounded-md transition-colors"
                  >
                    <div className="font-bold text-sm">{app.name}</div>
                    <div className="text-xs text-gray-500">{app.desc}</div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
