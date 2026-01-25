import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Code, Sparkles, Layout } from "lucide-react"

export default function HomePage({
  searchParams,
}: {
  searchParams: { lang?: string }
}) {
  const locale = (searchParams.lang || "zh") as "zh" | "en"
  
  const t = locale === "zh"
    ? {
        welcome: "欢迎来到我的创作空间",
        subtitle: "我是 [你的名字]，一名热衷于创造有趣且实用应用的开发者。",
        explore: "探索我的应用",
        philosophy: {
          title: "设计理念",
          items: [
            { title: "极简主义", desc: "专注于核心价值，拒绝冗余功能。", icon: <Layout className="w-8 h-8 text-blue-500" /> },
            { title: "用户体验", desc: "每一处细节都经过精心打磨。", icon: <Sparkles className="w-8 h-8 text-purple-500" /> },
            { title: "技术驱动", desc: "使用最前沿的技术构建稳定应用。", icon: <Code className="w-8 h-8 text-indigo-500" /> },
          ]
        },
      }
    : {
        welcome: "Welcome to My Creative Space",
        subtitle: "I'm [Your Name], a developer passionate about creating fun and useful applications.",
        explore: "Explore My Apps",
        philosophy: {
          title: "Philosophy",
          items: [
            { title: "Minimalism", desc: "Focus on core value, reject redundant features.", icon: <Layout className="w-8 h-8 text-blue-500" /> },
            { title: "User Experience", desc: "Every detail is carefully polished.", icon: <Sparkles className="w-8 h-8 text-purple-500" /> },
            { title: "Tech Driven", desc: "Build stable apps with cutting-edge tech.", icon: <Code className="w-8 h-8 text-indigo-500" /> },
          ]
        },
      }

  return (
    <div className="flex flex-col gap-20 py-20">
      {/* Hero Section */}
      <section className="container mx-auto px-4 text-center space-y-8">
        <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight">
          {t.welcome}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {t.subtitle}
        </p>
        <div className="flex justify-center gap-4">
          <Link href={`/apps/wefeel?lang=${locale}`}>
            <Button size="lg" className="rounded-full px-8">
              {t.explore} <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">{t.philosophy.title}</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {t.philosophy.items.map((item, i) => (
              <div key={i} className="text-center space-y-4">
                <div className="flex justify-center">{item.icon}</div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  )
}
