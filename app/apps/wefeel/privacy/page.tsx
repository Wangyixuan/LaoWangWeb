import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function PrivacyContent() {
  const content = {
    title: "Privacy Policy",
    lastUpdated: "Last updated: February 1, 2026",
    sections: [
      {
        title: "1. What We Feel Is",
        content: "We Feel is an anonymous emotional sharing application. It allows users to express how they feel and to support others' emotions. We Feel is NOT a medical, psychological, or therapeutic service."
      },
      {
        title: "2. Information We Collect",
        subsections: [
          {
            title: "2.1 Information You Provide",
            items: [
              "Short emotional text you choose to share",
              "Optional account information (if you sign in with Apple or email)"
            ],
            note: "We do NOT require real names, profile photos, or personal descriptions."
          },
          {
            title: "2.2 Automatically Collected Information",
            items: [
              "Basic device information (such as device type, operating system version)",
              "App usage events (for stability and performance purposes only)"
            ],
            note: "We do NOT collect: Precise location data, Contacts, Photos or media files without your action, Health or medical records."
          }
        ]
      },
      {
        title: "3. How We Use Your Information",
        items: [
          "Display emotional content within the app",
          "Allow others to show support for shared emotions",
          "Maintain app functionality, safety, and performance",
          "Prevent abuse, spam, or harmful behavior"
        ],
        note: "We do NOT use your data for advertising or tracking across apps or websites."
      },
      {
        title: "4. Anonymity and Emotional Content",
        content: "Emotional content shared on We Feel is anonymous by default. Please do not include personal identifying information in your emotional text. Once shared, emotional content may be visible to others in an aggregated or anonymous form."
      },
      {
        title: "5. Sensitive Situations",
        content: "We Feel does not provide crisis support or professional mental health services. If you are experiencing severe distress or are in danger, please seek help from local emergency services or qualified professionals."
      },
      {
        title: "6. Data Storage and Security",
        content: "We take reasonable measures to protect your information against unauthorized access, loss, or misuse. However, no system is completely secure. By using We Feel, you acknowledge and accept this risk."
      },
      {
        title: "7. Data Retention",
        items: [
          "Emotional content may be retained as long as necessary to operate the service",
          "You may request deletion of your content or account at any time"
        ]
      },
      {
        title: "8. Children's Privacy",
        content: "We Feel is not intended for children under the age of 13. We do not knowingly collect personal data from children."
      },
      {
        title: "9. Changes to This Policy",
        content: "We may update this Privacy Policy from time to time. Changes will be reflected by updating the \"Last updated\" date."
      },
      {
        title: "10. Contact",
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
