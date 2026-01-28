import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function AppInfo() {
  const t = {
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
        description: "Support for English, Chinese and more",
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
