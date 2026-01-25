import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Moment } from "@/types/database"
import { format } from "date-fns"

interface FeedbackListProps {
  moments: Moment[]
  locale: "zh" | "en"
}

export default function FeedbackList({ moments, locale }: FeedbackListProps) {
  const t = locale === "zh"
    ? {
        meToo: "我也",
        likes: "个赞",
        noFeedback: "暂无反馈",
      }
    : {
        meToo: "Me too",
        likes: "likes",
        noFeedback: "No feedback yet",
      }

  if (moments.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        {t.noFeedback}
      </div>
    )
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {moments.map((moment) => (
        <Card key={moment.id} className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                style={{
                  backgroundColor: moment.moodColorHex || "#6366f1",
                }}
              >
                {moment.moodType}
              </div>
              <Badge variant="secondary">
                {format(new Date(moment.created_at), "MM/dd")}
              </Badge>
            </div>
            <p className="text-gray-700 mb-4 line-clamp-3">{moment.content}</p>
            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{moment.lang || "N/A"}</span>
              <span>
                {moment.meTooCount} {t.likes}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
