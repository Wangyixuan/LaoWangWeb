import Hero from "@/components/public/Hero"
import AppInfo from "@/components/public/AppInfo"

export default function WeFeelPage({
  searchParams,
}: {
  searchParams: { lang?: string }
}) {
  const locale = (searchParams.lang || "zh") as "zh" | "en"
  
  return (
    <>
      <Hero locale={locale} />
      <AppInfo locale={locale} />
    </>
  )
}
