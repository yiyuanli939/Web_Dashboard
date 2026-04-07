export interface Site {
  name: { en: string; cn: string };
  url: string;
  description: { en: string; cn: string };
  tags: string[];
  vibecoded: boolean;
  image: string;
  lastUpdated: string;
}

/**
 * Add new websites here. Each entry will automatically appear on the dashboard.
 * Set vibecoded: true for projects built with vibecoding.
 * Place a screenshot in /public/screenshots/ and reference it in the image field.
 */
const sites: Site[] = [
  {
    name: {
      en: "Chris' Personal Website",
      cn: "李熠远的个人网站",
    },
    url: "https://yiyuanli939.github.io/Personal-Website/",
    description: {
      en: "My personal portfolio and about-me page.",
      cn: "我的个人作品集和自我介绍页面。",
    },
    tags: ["Portfolio", "GitHub Pages"],
    vibecoded: false,
    image: "/screenshots/personal-website.png",
    lastUpdated: "2026-04-06",
  },
  {
    name: {
      en: "Species Flashcard & Search",
      cn: "物种识别卡片与搜索",
    },
    url: "https://environment-platform-gexnu5d3w-yiyuanli939s-projects.vercel.app",
    description: {
      en: "Environmental learning platform with flashcards and search, powered by Supabase and Google OAuth.",
      cn: "基于 Supabase 和 Google OAuth 的环境学习平台，支持物种识别卡片与搜索功能。",
    },
    tags: ["Next.js", "Supabase", "Vercel"],
    vibecoded: true,
    image: "/screenshots/environment-platform.png",
    lastUpdated: "2026-04-06",
  },
  {
    name: {
      en: "Uneven U - Academic Sentence Classifier",
      cn: "Uneven U - 学术句子分类器",
    },
    url: "https://classification-gnboipphh-yiyuanli939s-projects.vercel.app",
    description: {
      en: "AI-powered tool that classifies academic sentences by rhetorical function, with interactive charts and saved analyses.",
      cn: "AI 驱动的学术句子分类工具，按修辞功能分类，支持交互式图表和保存分析结果。",
    },
    tags: ["Vite", "Supabase", "Vercel", "Claude API"],
    vibecoded: true,
    image: "/screenshots/classification.png",
    lastUpdated: "2026-04-06",
  },
];

export default sites;
