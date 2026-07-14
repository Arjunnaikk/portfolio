"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import GlowCard from "./GlowCard";

interface Project {
  id: string;
  name: string;
  category: "web3" | "fullstack" | "tools-ai";
  categoryLabel: string;
  tag: string;
  description: string;
  href: string;
  glowColor: "sky" | "emerald" | "white";
  stack: string[];
}

const PROJECTS_DATA: Project[] = [
  {
    id: "1",
    name: "meblog",
    category: "web3",
    categoryLabel: "Solana",
    tag: "solana",
    description: "Decentralized blogging platform on Solana, featuring censorship-resistant post ownership verified on-chain. Built with program derived addresses (PDA) for deterministic queries.",
    href: "/n/1",
    glowColor: "sky",
    stack: ["Solana", "Rust", "Anchor", "Next.js", "TanStack Query"],
  },
  {
    id: "2",
    name: "cotask",
    category: "fullstack",
    categoryLabel: "Real-time",
    tag: "realtime",
    description: "Collaborative task management app with instant real-time sync, optimistic updates, and team workspaces.",
    href: "/n/2",
    glowColor: "sky",
    stack: ["Next.js", "Tailwind CSS", "NextAuth.js", "Cloudflare D1"],
  },
  {
    id: "3",
    name: "pesca",
    category: "fullstack",
    categoryLabel: "Education",
    tag: "education",
    description: "Interactive DSA learning and algorithm visualization platform featuring a multi-language in-browser IDE.",
    href: "/n/3",
    glowColor: "sky",
    stack: ["Next.js", "React", "Monaco Editor", "Docker"],
  },
  {
    id: "4",
    name: "mywallet",
    category: "tools-ai",
    categoryLabel: "AI & Tools",
    tag: "ai",
    description: "AI-powered personal finance tracker and conversational ledger that automates expense entry and categorization.",
    href: "/n/4",
    glowColor: "emerald",
    stack: ["Next.js", "OpenAI API", "PostgreSQL", "Tailwind CSS"],
  },
  {
    id: "5",
    name: "meetwise",
    category: "fullstack",
    categoryLabel: "Geospatial",
    tag: "maps",
    description: "Collaborative geospatial platform for calculating the fairest meeting spots between multiple locations.",
    href: "/n/5",
    glowColor: "sky",
    stack: ["Next.js", "Mapbox GL", "Socket.io", "Express.js"],
  },
  {
    id: "6",
    name: "solfit",
    category: "web3",
    categoryLabel: "Web3",
    tag: "web3",
    description: "Blockchain-powered fitness accountability application motivating users through stake-based commitments. Ensures high motivation by staking SOL on personal milestones.",
    href: "/n/6",
    glowColor: "sky",
    stack: ["Solana", "Rust", "Anchor", "React", "Web3.js"],
  },
  {
    id: "7",
    name: "gibmoni",
    category: "web3",
    categoryLabel: "Web3",
    tag: "funding",
    description: "Milestone-based crowdfunding platform on Solana ensuring fund release only upon validation of goals.",
    href: "/n/7",
    glowColor: "sky",
    stack: ["Solana", "Rust", "Anchor", "Next.js"],
  },
  {
    id: "8",
    name: "fast io",
    category: "tools-ai",
    categoryLabel: "AI & Tools",
    tag: "java",
    description: "High-performance custom Java I/O library tailored for speed in algorithmic competitive programming.",
    href: "/n/8",
    glowColor: "white",
    stack: ["Java", "Buffer Management", "Algorithms"],
  },
];

type CategoryFilter = "all" | "web3" | "fullstack" | "tools-ai";

interface FilterTab {
  id: CategoryFilter;
  label: string;
}

const TABS: FilterTab[] = [
  { id: "all", label: "All Projects" },
  { id: "web3", label: "Solana / Web3" },
  { id: "fullstack", label: "Full-Stack" },
  { id: "tools-ai", label: "Tools / AI" },
];

