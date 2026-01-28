"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { supabase } from "@/lib/supabase"
import imageCompression from "browser-image-compression"
import Link from "next/link"

export default function ContactPage() {
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [email, setEmail] = useState("")
  const [content, setContent] = useState("")
  const [files, setFiles] = useState<File[]>([])

  const t = {
    // 中文：联系我们
    title: "Contact Us",
    // 中文：如果你有任何建议或反馈，欢迎告诉我们。
    description: "If you have any suggestions or feedback, please let us know.",
    // 中文：邮箱地址（可选）
    email: "Email Address (Optional)",
    // 中文：反馈内容（必填）
    message: "Feedback (Required)",
    // 中文：上传图片（可选，最多 3 张）
    image: "Upload Images (Optional, max 3)",
    // 中文：提交反馈
    submit: "Submit Feedback",
    // 中文：正在提交…
    submitting: "Submitting...",
    // 中文：感谢你的反馈！
    success: "Thank you for your feedback!",
    // 中文：我们已收到你的信息，会尽快处理。
    successDesc: "We have received your message and will process it as soon as possible.",
    // 中文：提交失败，请重试
    error: "Submission failed, please try again",
    // 中文：你最多只能上传 3 张图片
    imageLimit: "You can only upload up to 3 images",
    // 中文：清除选择
    clear: "Clear selection",
    // 中文：隐私政策
    privacy: "Privacy Policy",
    // 中文：服务条款
    terms: "Terms of Service",
    // 中文：提交反馈即表示你同意我们的
    footerNote: "By submitting, you agree to our",
    // 中文：和
    and: "and",
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
              Submit Again
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
                  placeholder="your@email.com" 
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
                  placeholder="Please enter your feedback..."
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
                      <p className="font-medium">{`Selected ${files.length} images:`}</p>
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
              <p className="text-center text-xs text-muted-foreground mt-4">
                {t.footerNote}{" "}
                <Link href="/apps/wefeel/privacy" className="text-amber-600 hover:underline">
                  {t.privacy}
                </Link>
                {" "}{t.and}{" "}
                <Link href="/apps/wefeel/terms" className="text-amber-600 hover:underline">
                  {t.terms}
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
