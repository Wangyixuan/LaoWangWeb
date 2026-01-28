import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function PrivacyContent() {
  const content = {
    // 中文：隐私政策
    title: "Privacy Policy",
    // 中文：最近更新日期：2026 年 2 月 1 日
    lastUpdated: "Last updated: February 1, 2026",
    sections: [
      {
        // 中文：1. 关于 We Feel
        title: "1. What We Feel Is",
        // 中文：We Feel 是一款匿名情绪分享应用，用于表达与支持情绪，并非医疗或心理治疗服务。
        content: "We Feel is an anonymous emotional sharing application. It allows users to express how they feel and to support others' emotions. We Feel is NOT a medical, psychological, or therapeutic service."
      },
      {
        // 中文：2. 我们收集的信息
        title: "2. Information We Collect",
        subsections: [
          {
            // 中文：2.1 你提供的信息
            title: "2.1 Information You Provide",
            items: [
              // 中文：你选择分享的简短情绪文本
              "Short emotional text you choose to share",
              // 中文：可选的账号信息（如使用 Apple 或邮箱登录）
              "Optional account information (if you sign in with Apple or email)"
            ],
            // 中文：我们不要求真实姓名、头像或个人简介等信息。
            note: "We do NOT require real names, profile photos, or personal descriptions."
          },
          {
            // 中文：2.2 我们自动收集的信息
            title: "2.2 Automatically Collected Information",
            items: [
              // 中文：基础设备信息（如设备类型、系统版本）
              "Basic device information (such as device type, operating system version)",
              // 中文：应用使用事件（仅用于稳定性与性能）
              "App usage events (for stability and performance purposes only)"
            ],
            // 中文：我们不会收集：精确位置信息、联系人、照片或媒体文件（除非你主动操作）、健康或医疗记录等。
            note: "We do NOT collect: Precise location data, Contacts, Photos or media files without your action, Health or medical records."
          }
        ]
      },
      {
        // 中文：3. 我们如何使用你的信息
        title: "3. How We Use Your Information",
        items: [
          // 中文：在应用内展示情绪内容
          "Display emotional content within the app",
          // 中文：让他人可以对你的情绪内容表达支持
          "Allow others to show support for shared emotions",
          // 中文：维护应用功能、安全性与性能
          "Maintain app functionality, safety, and performance",
          // 中文：预防滥用、垃圾信息或有害行为
          "Prevent abuse, spam, or harmful behavior"
        ],
        // 中文：我们不会将你的数据用于广告，也不会跨应用或网站进行跟踪。
        note: "We do NOT use your data for advertising or tracking across apps or websites."
      },
      {
        // 中文：4. 匿名性与情绪内容
        title: "4. Anonymity and Emotional Content",
        // 中文：情绪内容默认匿名展示，请不要在内容中包含可识别个人身份的信息；内容可能以汇总或匿名形式对他人可见。
        content: "Emotional content shared on We Feel is anonymous by default. Please do not include personal identifying information in your emotional text. Once shared, emotional content may be visible to others in an aggregated or anonymous form."
      },
      {
        // 中文：5. 敏感情境
        title: "5. Sensitive Situations",
        // 中文：We Feel 不提供危机干预或专业心理健康服务，如遇严重困扰或危险，请联系当地紧急服务或专业人士。
        content: "We Feel does not provide crisis support or professional mental health services. If you are experiencing severe distress or are in danger, please seek help from local emergency services or qualified professionals."
      },
      {
        // 中文：6. 数据存储与安全
        title: "6. Data Storage and Security",
        // 中文：我们会采取合理措施保护你的信息，但任何系统都无法百分之百安全，你需知悉并接受该风险。
        content: "We take reasonable measures to protect your information against unauthorized access, loss, or misuse. However, no system is completely secure. By using We Feel, you acknowledge and accept this risk."
      },
      {
        // 中文：7. 数据保留
        title: "7. Data Retention",
        items: [
          // 中文：情绪内容会在提供服务所必需的期间内保留
          "Emotional content may be retained as long as necessary to operate the service",
          // 中文：你可以随时请求删除自己的内容或账号
          "You may request deletion of your content or account at any time"
        ]
      },
      {
        // 中文：8. 儿童隐私
        title: "8. Children's Privacy",
        // 中文：We Feel 不针对 13 岁以下儿童，我们也不会有意收集儿童的个人数据。
        content: "We Feel is not intended for children under the age of 13. We do not knowingly collect personal data from children."
      },
      {
        // 中文：9. 本政策的变更
        title: "9. Changes to This Policy",
        // 中文：我们可能不时更新本隐私政策，变更会通过更新“最近更新”日期体现。
        content: "We may update this Privacy Policy from time to time. Changes will be reflected by updating the \"Last updated\" date."
      },
      {
        // 中文：10. 联系方式
        title: "10. Contact",
        // 中文：如对本隐私政策有疑问，请通过页脚中的“联系我们”页面与我们取得联系。
        content: "If you have questions about this Privacy Policy, please contact us via the Contact Us page linked in the footer."
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
            {section.subsections && (
              <div className="space-y-6 ml-4">
                {section.subsections.map((sub, i) => (
                  <div key={i} className="space-y-3">
                    <h3 className="text-lg font-medium text-amber-700">{sub.title}</h3>
                    <ul className="list-disc list-inside space-y-1 text-gray-700 ml-4">
                      {sub.items.map((item, j) => (
                        <li key={j}>{item}</li>
                      ))}
                    </ul>
                    {sub.note && <p className="text-sm text-amber-600/80 italic">{sub.note}</p>}
                  </div>
                ))}
              </div>
            )}
            {section.note && <p className="text-sm text-amber-600/80 italic mt-2">{section.note}</p>}
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <PrivacyContent />
    </div>
  )
}
