import sites from "@/data/sites";
import SiteGrid from "@/components/SiteGrid";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans dark:bg-black">
      <main className="w-full max-w-5xl px-6 py-16 sm:py-24">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            Chris&apos; Website Dashboard
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-zinc-600 dark:text-zinc-400">
            A collection of websites and projects I&apos;ve built. Each card
            links to a live site &mdash; click to visit. New projects are added
            as they ship.
          </p>
        </header>

        <SiteGrid sites={sites} />

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-zinc-500 dark:text-zinc-500">
          Built with Next.js &middot; Deployed on Vercel
        </footer>
      </main>
    </div>
  );
}
