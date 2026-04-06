export interface Site {
  name: string;
  url: string;
  description: string;
  tags: string[];
  vibecoded: boolean;
  image: string;
}

/**
 * Add new websites here. Each entry will automatically appear on the dashboard.
 * Set vibecoded: true for projects built with vibecoding.
 * Place a screenshot in /public/screenshots/ and reference it in the image field.
 */
const sites: Site[] = [
  {
    name: "Chris' Personal Website",
    url: "https://yiyuanli939.github.io/Personal-Website/",
    description: "My personal portfolio and about-me page.",
    tags: ["Portfolio", "GitHub Pages"],
    vibecoded: false,
    image: "/screenshots/personal-website.png",
  },
  {
    name: "Species Flashcard & Search",
    url: "https://environment-platform-gexnu5d3w-yiyuanli939s-projects.vercel.app",
    description:
      "Environmental learning platform with flashcards and search, powered by Supabase and Google OAuth.",
    tags: ["Next.js", "Supabase", "Vercel"],
    vibecoded: true,
    image: "/screenshots/environment-platform.png",
  },
];

export default sites;
