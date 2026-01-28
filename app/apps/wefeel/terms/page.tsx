import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function TermsContent() {
  const content = {
    // 中文：服务条款
    title: "Terms of Service",
    // 中文：最近更新日期：2026 年 2 月 1 日
    lastUpdated: "Last updated: February 1, 2026",
    sections: [
      {
        // 中文：1. 条款的接受
        title: "1. Acceptance of Terms",
        // 中文：使用 We Feel 即表示你同意遵守本服务条款及隐私政策，如不同意，请停止使用。
        content: "By accessing or using We Feel, you agree to be bound by these Terms and our Privacy Policy. If you do not agree, please do not use the app."
      },
      {
        // 中文：2. 服务目的
        title: "2. Purpose of the Service",
        // 中文：We Feel 提供分享情绪和互相支持的空间，并不提供医疗建议、诊断或治疗。
        content: "We Feel provides a space to share emotional expressions and to support others. We Feel does not offer medical advice, diagnosis, or treatment."
      },
      {
        // 中文：3. 用户责任
        title: "3. User Responsibilities",
        items: [
          // 中文：不得发布鼓励自残或自杀的内容
          "Do not share content that promotes self-harm or suicide",
          // 中文：不得发布仇恨、辱骂或威胁性内容
          "Do not share content that is hateful, abusive, or threatening",
          // 中文：不得包含可识别个人身份的信息
          "Do not include personal identifying information",
          // 中文：不得尝试破坏或干扰服务
          "Do not attempt to harm or disrupt the service"
        ],
        // 中文：如违反上述规则，我们有权限制或删除相关内容。
        note: "We reserve the right to restrict or remove content that violates these rules."
      },
      {
        // 中文：4. 情绪内容免责声明
        title: "4. Emotional Content Disclaimer",
        // 中文：应用内内容仅反映个人感受，不构成专业建议，支持行为代表理解而非认可。
        content: "Content shared on We Feel reflects personal feelings and does not represent professional advice. Support actions (such as taps or counts) indicate acknowledgment, not endorsement."
      },
      {
        // 中文：5. 账号与访问
        title: "5. Account and Access",
        // 中文：你可以在有账号或无账号的情况下使用 We Feel，如违反条款我们有权暂停或终止访问。
        content: "You may use We Feel with or without creating an account. We reserve the right to suspend or terminate access if these Terms are violated."
      },
      {
        // 中文：6. 知识产权
        title: "6. Intellectual Property",
        items: [
          // 中文：应用内的内容、设计与品牌归 We Feel 或其许可方所有
          "All app content, design, and branding belong to We Feel or its licensors",
          // 中文：你保留自己创作的情绪内容的所有权，但授予 We Feel 在应用内展示的有限许可
          "You retain ownership of the emotional content you create, but grant We Feel a limited license to display it within the app"
        ]
      },
      {
        // 中文：7. 责任限制
        title: "7. Limitation of Liability",
        // 中文：We Feel 按“原样”提供，我们不对情绪结果、理解或基于内容采取的行为负责。
        content: "We Feel is provided \"as is\" without warranties of any kind. We are not responsible for emotional outcomes, interpretations, or actions taken based on content shared in the app."
      },
      {
        // 中文：8. 条款变更
        title: "8. Changes to the Terms",
        // 中文：我们可能不时更新服务条款，继续使用即视为接受更新后的条款。
        content: "We may update these Terms from time to time. Continued use of We Feel means acceptance of the updated Terms."
      },
      {
        // 中文：9. 适用法律
        title: "9. Governing Law",
        // 中文：本条款适用与你所在地区相关的当地法律。
        content: "These Terms are governed by applicable local laws, depending on your region of use."
      },
      {
        // 中文：10. 联系方式
        title: "10. Contact",
        // 中文：如对本条款有疑问，请通过页脚中的“联系我们”页面与我们取得联系。
        content: "For questions about these Terms, please contact us via the Contact Us page linked in the footer."
      }
    ]
  }

  return (
    <Card className="max-w-4xl mx-auto my-12 shadow-sm border-amber-100">
      <CardHeader className="bg-amber-50/50 border-b border-amber-100">
        <CardTitle className="text-3xl font-bold text-amber-900">{content.title}</CardTitle>
        <p className="text-sm text-amber-700/60 mt-2">{content.lastUpdated}</p>
      </CardHeader>
      <CardContent className="p-8 space-y-8">
        {content.sections.map((section, idx) => (
          <div key={idx} className="space-y-4">
            <h2 className="text-xl font-semibold text-amber-800">{section.title}</h2>
            {typeof section.content === 'string' ? (
              <p className="text-gray-700 leading-relaxed">{section.content}</p>
            ) : (
              <div className="text-gray-700 leading-relaxed">{section.content}</div>
            )}
            {section.items && (
              <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                {section.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}
            {section.note && <p className="text-sm text-amber-600/80 italic mt-2">{section.note}</p>}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <TermsContent />
    </div>
  )
}
