"use client"

import { useRouter, useSearchParams } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface FeedbackFiltersProps {
  locale: "zh" | "en"
  currentMoodType?: number
}

export default function FeedbackFilters({
  locale,
  currentMoodType,
}: FeedbackFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleMoodTypeChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === "all") {
      params.delete("moodType")
    } else {
      params.set("moodType", value)
    }
    router.push(`/feedback?${params.toString()}`)
  }

  const t = locale === "zh"
    ? {
        moodType: "心情类型",
        all: "全部",
        types: ["全部", "类型 0", "类型 1", "类型 2", "类型 3"],
      }
    : {
        moodType: "Mood Type",
        all: "All",
        types: ["All", "Type 0", "Type 1", "Type 2", "Type 3"],
      }

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium">{t.moodType}</label>
      <Select
        value={currentMoodType?.toString() || "all"}
        onValueChange={handleMoodTypeChange}
      >
        <SelectTrigger className="w-48">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {t.types.map((type, index) => (
            <SelectItem key={index} value={index === 0 ? "all" : (index - 1).toString()}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
