"use client";

import { useState } from "react";
import sites from "@/data/sites";
import translations, { type Locale } from "@/data/i18n";
import SiteGrid from "@/components/SiteGrid";

export default function Dashboard() {
  const [locale, setLocale] = useState<Locale>("en");
  const t = translations[locale];

  return (
    <div className="flex flex-col flex-1 items-center bg-[#f0f4f8] font-sans dark:bg-black">
      <main className="w-full max-w-5xl px-6 py-16 sm:py-24">
        {/* Language toggle */}
        <div className="flex justify-end mb-4">
          <div className="flex gap-1 rounded-full bg-zinc-200 p-0.5 dark:bg-zinc-800">
            <button
              onClick={() => setLocale("en")}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                locale === "en"
                  ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLocale("cn")}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                locale === "cn"
                  ? "bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400"
              }`}
            >
              CN
            </button>
          </div>
        </div>

        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            {t.title}
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-zinc-600 dark:text-zinc-400">
            {t.intro}
          </p>
        </header>

        <SiteGrid sites={sites} locale={locale} />

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-zinc-500 dark:text-zinc-500">
          {t.footer}
        </footer>
      </main>
    </div>
  );
}