export default function ProjectsSection() {
  const [activeTab, setActiveTab] = useState<CategoryFilter>("all");

  const filteredProjects = PROJECTS_DATA.filter((project) => {
    if (activeTab === "all") return true;
    return project.category === activeTab;
  });

  return (
    <section className="space-y-8">
      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-white/5 pb-6">
        <div className="flex flex-wrap gap-1 rounded-full border border-white/10 bg-zinc-950/40 p-1 backdrop-blur-sm">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative rounded-full px-4 py-2 text-xs font-medium tracking-tight transition-colors duration-200 outline-none select-none ${
                  isActive ? "text-white" : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="activeProjectTab"
                    className="absolute inset-0 z-0 rounded-full bg-white/5 border border-white/10"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Animated Projects Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => {
            // Determine bento grid card type:
            // index 0, 6, 12... is large-normal (col-span-2)
            // index 3, 9, 15... is large-reversed (col-span-2)
            // others are small (col-span-1)
            const isLargeNormal = index % 6 === 0;
            const isLargeReversed = index % 6 === 3;
            const isLarge = isLargeNormal || isLargeReversed;

            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className={`w-full ${isLarge ? "md:col-span-2" : "md:col-span-1"}`}
              >
                <GlowCard href={project.href} glowColor={project.glowColor} className="group h-full">
                  <div className="flex flex-col justify-between h-full">
                    
                    {/* Header: Title and Category Tag */}
                    <div>
                      <div className={`flex items-center justify-between gap-3 ${
                        isLargeReversed ? "md:flex-row-reverse" : ""
                      }`}>
                        <span className={`text-base font-medium text-white group-hover:text-sky-200 transition-colors duration-200 ${
                          isLarge ? "text-lg font-semibold" : ""
                        }`}>
                          {project.name}
                        </span>
                        <span className={`text-[10px] uppercase tracking-[0.24em] text-zinc-500 font-semibold ${
                          isLarge ? "rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-[9px] tracking-wider text-zinc-400" : ""
                        }`}>
                          {project.categoryLabel}
                        </span>
                      </div>
                      
                      {/* Description - Occupies full horizontal space */}
                      <p className={`mt-3 text-sm leading-6 text-zinc-400 font-normal ${
                        isLargeReversed ? "md:text-right" : "text-left"
                      }`}>
                        {project.description}
                      </p>
                    </div>

                    {/* Footer Area: Tech Stack & Actions */}
                    <div>
                      {/* Tech Stack Row */}
                      <div className={`mt-6 flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.04] ${
                        isLargeReversed ? "md:justify-end" : "justify-start"
                      }`}>
                        {project.stack.map((tech) => (
                          <span
                            key={tech}
                            className="rounded bg-white/[0.03] border border-white/[0.06] px-2 py-0.5 text-[10px] text-zinc-400 font-medium font-sans"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Action Link Row */}
                      {isLargeReversed ? (
                        <div className="mt-4 flex items-center text-[11px] font-medium text-zinc-500 group-hover:text-white transition-colors duration-200 justify-between md:justify-start">
                          {/* Mobile View: Standard align right */}
                          <div className="flex md:hidden items-center justify-end w-full">
                            <span className="opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                              Read case study
                            </span>
                            <span className="ml-1.5 transition-transform duration-200 group-hover:translate-x-1">→</span>
                          </div>
                          {/* Desktop View: Reversed left-pointing align */}
                          <div className="hidden md:flex items-center justify-start">
                            <span className="mr-1.5 transition-transform duration-200 group-hover:-translate-x-1">←</span>
                            <span className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                              Read case study
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="mt-4 flex items-center justify-end text-[11px] font-medium text-zinc-500 group-hover:text-white transition-colors duration-200">
                          <span className="opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                            {isLarge ? "Read case study" : "Read more"}
                          </span>
                          <span className="ml-1.5 transition-transform duration-200 group-hover:translate-x-1">
                            →
                          </span>
                        </div>
                      )}
                    </div>

                  </div>
                </GlowCard>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
