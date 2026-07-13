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
  ];

  return (
    <AnimatePresence>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: isVisible ? 0 : -100, 
          opacity: isVisible ? 1 : 0 
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 z-50 flex justify-center px-6 pt-4 md:px-10"
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
    </AnimatePresence>
  );
}
