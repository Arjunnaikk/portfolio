"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const pathname = usePathname();
  const isSubPage = pathname?.startsWith("/n/");
  
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState("home");

  // Scroll handler to hide/show navbar and set active section
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // 1. Hide/Show navbar based on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      setLastScrollY(currentScrollY);

      // 2. Determine active section (only on home page)
      if (!isSubPage) {
        const sections = ["projects", "experience"];
        let currentSection = "home";

        for (const sectionId of sections) {
          const el = document.getElementById(sectionId);
          if (el) {
            const rect = el.getBoundingClientRect();
            // If the section top is in the upper half of the viewport
            if (rect.top <= window.innerHeight * 0.4) {
              currentSection = sectionId;
            }
          }
        }
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isSubPage]);

  const navItems = [
    { name: "home", href: "/" },
    { name: "projects", href: "/#projects" },
    { name: "experience", href: "/#experience" },
    { name: "resume", href: "/resume.pdf", isDownload: true },
  ];

  return (
    <AnimatePresence>
      {/* DESKTOP HEADER */}
      <motion.header
        key="desktop-header"
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: isVisible ? 0 : -100, 
          opacity: isVisible ? 1 : 0 
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 hidden md:flex justify-center px-6 pt-4 md:px-10"
      >
        <nav className="mx-auto flex w-full max-w-4xl items-center justify-between rounded-full border border-white/10 bg-zinc-950/60 px-5 py-2.5 shadow-lg shadow-black/20 backdrop-blur-md">
          {/* Logo / Brand */}
          <Link 
            href="/" 
            className="group flex items-center gap-2 text-sm font-medium tracking-tight text-white transition-colors duration-200"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="opacity-80 group-hover:opacity-100">arjun naik</span>
          </Link>

          {/* Navigation Controls */}
          <div className="flex items-center gap-1.5">
            {isSubPage ? (
              <Link
                href="/"
                className="group flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-xs font-medium text-zinc-300 border border-white/5 transition-all duration-200 hover:bg-white/10 hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-3 w-3 transition-transform duration-200 group-hover:-translate-x-0.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
                back to home
              </Link>
            ) : (
              navItems.map((item) => {
                const isActive = activeSection === item.name;
                if (item.isDownload) {
                  return (
                    <a
                      key={item.name}
                      href={item.href}
                      download="Arjun_Naik_Resume.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="relative rounded-full px-3 py-1.5 text-xs font-medium tracking-tight text-zinc-400 transition-colors duration-200 hover:text-zinc-100"
                    >
                      <span className="relative z-10">{item.name}</span>
                    </a>
                  );
                }
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="relative rounded-full px-3 py-1.5 text-xs font-medium tracking-tight text-zinc-400 transition-colors duration-200 hover:text-zinc-100"
                  >
                    {isActive && (
                      <motion.span
                        layoutId="activeNavBackground"
                        className="absolute inset-0 z-0 rounded-full bg-white/5 border border-white/5"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{item.name}</span>
                  </Link>
                );
              })
            )}
          </div>
        </nav>
      </motion.header>

      {/* MOBILE TOP HEADER (Brand Only) */}
      <motion.header
        key="mobile-top-header"
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: isVisible ? 0 : -100, 
          opacity: isVisible ? 1 : 0 
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 flex md:hidden justify-center px-4 pt-3 pointer-events-none"
      >
        <div className="pointer-events-auto flex w-full items-center justify-between rounded-full border border-white/10 bg-zinc-950/60 px-4 py-2 shadow-lg shadow-black/20 backdrop-blur-md">
          {/* Logo / Brand */}
          <Link 
            href="/" 
            className="group flex items-center gap-2 text-sm font-medium tracking-tight text-white transition-colors duration-200"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="opacity-80 group-hover:opacity-100">arjun naik</span>
          </Link>

          {isSubPage && (
            <Link
              href="/"
              className="group flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-1 text-[10px] font-medium text-zinc-300 border border-white/5 transition-all duration-200 hover:bg-white/10 hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="h-3 w-3 transition-transform duration-200 group-hover:-translate-x-0.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
              back
            </Link>
          )}
        </div>
      </motion.header>

      {/* MOBILE BOTTOM NAV DOCK */}
      <motion.div
        key="mobile-bottom-dock"
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed bottom-6 left-0 right-0 z-50 flex md:hidden justify-center px-4 pointer-events-none"
      >
        <nav className="pointer-events-auto flex w-full max-w-md items-center justify-around rounded-[24px] border border-white/10 bg-zinc-950/80 px-2 py-2 shadow-2xl backdrop-blur-lg">
          {navItems.map((item) => {
            const isActive = activeSection === item.name;

            // Define clean custom SVG icons
            let icon;
            if (item.name === "home") {
              icon = (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 relative z-10">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              );
            } else if (item.name === "projects") {
              icon = (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 relative z-10">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
              );
            } else if (item.name === "experience") {
              icon = (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 relative z-10">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
                </svg>
              );
            } else { // resume
              icon = (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 relative z-10">
                  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <line x1="10" y1="9" x2="8" y2="9" />
                </svg>
              );
            }

            const linkContent = (
              <div className="flex flex-col items-center gap-1 w-16">
                <div className="relative flex items-center justify-center w-12 h-6 rounded-full transition-colors duration-200">
                  {isActive && (
                    <motion.span
                      layoutId="activeMobileNavBg"
                      className="absolute inset-0 rounded-full bg-emerald-500/20 border border-emerald-500/10"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className={`transition-colors duration-200 ${isActive ? "text-emerald-400" : "text-zinc-400"}`}>
                    {icon}
                  </span>
                </div>
                <span className={`text-[10px] font-medium tracking-tight transition-colors duration-200 ${isActive ? "text-emerald-400" : "text-zinc-500"}`}>
                  {item.name}
                </span>
              </div>
            );

            if (item.isDownload) {
              return (
                <a
                  key={item.name}
                  href={item.href}
                  download="Arjun_Naik_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-1 cursor-pointer select-none"
                >
                  {linkContent}
                </a>
              );
            }

            return (
              <Link
                key={item.name}
                href={item.href}
                className="py-1 cursor-pointer select-none"
              >
                {linkContent}
              </Link>
            );
          })}
        </nav>
      </motion.div>
    </AnimatePresence>
  );
}
