export interface Moment {
  id: number
  created_at: string
  content: string
  moodColorHex: string | null
  meTooCount: number
  authorID: string
  moodType: number
  lang: string | null
  status: number // 0=pending, 1=approved, 2=rejected
  report_count?: number
  report_reasons?: string[]
}

export type MomentStatus = 0 | 1 | 2

export const STATUS_MAP = {
  0: "pending",
  1: "approved",
  2: "rejected",
} as const

export const STATUS_LABELS = {
  pending: "待审核",
  approved: "已通过",
  rejected: "已拒绝",
} as const

export const STATUS_LABELS_EN = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
} as const
