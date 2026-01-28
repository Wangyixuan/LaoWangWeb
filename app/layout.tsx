import "./globals.css"
import { Suspense } from "react"
import Link from "next/link"
import PublicNav from "@/components/public/PublicNav"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Suspense fallback={
          <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
            <div className="container mx-auto px-4 py-4 flex items-center justify-between">
              <div className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent">
                We Feel
              </div>
            </div>
          </nav>
        }>
          <PublicNav />
        </Suspense>
        <main className="flex-1">{children}</main>
        <footer className="border-t bg-gray-50 py-12 mt-20">
          <div className="container mx-auto px-4 text-center space-y-4">
            <div className="flex justify-center gap-6 text-sm text-gray-500">
              {/* 中文：联系我们入口 */}
              <Link href="/contact" className="hover:text-amber-600 transition-colors font-medium">
                Contact Us
              </Link>
            </div>
            {/* 中文：版权说明 —— 2026 Lao Wang，保留所有权利。 */}
            <p className="text-gray-400 text-xs">&copy; 2026 Lao Wang. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
