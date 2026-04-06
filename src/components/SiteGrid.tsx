"use client";

import { useState } from "react";
import Image from "next/image";
import type { Site } from "@/data/sites";

type Filter = "all" | "vibecoded" | "other";

export default function SiteGrid({ sites }: { sites: Site[] }) {
  const [filter, setFilter] = useState<Filter>("all");

  const filtered = sites.filter((site) => {
    if (filter === "vibecoded") return site.vibecoded;
    if (filter === "other") return !site.vibecoded;
    return true;
  });

  const buttons: { label: string; value: Filter }[] = [
    { label: "All", value: "all" },
    { label: "Vibecoded", value: "vibecoded" },
    { label: "Handcoded", value: "other" },
  ];

  return (
    <>
      {/* Filter bar */}
      <div className="mb-8 flex justify-center gap-2">
        {buttons.map((btn) => (
          <button
            key={btn.value}
            onClick={() => setFilter(btn.value)}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              filter === btn.value
                ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
                : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      {/* Site cards grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((site) => (
          <a
            key={site.url}
            href={site.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all hover:shadow-md hover:-translate-y-1 dark:border-zinc-800 dark:bg-zinc-900 overflow-hidden"
          >
            {/* Screenshot thumbnail */}
            <div className="relative h-40 w-full bg-zinc-100 dark:bg-zinc-800">
              <Image
                src={site.image}
                alt={`Screenshot of ${site.name}`}
                fill
                className="object-cover object-top"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>
            <div className="flex flex-col justify-between flex-1 p-6">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-semibold text-zinc-900 group-hover:text-blue-600 dark:text-zinc-50 dark:group-hover:text-blue-400">
                  {site.name}
                  <span className="ml-1 inline-block transition-transform group-hover:translate-x-1">
                    &rarr;
                  </span>
                </h2>
                {site.vibecoded && (
                  <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
                    Vibecoded
                  </span>
                )}
              </div>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {site.description}
              </p>
            </div>

            {/* Tags */}
            <div className="mt-4 flex flex-wrap gap-2">
              {site.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-zinc-100 px-3 py-0.5 text-xs font-medium text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>
            </div>
          </a>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-8 text-center text-sm text-zinc-500">
          No sites match this filter.
        </p>
      )}
    </>
  );
}
