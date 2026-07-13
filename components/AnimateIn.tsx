"use client";

import React from "react";
import { motion } from "framer-motion";

interface AnimateInProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  stagger?: boolean;
  staggerDelay?: number;
  viewTrigger?: boolean;
  className?: string;
}

export default function AnimateIn({
  children,
  delay = 0,
  duration = 0.5,
  direction = "up",
  stagger = false,
  staggerDelay = 0.05,
  viewTrigger = true,
  className = "",
}: AnimateInProps) {
  const getDirectionOffset = () => {
    switch (direction) {
      case "up":
        return { y: 15 };
      case "down":
        return { y: -15 };
      case "left":
        return { x: 15 };
      case "right":
        return { x: -15 };
      case "none":
        return {};
    }
  };

  const containerVariants = {
    hidden: {
      opacity: 0,
      ...getDirectionOffset(),
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: duration,
        delay: delay,
        ease: [0.21, 0.47, 0.32, 0.98], // smooth custom ease
        when: stagger ? "beforeChildren" : undefined,
        staggerChildren: stagger ? staggerDelay : undefined,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.21, 0.47, 0.32, 0.98],
      },
    },
  };

  // If we are staggering children, we render a parent container and wrap each direct child in a motion.div
  if (stagger) {
    const childrenArray = React.Children.toArray(children);
    return (
      <motion.div
        initial="hidden"
        whileInView={viewTrigger ? "visible" : undefined}
        animate={!viewTrigger ? "visible" : undefined}
        viewport={viewTrigger ? { once: true, margin: "-40px" } : undefined}
        variants={containerVariants}
        className={className}
      >
        {childrenArray.map((child, index) => (
          <motion.div key={index} variants={itemVariants}>
            {child}
          </motion.div>
        ))}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      whileInView={viewTrigger ? "visible" : undefined}
      animate={!viewTrigger ? "visible" : undefined}
      viewport={viewTrigger ? { once: true, margin: "-80px" } : undefined}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}
