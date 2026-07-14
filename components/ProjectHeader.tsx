"use client";

import React from "react";

interface ProjectHeaderProps {
  title: string;
  category: string;
  date: string;
  demo?: string;
  github?: string;
}

export default function ProjectHeader({
  title,
  category,
  date,
  demo,
  github,
}: ProjectHeaderProps) {
  return (
    <header className="space-y-6 pb-6 border-b border-white/10 mt-6 select-none">
      {/* Title & Badge Row */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-3xl font-bold tracking-tight text-white md:text-5xl font-display uppercase">
              {title}
            </h1>
            <span className="rounded-full bg-sky-400/10 border border-sky-400/20 px-3 py-1 text-[10px] uppercase tracking-wider text-sky-200 font-semibold font-sans">
              {category}
            </span>
          </div>
          <p className="text-xs text-zinc-500 font-medium font-sans mt-2">
            Built in {date}
          </p>
        </div>

        {/* Dynamic Interactive Action Buttons */}
        <div className="flex flex-wrap items-center gap-3">
          {demo && (
            <a
              href={demo}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-full bg-white/5 hover:bg-white/10 px-4 py-2 border border-white/10 text-xs font-semibold text-zinc-200 transition-all duration-250 cursor-pointer"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
              </span>
              <span>Live Demo</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 transition-opacity duration-200"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                />
              </svg>
            </a>
          )}

          {github && (
            <a
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 rounded-full bg-white/5 hover:bg-white/10 px-4 py-2 border border-white/10 text-xs font-semibold text-zinc-200 transition-all duration-250 cursor-pointer"
            >
              {/* GitHub SVG Icon */}
              <svg
                className="w-4 h-4 fill-zinc-400 group-hover:fill-white transition-colors duration-200"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
              <span>Repository</span>
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
