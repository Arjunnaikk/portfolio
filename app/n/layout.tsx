"use client";

import { motion } from "framer-motion";

export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative w-full"
    >
      {/* Subtle background ambient glow for project pages */}
      <div 
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 h-[350px] w-[500px] max-w-full rounded-full bg-emerald-500/8 blur-[100px] z-0 animate-pulse" 
        style={{ animationDuration: '8s' }} 
      />
      
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
