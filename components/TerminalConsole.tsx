"use client";

import React, { useState, useRef, useEffect } from "react";

interface TerminalLine {
  text: string;
  type: "input" | "output" | "error" | "success" | "info";
}

export default function TerminalConsole() {
  const [history, setHistory] = useState<TerminalLine[]>([
    { text: "Arjun Naik Profile Terminal OS v1.0.2", type: "info" },
    { text: "Type 'help' or click the buttons below to interact.", type: "output" },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isShipping, setIsShipping] = useState(false);
  const [isClosed, setIsClosed] = useState(true); // Closed (minimized) by default
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom on new output
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input when terminal body is clicked
  const focusTerminalInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const downloadResume = () => {
    const a = document.createElement("a");
    a.href = "/resume.pdf";
    a.download = "Arjun_Naik_Resume.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    if (!trimmed) return;

    // Add command to history
    setHistory((prev) => [...prev, { text: `guest@arjunnaik:~$ ${cmd}`, type: "input" }]);

    if (isShipping) {
      setHistory((prev) => [...prev, { text: "Console is busy running a build...", type: "error" }]);
      return;
    }

    switch (trimmed) {
      case "help":
      case "?":
        setHistory((prev) => [
          ...prev,
          { text: "Available commands:", type: "info" },
          { text: "  cat focus.txt      - Display current developer focus", type: "output" },
          { text: "  cat stack.json     - Display technology stacks & expertise", type: "output" },
          { text: "  npm run ship       - Run profile compilation and deployment script", type: "output" },
          { text: "  ping mumbai        - Ping current geographical location", type: "output" },
          { text: "  cd github          - Open GitHub profile in a new tab", type: "output" },
          { text: "  cd linkedin        - Open LinkedIn profile in a new tab", type: "output" },
          { text: "  cd gmail           - Open default email client to contact me", type: "output" },
          { text: "  download resume    - Generate and download resume.txt document", type: "output" },
          { text: "  whoami             - Display bio and developer background", type: "output" },
          { text: "  close / exit       - Minimize terminal window session", type: "output" },
          { text: "  clear              - Clear terminal history screen", type: "output" },
        ]);
        break;

      case "clear":
      case "cls":
        setHistory([]);
        break;

      case "whoami":
        setHistory((prev) => [
          ...prev,
          {
            text: "Arjun Naik: Full-stack developer, Solana builder, and computer engineering student. Shipping code that solves problems and looks premium.",
            type: "output",
          },
        ]);
        break;

      case "focus":
      case "cat focus.txt":
        setHistory((prev) => [
          ...prev,
          {
            text: "Focus: Building polished developer tools, real-time collaboration experiences, and fast, opinionated interfaces that feel useful on day one.",
            type: "output",
          },
        ]);
        break;

      case "stack":
      case "cat stack.json":
        setHistory((prev) => [
          ...prev,
          { text: "{", type: "output" },
          { text: '  "frontend": ["Next.js", "React", "TypeScript", "Tailwind CSS"],', type: "output" },
          { text: '  "web3": ["Solana", "Rust", "Anchor Program", "Web3.js"],', type: "output" },
          { text: '  "backend": ["Node.js", "Express", "PostgreSQL", "Socket.io"],', type: "output" },
          { text: '  "tools": ["Docker", "Git", "Monaco Editor"]', type: "output" },
          { text: "}", type: "output" },
        ]);
        break;

      case "ping":
      case "ping mumbai":
        setHistory((prev) => [
          ...prev,
          { text: "PING mumbai.india.asia (103.21.141.0): 56 data bytes", type: "output" },
          { text: "64 bytes from 103.21.141.0: icmp_seq=0 ttl=58 time=14.2 ms", type: "success" },
          { text: "64 bytes from 103.21.141.0: icmp_seq=1 ttl=58 time=12.9 ms", type: "success" },
          { text: "64 bytes from 103.21.141.0: icmp_seq=2 ttl=58 time=15.1 ms", type: "success" },
          { text: "--- mumbai.india ping statistics ---", type: "output" },
          { text: "3 packets transmitted, 3 packets received, 0.0% packet loss", type: "output" },
          { text: "rtt min/avg/max/stddev = 12.9/14.0/15.1/0.9 ms", type: "output" },
        ]);
        break;

      case "ship":
      case "npm run ship":
        runShipCommand();
        break;

      case "cd github":
      case "github":
        setHistory((prev) => [...prev, { text: "Opening GitHub profile in a new tab...", type: "success" }]);
        setTimeout(() => {
          window.open("https://github.com/Arjunnaikk", "_blank");
        }, 300);
        break;

      case "cd linkedin":
      case "cd linked in":
      case "cd linked-in":
      case "linkedin":
        setHistory((prev) => [...prev, { text: "Opening LinkedIn profile in a new tab...", type: "success" }]);
        setTimeout(() => {
          window.open("https://www.linkedin.com/in/Arjunnaikk", "_blank");
        }, 300);
        break;

      case "cd gmail":
      case "gmail":
      case "email":
      case "cd email":
        setHistory((prev) => [...prev, { text: "Opening mail client...", type: "success" }]);
        setTimeout(() => {
          window.open("mailto:naikarjun0402@gmail.com", "_self");
        }, 300);
        break;

      case "exit":
      case "close":
        setHistory((prev) => [...prev, { text: "Closing terminal session...", type: "info" }]);
        setTimeout(() => {
          setIsClosed(true);
        }, 500);
        break;

      case "download resume":
      case "resume":
      case "download":
        setHistory((prev) => [...prev, { text: "Locating resume PDF file...", type: "info" }]);
        setTimeout(() => {
          downloadResume();
          setHistory((prev) => [...prev, { text: "Resume download triggered successfully!", type: "success" }]);
        }, 600);
        break;

      default:
        setHistory((prev) => [
          ...prev,
          { text: `bash: command not found: ${cmd}. Type 'help' for list of commands.`, type: "error" },
        ]);
        break;
    }
  };

  const runShipCommand = () => {
    setIsShipping(true);
    setHistory((prev) => [...prev, { text: "npm run ship", type: "info" }]);

    const steps = [
      { delay: 400, text: "▲ Next.js 16.2.3 (Turbopack) - Compiling project dependencies...", type: "output" },
      { delay: 1000, text: "✓ Compiled successfully in 1.4s", type: "success" },
      { delay: 1500, text: "Optimizing static assets and bundles...", type: "output" },
      { delay: 2000, text: "Progress: [████░░░░░░░░░░░░░░░░] 20%", type: "info" },
      { delay: 2400, text: "Progress: [████████████░░░░░░░░] 60%", type: "info" },
      { delay: 2800, text: "Progress: [████████████████████] 100% - Ready!", type: "info" },
      { delay: 3300, text: "✓ Static pages built: / (Home), /n/* (Case Studies)", type: "success" },
      { delay: 3800, text: "⚡ Deploying to Vercel Edge Network...", type: "output" },
      { delay: 4400, text: "🎉 Deployment successful! Arjun Naik portfolio is live on Edge Nodes.", type: "success" },
    ];

    steps.forEach((step) => {
      setTimeout(() => {
        setHistory((prev) => [...prev, { text: step.text, type: stringToLineType(step.type) }]);
        if (step.text.includes("Deployment successful")) {
          setIsShipping(false);
        }
      }, step.delay);
    });
  };

  const stringToLineType = (type: string): "input" | "output" | "error" | "success" | "info" => {
    if (type === "success" || type === "error" || type === "info" || type === "input") return type;
    return "output";
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    handleCommand(inputValue);
    setInputValue("");
  };

  const handleQuickClick = (cmd: string) => {
    handleCommand(cmd);
  };

  if (isClosed) {
    return (
      <div className="w-full rounded-2xl border border-white/10 bg-zinc-950/60 overflow-hidden shadow-2xl backdrop-blur-md">
        {/* Window Title Bar (Collapsed view - only this is visible by default) */}
        <div
          onClick={() => setIsClosed(false)}
          title="Click to expand terminal"
          className="flex items-center justify-between px-4 py-3 bg-zinc-900/60 hover:bg-zinc-900/80 transition-colors duration-200 cursor-pointer select-none"
        >
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-rose-500/80 block" />
            <span className="w-3 h-3 rounded-full bg-amber-500/80 block" />
            <span className="w-3 h-3 rounded-full bg-emerald-500/80 block" />
          </div>
          <span className="text-[11px] font-mono text-zinc-500 font-medium">guest@arjunnaik: ~</span>
          <div className="w-12" /> {/* spacing element */}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full rounded-2xl border border-white/10 bg-zinc-950/60 overflow-hidden shadow-2xl backdrop-blur-md">
      {/* Window Title Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/60 border-b border-white/5 select-none">
        <div className="flex gap-2">
          <button
            onClick={() => setIsClosed(true)}
            title="Minimize terminal"
            className="w-3 h-3 rounded-full bg-rose-500/80 flex items-center justify-center group/btn relative cursor-pointer outline-none border-none"
          >
            <span className="opacity-0 group-hover/btn:opacity-100 text-[8px] text-rose-950 font-bold font-sans absolute select-none">×</span>
          </button>
          <span className="w-3 h-3 rounded-full bg-amber-500/80 block" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 block" />
        </div>
        <span className="text-[11px] font-mono text-zinc-500 font-medium">guest@arjunnaik: ~</span>
        <div className="w-12" /> {/* spacing element */}
      </div>

      {/* Terminal View area */}
      <div
        onClick={focusTerminalInput}
        className="p-5 h-[280px] overflow-y-auto font-mono text-xs leading-relaxed cursor-text select-text"
        ref={scrollRef}
        style={{ scrollBehavior: "smooth" }}
      >
        <div className="space-y-1.5">
          {history.map((line, idx) => {
            let colorClass = "text-zinc-300";
            if (line.type === "input") colorClass = "text-sky-400";
            if (line.type === "success") colorClass = "text-emerald-400";
            if (line.type === "error") colorClass = "text-rose-400";
            if (line.type === "info") colorClass = "text-violet-400 font-semibold";

            return (
              <div key={idx} className={`${colorClass} whitespace-pre-wrap`}>
                {line.text}
              </div>
            );
          })}

          {/* Typing Line */}
          {!isShipping && (
            <form onSubmit={handleFormSubmit} className="flex items-center text-zinc-300 w-full mt-2">
              <span className="text-emerald-400 mr-2">guest@arjunnaik:~$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="bg-transparent border-none outline-none flex-1 text-zinc-100 font-mono text-xs caret-sky-400 focus:ring-0 p-0 m-0"
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
            </form>
          )}

          {isShipping && (
            <div className="flex items-center text-zinc-500 italic mt-2 animate-pulse">
              Compiling resources...
            </div>
          )}
        </div>
      </div>

      {/* Quick Action Button Drawer */}
      <div className="px-4 py-3 bg-zinc-950/80 border-t border-white/5 flex flex-wrap gap-2 items-center">
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider mr-1">
          Quick commands:
        </span>
        <button
          onClick={() => handleQuickClick("cat focus.txt")}
          className="rounded border border-white/10 hover:border-sky-400/30 hover:bg-sky-400/5 hover:text-sky-300 bg-white/[0.02] px-2.5 py-1 text-[11px] font-mono text-zinc-400 transition-all duration-200 cursor-pointer"
        >
          cat focus.txt
        </button>
        <button
          onClick={() => handleQuickClick("cat stack.json")}
          className="rounded border border-white/10 hover:border-emerald-400/30 hover:bg-emerald-400/5 hover:text-emerald-300 bg-white/[0.02] px-2.5 py-1 text-[11px] font-mono text-zinc-400 transition-all duration-200 cursor-pointer"
        >
          cat stack.json
        </button>
        <button
          onClick={() => handleQuickClick("download resume")}
          className="rounded border border-white/10 hover:border-emerald-400/30 hover:bg-emerald-400/5 hover:text-emerald-300 bg-white/[0.02] px-2.5 py-1 text-[11px] font-mono text-zinc-400 transition-all duration-200 cursor-pointer"
        >
          download resume
        </button>
        <button
          onClick={() => handleQuickClick("npm run ship")}
          className="rounded border border-white/10 hover:border-violet-400/30 hover:bg-violet-400/5 hover:text-violet-300 bg-white/[0.02] px-2.5 py-1 text-[11px] font-mono text-zinc-400 transition-all duration-200 cursor-pointer"
        >
          npm run ship
        </button>
        <button
          onClick={() => handleQuickClick("ping mumbai")}
          className="rounded border border-white/10 hover:border-amber-400/30 hover:bg-amber-400/5 hover:text-amber-300 bg-white/[0.02] px-2.5 py-1 text-[11px] font-mono text-zinc-400 transition-all duration-200 cursor-pointer"
        >
          ping mumbai
        </button>
        <button
          onClick={() => handleQuickClick("clear")}
          className="rounded border border-white/10 hover:border-zinc-300/30 hover:bg-zinc-300/5 hover:text-zinc-200 bg-white/[0.02] px-2.5 py-1 text-[11px] font-mono text-zinc-400 transition-all duration-200 ml-auto cursor-pointer"
        >
          clear
        </button>
      </div>
    </div>
  );
}
