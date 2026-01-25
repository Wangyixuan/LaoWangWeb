"use client"

import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

function ContactForm() {
  const searchParams = useSearchParams()
  const locale = (searchParams.get("lang") || "zh") as "zh" | "en"
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const t = locale === "zh"
    ? {
        title: "联系我们",
        description: "如果您有任何建议或反馈，请告诉我们。",
        email: "电子邮箱",
        message: "反馈内容",
        submit: "提交反馈",
        submitting: "提交中...",
        success: "感谢您的反馈！",
        successDesc: "我们已经收到您的信息，会尽快处理。",
      }
    : {
        title: "Contact Us",
        description: "If you have any suggestions or feedback, please let us know.",
        email: "Email Address",
        message: "Feedback",
        submit: "Submit Feedback",
        submitting: "Submitting...",
        success: "Thank you for your feedback!",
        successDesc: "We have received your message and will process it as soon as possible.",
      }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // 模拟提交
    await new Promise(resolve => setTimeout(resolve, 1000))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      {submitted ? (
        <Card className="text-center py-12 border-amber-100">
          <CardContent className="space-y-4">
            <div className="text-5xl">✨</div>
            <CardTitle className="text-2xl text-amber-900">{t.success}</CardTitle>
            <p className="text-muted-foreground">{t.successDesc}</p>
            <Button variant="outline" className="border-amber-200 hover:bg-amber-50" onClick={() => setSubmitted(false)}>
              {locale === "zh" ? "再次提交" : "Submit Again"}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-amber-100">
          <CardHeader>
            <CardTitle className="text-3xl text-amber-900">{t.title}</CardTitle>
            <CardDescription>{t.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">{t.email}</Label>
                <Input id="email" type="email" required placeholder={t.email} className="focus-visible:ring-amber-500" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">{t.message}</Label>
                <Textarea
                  id="message"
                  required
                  placeholder={t.message}
                  className="min-h-[150px] focus-visible:ring-amber-500"
                />
              </div>
              <Button type="submit" className="w-full bg-amber-500 hover:bg-amber-600" disabled={loading}>
                {loading ? t.submitting : t.submit}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default function ContactPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-12 text-center">Loading...</div>}>
      <ContactForm />
    </Suspense>
  )
}
