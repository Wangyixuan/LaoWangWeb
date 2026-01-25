"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function LanguageSwitcher() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const currentLang = searchParams.get("lang") || "zh"

  const toggleLanguage = () => {
    const newLang = currentLang === "zh" ? "en" : "zh"
    const params = new URLSearchParams(searchParams.toString())
    params.set("lang", newLang)
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <Button variant="outline" onClick={toggleLanguage}>
      {currentLang === "zh" ? "English" : "中文"}
    </Button>
  )
}
