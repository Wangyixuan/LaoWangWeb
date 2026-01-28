import Hero from "@/components/public/Hero"
import AppInfo from "@/components/public/AppInfo"
import Link from "next/link"

export default function WeFeelPage() {
  const t = {
    // 中文：隐私政策
    privacy: "Privacy Policy",
    // 中文：服务条款
    terms: "Terms of Service"
  }

  return (
    <>
      <Hero />
      <AppInfo />
      
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex justify-center gap-8 text-sm text-gray-500 font-medium">
            <Link href="/apps/wefeel/privacy" className="hover:text-amber-600 transition-colors">
              {t.privacy}
            </Link>
            <Link href="/apps/wefeel/terms" className="hover:text-amber-600 transition-colors">
              {t.terms}
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
