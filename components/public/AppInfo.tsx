import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface AppInfoProps {
  locale: "zh" | "en"
}

export default function AppInfo({ locale }: AppInfoProps) {
  const t = locale === "zh"
    ? {
        title: "功能特性",
        features: [
          {
            title: "情感表达",
            description: "自由分享你的心情和感受",
            icon: "💭",
          },
          {
            title: "社区互动",
            description: "找到与你共鸣的人，互相支持",
            icon: "🤝",
          },
          {
            title: "隐私保护",
            description: "安全可靠的数据保护机制",
            icon: "🔒",
          },
          {
            title: "多语言支持",
            description: "支持中文和英文等多种语言",
            icon: "🌍",
          },
        ],
      }
    : {
        title: "Features",
        features: [
          {
            title: "Emotion Expression",
            description: "Freely share your moods and feelings",
            icon: "💭",
          },
          {
            title: "Community Interaction",
            description: "Find people who resonate with you and support each other",
            icon: "🤝",
          },
          {
            title: "Privacy Protection",
            description: "Secure and reliable data protection",
            icon: "🔒",
          },
          {
            title: "Multi-language Support",
            description: "Support for Chinese, English and more",
            icon: "🌍",
          },
        ],
      }

  return (
    <section className="py-20 bg-amber-50/30">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12 text-amber-900">{t.title}</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.features.map((feature, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow border-amber-100 hover:border-amber-300">
              <CardHeader>
                <div className="w-12 h-12 rounded-lg bg-amber-100 flex items-center justify-center text-2xl mb-2 shadow-sm">
                  {feature.icon}
                </div>
                <CardTitle className="text-amber-900">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-amber-800/70">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
