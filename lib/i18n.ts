export type Locale = "zh" | "en"

export const translations = {
  zh: {
    nav: {
      home: "首页",
      feedback: "用户反馈",
      language: "Language",
    },
    home: {
      title: "We Feel",
      subtitle: "分享你的感受，连接彼此",
      download: "下载应用",
      features: "功能特性",
      userFeedback: "用户反馈",
      viewAll: "查看全部",
    },
    feedback: {
      title: "用户反馈",
      noFeedback: "暂无反馈",
      meToo: "我也",
      likes: "个赞",
    },
    admin: {
      login: {
        title: "管理员登录",
        password: "密码",
        submit: "登录",
        error: "密码错误",
      },
      dashboard: {
        title: "审核后台",
        stats: {
          total: "总记录",
          pending: "待审核",
          approved: "已通过",
          rejected: "已拒绝",
        },
        filters: {
          status: "状态",
          lang: "语言",
          moodType: "心情类型",
          search: "搜索内容",
        },
        actions: {
          approve: "通过",
          reject: "拒绝",
          review: "审核",
          batchApprove: "批量通过",
          batchReject: "批量拒绝",
          export: "导出 CSV",
        },
        table: {
          id: "ID",
          createdAt: "创建时间",
          content: "内容",
          moodColor: "心情颜色",
          meTooCount: "点赞数",
          authorID: "作者ID",
          moodType: "心情类型",
          lang: "语言",
          status: "状态",
          actions: "操作",
        },
        noData: "暂无数据",
        selectItems: "已选择 {count} 项",
      },
      logout: "退出登录",
    },
    status: {
      pending: "待审核",
      approved: "已通过",
      rejected: "已拒绝",
    },
  },
  en: {
    nav: {
      home: "Home",
      feedback: "Feedback",
      language: "语言",
    },
    home: {
      title: "We Feel",
      subtitle: "Share your feelings, connect with others",
      download: "Download App",
      features: "Features",
      userFeedback: "User Feedback",
      viewAll: "View All",
    },
    feedback: {
      title: "User Feedback",
      noFeedback: "No feedback yet",
      meToo: "Me too",
      likes: "likes",
    },
    admin: {
      login: {
        title: "Admin Login",
        password: "Password",
        submit: "Login",
        error: "Incorrect password",
      },
      dashboard: {
        title: "Review Dashboard",
        stats: {
          total: "Total",
          pending: "Pending",
          approved: "Approved",
          rejected: "Rejected",
        },
        filters: {
          status: "Status",
          lang: "Language",
          moodType: "Mood Type",
          search: "Search content",
        },
        actions: {
          approve: "Approve",
          reject: "Reject",
          review: "Review",
          batchApprove: "Batch Approve",
          batchReject: "Batch Reject",
          export: "Export CSV",
        },
        table: {
          id: "ID",
          createdAt: "Created At",
          content: "Content",
          moodColor: "Mood Color",
          meTooCount: "Likes",
          authorID: "Author ID",
          moodType: "Mood Type",
          lang: "Language",
          status: "Status",
          actions: "Actions",
        },
        noData: "No data",
        selectItems: "{count} items selected",
      },
      logout: "Logout",
    },
    status: {
      pending: "Pending",
      approved: "Approved",
      rejected: "Rejected",
    },
  },
} as const

export function getTranslations(locale: Locale) {
  return translations[locale]
}
