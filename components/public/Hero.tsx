import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface HeroProps {
  locale: "zh" | "en"
}

export default function Hero({ locale }: HeroProps) {
  const t = locale === "zh" 
    ? {
        title: "We Feel",
        subtitle: "分享你的感受，连接彼此",
        description: "一个让你自由表达情感、找到共鸣的平台",
        download: "下载应用",
        appStore: "App Store",
        googlePlay: "Google Play",
      }
    : {
        title: "We Feel",
        subtitle: "Share your feelings, connect with others",
        description: "A platform where you can freely express emotions and find resonance",
        download: "Download App",
        appStore: "App Store",
        googlePlay: "Google Play",
      }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-500 to-yellow-600 bg-clip-text text-transparent">
              {t.title}
            </h1>
            <p className="text-2xl text-gray-700">{t.subtitle}</p>
            <p className="text-lg text-gray-600">{t.description}</p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-white">
                {t.appStore}
              </Button>
            </div>
          </div>
          <div className="relative">
            <Card className="p-8 bg-white/80 backdrop-blur-sm shadow-2xl overflow-hidden border-amber-100">
              <div className="aspect-square relative rounded-lg flex items-center justify-center overflow-hidden shadow-inner bg-amber-50">
                <Image 
                  src="/images/appStoreLogo.png" 
                  alt="We Feel Logo" 
                  fill
                  className="object-cover"
                />
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
