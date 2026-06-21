import { useEffect, useState } from "react";

interface TerminalItem {
  text: string;
  type: string;
  highlight?: string;
  type2?: string;
}

const AboutMeTerminal = () => {
  const [terminalText, setTerminalText] = useState<TerminalItem[]>([]);
  const [isTyping, setIsTyping] = useState(true);
  const [commandInput, setCommandInput] = useState("");
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const bootMessages: TerminalItem[] = [
      { text: "Welcome to HemdanOS v1.0", type: "system" },
      { text: "Copyright (c) 2026 Hemdan Khalifa", type: "copyright" },
      { text: "All rights reserved.", type: "copyright" },
      { text: "", type: "blank" },
      { text: "Initializing system...", type: "loading" },
      { text: "Loading user profile...", type: "loading" },
      { text: "Running system checks...", type: "loading" },
      { text: "System ready.", type: "success" },
      { text: "", type: "blank" },
      { text: "> fetch user-profile", type: "command" },
      { text: "", type: "blank" },
    ];

    const profileInfo: TerminalItem[] = [
      { text: "┌──────────────────────────────────────────┐", type: "border" },
      { text: "│               USER PROFILE               │", type: "header" },
      { text: "├──────────────────────────────────────────┤", type: "border" },
      {
        text: "│ Username:  ",
        type: "label",
        highlight: "Hemdan217                     │",
        type2: "value",
      },
      {
        text: "│ Name:      ",
        type: "label",
        highlight: "Hemdan Khalifa                │",
        type2: "value",
      },
      {
        text: "│ Location:  ",
        type: "label",
        highlight: "Kafr El-Sheikh, Egypt         │",
        type2: "value",
      },
      {
        text: "│ Status:    ",
        type: "label",
        highlight: "JavaScript Developer          │",
        type2: "value",
      },
      {
        text: "│ GitHub:    ",
        type: "label",
        highlight: "github.com/hemdan217          │",
        type2: "value",
      },
      {
        text: "│ LinkedIn:  ",
        type: "label",
        highlight: "linkedin.com/in/hemdan-khalifa│",
        type2: "value",
      },
      {
        text: "│ Phone:     ",
        type: "label",
        highlight: "+201090188616                 │",
        type2: "value",
      },
      {
        text: "│ Email:     ",
        type: "label",
        highlight: "hemdan219@gmail.com           │",
        type2: "value",
      },
      { text: "└──────────────────────────────────────────┘", type: "border" },
      { text: "", type: "blank" },
      { text: "> describe --user", type: "command" },
      { text: "", type: "blank" },
      {
        text: "Experienced JavaScript Developer with a strong track record",
        type: "description",
      },
      {
        text: "in designing and implementing applications. Skilled in React,",
        type: "description",
      },
      {
        text: "Angular, Node.js, modern frameworks, backend services, and",
        type: "description",
      },
      { text: "scalable solutions.", type: "description" },
      { text: "", type: "blank" },
      {
        text: "Currently seeking a role where I can build high-performance",
        type: "description",
      },
      {
        text: "applications and contribute to innovative projects.",
        type: "description",
      },
      { text: "", type: "blank" },
      { text: "> skills --list", type: "command" },
      { text: "", type: "blank" },
      {
        text: "Frontend:   ",
        type: "label",
        highlight: "HTML, CSS, JavaScript, TypeScript, React, Angular, Redux",
        type2: "skill",
      },
      {
        text: "Backend:    ",
        type: "label",
        highlight: "Node.js, Express, MongoDB, SQL, PostgreSQL, REST API",
        type2: "skill",
      },
      {
        text: "Tools:      ",
        type: "label",
        highlight: "Git, NGINX, PM2, Webpack, Docker",
        type2: "skill",
      },
      {
        text: "Other:      ",
        type: "label",
        highlight: "Python, Machine Learning, Chrome Extensions, Supabase",
        type2: "skill",
      },
      { text: "", type: "blank" },
      { text: "> experience --recent", type: "command" },
      { text: "", type: "blank" },
      {
        text: "* Front-End Developer @ ",
        type: "bullet",
        highlight: "Nexventures SA",
        type2: "company",
      },
      { text: "  (Sep 2023 - Jun 2026)", type: "date" },
      {
        text: "  - Working on two key projects: Propyz and Tapgo",
        type: "point",
      },
      { text: "", type: "blank" },
      {
        text: "    └─ ",
        type: "tree",
        highlight: "Tapgo (Nexventures Project)",
        type2: "project",
      },
      { text: "       Restaurant POS software enhancement", type: "subpoint" },
      { text: "       Online ordering & QR solutions", type: "subpoint" },
      { text: "", type: "blank" },
      {
        text: "    └─ ",
        type: "tree",
        highlight: "Propyz (Nexventures Project)",
        type2: "project",
      },
      {
        text: "       ERP system for real estate management",
        type: "subpoint",
      },
      {
        text: "       Real-time chat, ticketing, and voting modules",
        type: "subpoint",
      },
      { text: "", type: "blank" },
      {
        text: "* Full-Stack Developer @ ",
        type: "bullet",
        highlight: "Safka",
        type2: "company",
      },
      { text: "  (Mar 2023 - Mar 2026, Part Time)", type: "date" },
      {
        text: "  - Affiliate & e-commerce ops platform for admins/marketers",
        type: "point",
      },
      {
        text: "  - WhatsApp platform, Public API, analytics & inventory modules",
        type: "point",
      },
      { text: "", type: "blank" },
      {
        text: "* Freelancer ",
        type: "bullet",
        highlight: "(Jan 2021 - May 2025)",
        type2: "date",
      },
      { text: "  - 50+ projects with 98% Job Success Score", type: "point" },
      { text: "  - Web development and data science solutions", type: "point" },
      { text: "", type: "blank" },
      { text: "> _", type: "prompt" },
    ];

    const allMessages = [...bootMessages, ...profileInfo];
    let currentIndex = 0;

    // Simulate typing effect
    const typingInterval = setInterval(() => {
      if (currentIndex < allMessages.length) {
        setTerminalText((prev) => [...prev, allMessages[currentIndex]]);
        currentIndex++;

        // When done, show interactive prompt
        if (currentIndex === allMessages.length) {
          setIsTyping(false);
          setShowPrompt(true);
        }
      } else {
        clearInterval(typingInterval);
        setIsTyping(false);
        setShowPrompt(true);
      }
    }, 100); // Faster typing speed

    return () => clearInterval(typingInterval);
  }, []);

  const getClassForType = (type: string | undefined) => {
    if (!type) return "";

    switch (type) {
      case "system":
        return "text-blue-400 font-bold";
      case "copyright":
        return "text-gray-400";
      case "loading":
        return "text-yellow-300";
      case "success":
        return "text-green-500 font-bold";
      case "command":
        return "text-cyan-400 font-semibold";
      case "border":
        return "text-gray-500";
      case "header":
        return "text-white font-bold";
      case "label":
        return "text-gray-400";
      case "value":
        return "text-green-400 font-medium";
      case "description":
        return "text-white";
      case "skill":
        return "text-green-300";
      case "bullet":
        return "text-yellow-400 font-bold";
      case "company":
        return "text-purple-400 font-bold";
      case "project":
        return "text-cyan-300 font-semibold";
      case "date":
        return "text-gray-400 italic";
      case "point":
        return "text-white";
      case "subpoint":
        return "text-gray-300";
      case "tree":
        return "text-gray-500";
      case "prompt":
        return "text-green-400 animate-pulse";
      default:
        return "";
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommandInput(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      // Handle command input here
      setCommandInput("");
    }
  };

  return (
    <div className="bg-[#0d1117] text-green-400 font-mono p-4 h-full overflow-auto rounded">
      <div className="mb-2 flex items-center space-x-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
        <span className="text-xs text-gray-400 ml-2">hemdan@hemdanos:~</span>
      </div>

      <div className="terminal-content">
        {terminalText.map((item, index) => {
          // Safe check for item
          if (!item) {
            return null;
          }

          // Check if this item has a highlight property
          if (item.highlight) {
            return (
              <div key={index} className="whitespace-pre-wrap flex">
                <span className={getClassForType(item.type)}>
                  {item.text || ""}
                </span>
                <span className={getClassForType(item.type2 || "value")}>
                  {item.highlight}
                </span>
              </div>
            );
          }

          // Default case: just render the text with its type styling
          return (
            <div
              key={index}
              className={`whitespace-pre-wrap ${getClassForType(item.type)}`}
            >
              {item.text || ""}
            </div>
          );
        })}

        {showPrompt && (
          <div className="flex items-center mt-2">
            <span className="text-green-400 mr-2">guest@hemdanos:~$</span>
            <input
              type="text"
              value={commandInput}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="bg-transparent border-none outline-none text-white flex-1"
              autoFocus
            />
          </div>
        )}

        {isTyping && <div className="typing-cursor animate-pulse">_</div>}
      </div>
    </div>
  );
};

export default AboutMeTerminal;
