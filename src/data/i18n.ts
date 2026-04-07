export type Locale = "en" | "cn";

const translations = {
  en: {
    title: "Chris Li's Website Dashboard",
    intro:
      "A collection of websites and projects I've built. Each card links to a live site — click to visit. New projects are added as they ship.",
    all: "All",
    vibecoded: "Vibecoded",
    handcoded: "Handcoded",
    noMatch: "No sites match this filter.",
    footer: "Built with Next.js · Deployed on Vercel",
    lastUpdated: "Last updated",
  },
  cn: {
    title: "李熠远的网站仪表板",
    intro:
      "我搭建的网站和项目合集。每张卡片链接到一个在线网站——点击即可访问。新项目上线后会自动添加。",
    all: "全部",
    vibecoded: "AI 编程",
    handcoded: "手写代码",
    noMatch: "没有符合此筛选条件的网站。",
    footer: "使用 Next.js 构建 · 部署于 Vercel",
    lastUpdated: "最后更新",
  },
} as const;

export default translations;
