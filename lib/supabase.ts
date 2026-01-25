import { createClient } from "@supabase/supabase-js"
import type { Moment } from "@/types/database"

let supabaseClient:
  | ReturnType<typeof createClient>
  | null = null

function getSupabaseClient() {
  if (supabaseClient) return supabaseClient

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/;$/, "")
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim().replace(/;$/, "")

  if (!supabaseUrl || !supabaseAnonKey) {
    // 不要在模块加载时直接 throw，否则页面无法渲染（即使上层 try/catch）
    // 这里抛出时会被调用方捕获（公开页已做 catch），并且终端能看到更明确的信息
    const missing = [
      !supabaseUrl ? "NEXT_PUBLIC_SUPABASE_URL" : null,
      !supabaseAnonKey ? "NEXT_PUBLIC_SUPABASE_ANON_KEY" : null,
    ].filter(Boolean)
    throw new Error(
      `Missing Supabase environment variables: ${missing.join(", ")}. ` +
        `请确认文件名是 .env.local 且重启 npm run dev`
    )
  }

  // 验证 URL 格式
  if (!supabaseUrl.startsWith("http://") && !supabaseUrl.startsWith("https://")) {
    throw new Error(
      `Invalid Supabase URL format: ${supabaseUrl}. ` +
        `URL 必须以 http:// 或 https:// 开头`
    )
  }

  supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
    },
  })
  return supabaseClient
}

// 表名可通过环境变量覆盖（用于对接不同 Supabase 表）
// 默认值基于你当前表结构截图推测：feeds
const TABLE_NAME = "feeds"

export async function getMoments(
  statusFilter?: number, // 可选的 status 过滤，如果不传则默认排除 status=1
  page: number = 1,
  pageSize: number = 20
) {
  const supabase = getSupabaseClient()
  let query = supabase
    .from(TABLE_NAME)
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })

  // 如果指定了 statusFilter，按指定值过滤；否则默认排除 status=1（已审核通过的）
  if (statusFilter !== undefined) {
    query = query.eq("status", statusFilter)
  } else {
    // 默认排除 status=1 的数据
    query = query.neq("status", 1)
  }

  const from = (page - 1) * pageSize
  const to = from + pageSize - 1

  const { data, error, count } = await query.range(from, to)

  if (error) {
    console.error("Supabase query error:", error)
    console.error("Query details:", {
      table: TABLE_NAME,
      statusFilter,
      page,
      pageSize,
      url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    })
    // 提供更友好的错误信息
    if (error.message?.includes("Failed to fetch")) {
      throw new Error(
        `无法连接到 Supabase: ${error.message}. ` +
          `请检查：1) .env.local 中的 NEXT_PUBLIC_SUPABASE_URL 是否正确 ` +
          `2) 网络连接是否正常 3) Supabase 项目是否正常运行`
      )
    }
    throw error
  }

  return {
    data: (data || []) as Moment[],
    count: count || 0,
    totalPages: Math.ceil((count || 0) / pageSize),
  }
}

export async function getApprovedMoments(
  lang?: string,
  limit: number = 50
): Promise<Moment[]> {
  const supabase = getSupabaseClient()
  let query = supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("status", 1) // approved
    .order("created_at", { ascending: false })
    .limit(limit)

  if (lang) {
    query = query.eq("lang", lang)
  }

  const { data, error } = await query

  if (error) {
    throw error
  }

  return (data || []) as Moment[]
}

export async function updateMomentStatus(
  id: number,
  status: number
): Promise<void> {
  const supabase = getSupabaseClient()
  const { error } = await (supabase as any)
    .from(TABLE_NAME)
    .update({ status })
    .eq("id", id)

  if (error) {
    throw error
  }
}

export async function updateMomentsStatus(
  ids: number[],
  status: number
): Promise<void> {
  const supabase = getSupabaseClient()
  const { error } = await (supabase as any)
    .from(TABLE_NAME)
    .update({ status })
    .in("id", ids)

  if (error) {
    throw error
  }
}

export async function getReportedMoments(
  page: number = 1,
  pageSize: number = 20
) {
  const supabase = getSupabaseClient()
  
  // 1. 从 reports 表获取所有举报记录（包括原因）
  const { data: reportData, error: reportError } = await supabase
    .from('reports')
    .select('mood_post_id, reason')

  if (reportError) {
    throw reportError
  }

  // 2. 统计每个 post 的举报次数和原因列表
  const reportStats: Record<number, { count: number, reasons: string[] }> = {}
  reportData?.forEach((r: any) => {
    const id = Number(r.mood_post_id)
    if (id) {
      if (!reportStats[id]) {
        reportStats[id] = { count: 0, reasons: [] }
      }
      reportStats[id].count += 1
      if (r.reason && !reportStats[id].reasons.includes(r.reason)) {
        reportStats[id].reasons.push(r.reason)
      }
    }
  })

  // 3. 排序并分页 ID
  const sortedIds = Object.keys(reportStats)
    .map(Number)
    .sort((a, b) => reportStats[b].count - reportStats[a].count)

  const totalCount = sortedIds.length
  const from = (page - 1) * pageSize
  const to = from + pageSize
  const paginatedIds = sortedIds.slice(from, to)

  if (paginatedIds.length === 0) {
    return { data: [], count: 0, totalPages: 0 }
  }

  // 4. 从 feeds 表获取具体数据
  const { data: feedsData, error: feedsError } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .in("id", paginatedIds)

  if (feedsError) {
    throw feedsError
  }

  const typedFeedsData = (feedsData || []) as Moment[]

  // 5. 组装数据，保持排序，并注入 report_count 和 report_reasons
  const data = paginatedIds.map(id => {
    const feed = typedFeedsData.find(f => f.id === id)
    if (feed) {
      return {
        ...feed,
        report_count: reportStats[id].count,
        report_reasons: reportStats[id].reasons
      }
    }
    return null
  }).filter(Boolean) as Moment[]

  return {
    data,
    count: totalCount,
    totalPages: Math.ceil(totalCount / pageSize),
  }
}

export async function getMomentStats() {
  const supabase = getSupabaseClient()
  const { count: total, error: allError } = await supabase
    .from(TABLE_NAME)
    .select("status", { count: "exact", head: true })

  const { count: pending, error: pendingError } = await supabase
    .from(TABLE_NAME)
    .select("status", { count: "exact", head: true })
    .eq("status", 0)

  const { count: approved, error: approvedError } = await supabase
    .from(TABLE_NAME)
    .select("status", { count: "exact", head: true })
    .eq("status", 1)

  const { count: rejected, error: rejectedError } = await supabase
    .from(TABLE_NAME)
    .select("status", { count: "exact", head: true })
    .eq("status", 2)

  if (allError || pendingError || approvedError || rejectedError) {
    throw new Error("Failed to fetch stats")
  }

  return {
    total: total || 0,
    pending: pending || 0,
    approved: approved || 0,
    rejected: rejected || 0,
  }
}
