"use client"

import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { supabase } from "@/lib/supabase"
import imageCompression from "browser-image-compression"

function ContactForm() {
  const searchParams = useSearchParams()
  const locale = (searchParams.get("lang") || "zh") as "zh" | "en"
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState("")
  const [content, setContent] = useState("")
  const [files, setFiles] = useState<File[]>([])

  const t = locale === "zh"
    ? {
        title: "联系我们",
        description: "如果您有任何建议或反馈，请告诉我们。",
        email: "电子邮箱 (选填)",
        message: "反馈内容 (必填)",
        image: "上传图片 (可选，最多3张)",
        submit: "提交反馈",
        submitting: "提交中...",
        success: "感谢您的反馈！",
        successDesc: "我们已经收到您的信息，会尽快处理。",
        error: "提交失败，请重试",
        imageLimit: "最多只能上传3张图片",
        clear: "清除已选",
      }
    : {
        title: "Contact Us",
        description: "If you have any suggestions or feedback, please let us know.",
        email: "Email Address (Optional)",
        message: "Feedback (Required)",
        image: "Upload Images (Optional, max 3)",
        submit: "Submit Feedback",
        submitting: "Submitting...",
        success: "Thank you for your feedback!",
        successDesc: "We have received your message and will process it as soon as possible.",
        error: "Submission failed, please try again",
        imageLimit: "You can only upload up to 3 images",
        clear: "Clear selection",
      }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      if (selectedFiles.length > 3) {
        alert(t.imageLimit)
        e.target.value = "" // 清空输入
        setFiles([])
        return
      }
      setFiles(selectedFiles)
    }
  }

  const clearFiles = () => {
    setFiles([])
    const fileInput = document.getElementById('image') as HTMLInputElement
    if (fileInput) fileInput.value = ""
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!content.trim()) return

    setLoading(true)
    try {
      let imageUrls: string[] = []

      if (files.length > 0) {
        // 并行处理所有图片
        const uploadPromises = files.map(async (file, index) => {
          // 压缩图片
          const options = {
            maxSizeMB: 0.3,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
          }
          const compressedFile = await imageCompression(file, options)
          
          // 生成带序号的文件名以防冲突
          const fileExt = file.name.split('.').pop()
          const now = new Date()
          const timestamp = now.getFullYear().toString() +
            (now.getMonth() + 1).toString().padStart(2, '0') +
            now.getDate().toString().padStart(2, '0') +
            now.getHours().toString().padStart(2, '0') +
            now.getMinutes().toString().padStart(2, '0') +
            now.getSeconds().toString().padStart(2, '0')
          const fileName = `${timestamp}_${index}.${fileExt}`
          const filePath = `feedback/${fileName}`

          const { error: uploadError } = await supabase.storage
            .from('feedback')
            .upload(filePath, compressedFile)

          if (uploadError) throw uploadError

          // 获取公开 URL
          const { data: { publicUrl } } = supabase.storage
            .from('feedback')
            .getPublicUrl(filePath)
          
          return publicUrl
        })

        imageUrls = await Promise.all(uploadPromises)
      }

      // 上传数据到 feedback 表
      const { error: insertError } = await supabase
        .from('feedback')
        .insert([
          {
            email: email.trim() || null,
            content: content.trim(),
            img: imageUrls.length > 0 ? imageUrls.join(',') : null,
          }
        ])

      if (insertError) throw insertError

      setSubmitted(true)
    } catch (err) {
      console.error("Error submitting feedback:", err)
      alert(t.error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      {submitted ? (
        <Card className="text-center py-12 border-amber-100">
          <CardContent className="space-y-4">
            <div className="text-5xl">✨</div>
            <CardTitle className="text-2xl text-amber-900">{t.success}</CardTitle>
            <p className="text-muted-foreground">{t.successDesc}</p>
            <Button variant="outline" className="border-amber-200 hover:bg-amber-50" onClick={() => {
              setSubmitted(false)
              setEmail("")
              setContent("")
              setFiles([])
            }}>
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
                <Input 
                  id="email" 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={locale === "zh" ? "your@email.com" : "your@email.com"} 
                  className="focus-visible:ring-amber-500" 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">{t.message}</Label>
                <Textarea
                  id="message"
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder={locale === "zh" ? "请输入您的反馈内容..." : "Please enter your feedback..."}
                  className="min-h-[150px] focus-visible:ring-amber-500"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="image">{t.image}</Label>
                <Input
                  id="image"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileChange}
                  disabled={files.length >= 3}
                  className="cursor-pointer focus-visible:ring-amber-500 file:bg-amber-50 file:text-amber-700 file:border-0 file:rounded-md file:px-4 file:py-1 file:mr-4 hover:file:bg-amber-100 disabled:opacity-50 disabled:cursor-not-allowed"
                />
                {files.length > 0 && (
                  <div className="text-xs text-muted-foreground mt-2 space-y-2">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{locale === "zh" ? `已选择 ${files.length} 张图片:` : `Selected ${files.length} images:`}</p>
                      <button 
                        type="button" 
                        onClick={clearFiles}
                        className="text-amber-600 hover:text-amber-700 font-medium underline"
                      >
                        {t.clear}
                      </button>
                    </div>
                    <ul className="list-disc pl-4">
                      {files.map((f, i) => (
                        <li key={i} className="truncate">{f.name}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              <Button 
                type="submit" 
                className="w-full bg-amber-500 hover:bg-amber-600" 
                disabled={loading || !content.trim()}
              >
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
