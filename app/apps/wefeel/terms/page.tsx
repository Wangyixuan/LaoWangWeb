import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

function TermsContent() {
  const content = {
    title: "Terms of Service",
    lastUpdated: "Last updated: February 1, 2026",
    sections: [
      {
        title: "1. Acceptance of Terms",
        content: "By accessing or using We Feel, you agree to be bound by these Terms and our Privacy Policy. If you do not agree, please do not use the app."
      },
      {
        title: "2. Purpose of the Service",
        content: "We Feel provides a space to share emotional expressions and to support others. We Feel does not offer medical advice, diagnosis, or treatment."
      },
      {
        title: "3. User Responsibilities",
        items: [
          "Do not share content that promotes self-harm or suicide",
          "Do not share content that is hateful, abusive, or threatening",
          "Do not include personal identifying information",
          "Do not attempt to harm or disrupt the service"
        ],
        note: "We reserve the right to restrict or remove content that violates these rules."
      },
      {
        title: "4. Emotional Content Disclaimer",
        content: "Content shared on We Feel reflects personal feelings and does not represent professional advice. Support actions (such as taps or counts) indicate acknowledgment, not endorsement."
      },
      {
        title: "5. Account and Access",
        content: "You may use We Feel with or without creating an account. We reserve the right to suspend or terminate access if these Terms are violated."
      },
      {
        title: "6. Intellectual Property",
        items: [
          "All app content, design, and branding belong to We Feel or its licensors",
          "You retain ownership of the emotional content you create, but grant We Feel a limited license to display it within the app"
        ]
      },
      {
        title: "7. Limitation of Liability",
        content: "We Feel is provided \"as is\" without warranties of any kind. We are not responsible for emotional outcomes, interpretations, or actions taken based on content shared in the app."
      },
      {
        title: "8. Changes to the Terms",
        content: "We may update these Terms from time to time. Continued use of We Feel means acceptance of the updated Terms."
      },
      {
        title: "9. Governing Law",
        content: "These Terms are governed by applicable local laws, depending on your region of use."
      },
      {
        title: "10. Contact",
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
