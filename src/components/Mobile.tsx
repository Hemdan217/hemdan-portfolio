import React, { useState, useEffect } from "react";
import {
  Terminal,
  FileText,
  Briefcase,
  Code,
  Monitor,
  BookOpen,
  Mail,
  X,
  Battery,
  Wifi,
  Signal,
  ChevronDown,
} from "lucide-react";

// App component imports
import AboutMeTerminal from "./apps/AboutMeTerminal";
import ResumeApp from "./apps/ResumeApp";
import ExperienceApp from "./apps/ExperienceApp";
import ProjectsApp from "./apps/ProjectsApp";
import SkillsMonitor from "./apps/SkillsMonitor";
import EducationApp from "./apps/EducationApp";
import ContactApp from "./apps/ContactApp";
import ThemeToggle from "./ThemeToggle";

// Define app types and their components - same as in Desktop
const APPS = {
  ABOUT: {
    id: "about",
    title: "Terminal",
    icon: <Terminal size={16} />,
    dockIcon: <Terminal />,
    label: "About Me",
    component: AboutMeTerminal,
  },
  RESUME: {
    id: "resume",
    title: "Resume",
    icon: <FileText size={16} />,
    dockIcon: <FileText />,
    label: "Resume",
    component: ResumeApp,
  },
  EXPERIENCE: {
    id: "experience",
    title: "Experience",
    icon: <Briefcase size={16} />,
    dockIcon: <Briefcase />,
    label: "Experience",
    component: ExperienceApp,
  },
  PROJECTS: {
    id: "projects",
    title: "Projects",
    icon: <Code size={16} />,
    dockIcon: <Code />,
    label: "Projects",
    component: ProjectsApp,
  },
  SKILLS: {
    id: "skills",
    title: "Skills Monitor",
    icon: <Monitor size={16} />,
    dockIcon: <Monitor />,
    label: "Skills",
    component: SkillsMonitor,
  },
  EDUCATION: {
    id: "education",
    title: "Education & Courses",
    icon: <BookOpen size={16} />,
    dockIcon: <BookOpen />,
    label: "Education",
    component: EducationApp,
  },
  CONTACT: {
    id: "contact",
    title: "Contact",
    icon: <Mail size={16} />,
    dockIcon: <Mail />,
    label: "Contact",
    component: ContactApp,
  },
};

const Mobile = () => {
  const [activeApp, setActiveApp] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [openingApp, setOpeningApp] = useState(false);
  const [closingApp, setClosingApp] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchMoveY, setTouchMoveY] = useState(0);
  const [touchMoveX, setTouchMoveX] = useState(0);
  const [isDraggingDown, setIsDraggingDown] = useState(false);
  const [isDraggingRight, setIsDraggingRight] = useState(false);
  const [isFirstRender, setIsFirstRender] = useState(true);

  // Flag first render for entrance animation
  useEffect(() => {
    if (isFirstRender) {
      setTimeout(() => {
        setIsFirstRender(false);
      }, 300);
    }
  }, [isFirstRender]);

  // Update time every minute
  useEffect(() => {
    const timerID = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => {
      clearInterval(timerID);
    };
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Play touch sound effect with haptic feedback if available
  const playTouchSound = (volume = 0.15) => {
    // iOS-style click sound
    const audio = new Audio();
    audio.src =
      "data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjI5LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAADwAD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAAATGF2YzU4LjU0AAAAAAAAAAAAAAAAJAAAAAAAAAAAwKyx8k3EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/+9DEAAAJaANr9BAAI9kApX56IAAAAABYWFhYWFAAAAAAAAAAAEhMZmdoaGhoaGhoaGgICAAAkJCQAAAJCZ+fn+wkJCkEoJASxcuXLnwTg4T8uXkCBAnym0CdQqXL+XLly5cuXLsXLly5cuXLlyAgICAgICAgICAgICAgQEBAQEBAQEBAQEAAAAAAAAAAAAAA//OCAgICAgICAgICAgQEBAQEBAQEBAQEAAAAAAAAAAAAAA//OCAgICBcICAgIEBAQEBAQEBAQEBAAAAAAAAAAAAAAAA//LiYA4LkBAQEBAQEBAQEBAQEBAAAAAAAAAAAAAAAA//LiA4QE/+0MQRgAmmj239BEAO6XOPvzxAABAQEBAQEBAQEBAAAAAAAAAAAAAA7/8uIDgAQICAgICAgICBAQEBAQEBAQEBAQLiAgICAgICAgICAgIEBAQEBAQEBAQEBAAAAAAAAAAAAAA//OCAgICAgICAgICAgQEBAQEBAQEBAQEAAAAAAAAAAAAAA/wSAgICAgICAgfwAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
    audio.volume = volume;
    audio.play().catch((e) => console.log("Audio play prevented:", e));

    // Try to use vibration API if available
    if (navigator.vibrate) {
      navigator.vibrate(10);
    }
  };

  // Open a mobile app with animation sequence
  const openApp = (appId: string) => {
    playTouchSound(0.3);

    setOpeningApp(true);

    // Add body class to prevent scrolling when app is open
    document.body.classList.add("mobile-app-open");

    // Delay setting the active app to allow for animation
    setTimeout(() => {
      setActiveApp(appId);
      setOpeningApp(false);
    }, 100);
  };

  // Close mobile app with animation
  const closeApp = () => {
    playTouchSound(0.15);

    // Set closing state to trigger animation
    setClosingApp(true);
    setIsDraggingDown(false);
    setIsDraggingRight(false);

    // Delay actual app closing to allow animation to play
    setTimeout(() => {
      setActiveApp(null);
      setClosingApp(false);
      // Remove body class when app is closed
      document.body.classList.remove("mobile-app-open");
    }, 300);
  };

  // Handle touch start for gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    // Only track touches on the app header or specific handle areas
    if (
      (e.target as HTMLElement).closest(".app-header") ||
      (e.target as HTMLElement).closest(".gesture-handle")
    ) {
      setTouchStartY(e.touches[0].clientY);
      setTouchStartX(e.touches[0].clientX);
    }
  };

  // Handle touch move for gestures
  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartY > 0 || touchStartX > 0) {
      const currentY = e.touches[0].clientY;
      const currentX = e.touches[0].clientX;
      const diffY = currentY - touchStartY;
      const diffX = currentX - touchStartX;

      // Track vertical movement
      if (diffY > 0 && Math.abs(diffY) > Math.abs(diffX)) {
        setTouchMoveY(diffY);
        setIsDraggingDown(diffY > 50);

        // Apply transformation to the app content
        const appContent = document.querySelector(".app-content");
        if (appContent && diffY < 180) {
          (
            appContent as HTMLElement
          ).style.transform = `translateY(${diffY}px)`;
          (appContent as HTMLElement).style.opacity = `${1 - diffY / 250}`;
        }
      }

      // Track horizontal movement
      if (diffX > 0 && Math.abs(diffX) > Math.abs(diffY)) {
        setTouchMoveX(diffX);
        setIsDraggingRight(diffX > 100);

        // Apply transformation for horizontal swipe
        const appContent = document.querySelector(".app-content");
        if (appContent && diffX < 250) {
          (
            appContent as HTMLElement
          ).style.transform = `translateX(${diffX}px)`;
          (appContent as HTMLElement).style.opacity = `${1 - diffX / 300}`;
        }
      }
    }
  };

  // Handle touch end for gestures
  const handleTouchEnd = () => {
    const appContent = document.querySelector(".app-content");
    if (appContent) {
      (appContent as HTMLElement).style.transform = "";
      (appContent as HTMLElement).style.opacity = "1";
    }

    if (isDraggingDown || isDraggingRight) {
      closeApp();
    }

    setTouchStartY(0);
    setTouchStartX(0);
    setTouchMoveY(0);
    setTouchMoveX(0);
    setIsDraggingDown(false);
    setIsDraggingRight(false);
  };

  // Get current active app component
  const ActiveAppComponent = activeApp
    ? Object.values(APPS).find((app) => app.id === activeApp)?.component
    : null;

  // Dock apps (bottom row)
  const dockApps = [APPS.ABOUT, APPS.PROJECTS, APPS.CONTACT];

  return (
    <div
      className={`h-screen w-screen bg-os-desktop-bg overflow-hidden flex flex-col ${
        isFirstRender ? "animate-content-fade-in" : ""
      }`}
    >
      {/* Status bar */}
      <div className="h-8 bg-black/20 backdrop-blur-lg border-b border-white/10 w-full px-6 flex justify-between items-center z-10 text-white text-xs">
        <div className="font-medium">{formattedTime}</div>
        <div className="flex items-center space-x-2">
          <Signal className="h-3 w-3" />
          <Wifi className="h-3 w-3" />
          <Battery className="h-3 w-3" />
        </div>
      </div>

      {/* App grid */}
      <div className="flex-1 py-8 px-4 overflow-y-auto grid grid-cols-4 gap-4 content-start">
        {Object.values(APPS).map((app) => (
          <button
            key={app.id}
            className="flex flex-col items-center justify-center group ios-tap-highlight"
            onClick={() => openApp(app.id)}
          >
            <div className="w-14 h-14 bg-gradient-to-br from-os-accent/90 to-os-accent rounded-2xl flex items-center justify-center shadow-lg mb-1 ios-active">
              <div className="text-white">{app.dockIcon}</div>
            </div>
            <span className="text-xs text-foreground/90 font-medium">
              {app.label}
            </span>
          </button>
        ))}
      </div>

      {/* Dock */}
      <div className="h-20 bg-black/20 backdrop-blur-lg w-full px-6 flex justify-center items-center space-x-6 border-t border-white/10">
        {dockApps.map((app) => (
          <button
            key={app.id}
            className="w-12 h-12 bg-gradient-to-br from-os-accent/80 to-os-accent rounded-2xl flex items-center justify-center shadow-md ios-active ios-tap-highlight"
            onClick={() => openApp(app.id)}
          >
            <div className="text-white">{app.dockIcon}</div>
          </button>
        ))}
        <div className="w-12 h-12 bg-gradient-to-br from-muted/30 to-muted/50 backdrop-blur-md rounded-2xl flex items-center justify-center ios-tap-highlight">
          <ThemeToggle />
        </div>
      </div>

      {/* Active app overlay with improved animations */}
      {(activeApp || openingApp || closingApp) && (
        <div
          className={`fixed inset-0 bg-background z-30 ${
            openingApp
              ? "animate-ios-open"
              : closingApp
              ? "animate-ios-close"
              : "animate-ios-present"
          }`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {!closingApp && ActiveAppComponent && (
            <div className="flex flex-col h-full">
              {/* App header */}
              <div className="app-header h-12 border-b border-border flex items-center justify-between px-4 backdrop-blur-md bg-background/80">
                <div className="flex items-center">
                  {
                    Object.values(APPS).find((app) => app.id === activeApp)
                      ?.icon
                  }
                  <span className="ml-2 font-medium">
                    {
                      Object.values(APPS).find((app) => app.id === activeApp)
                        ?.title
                    }
                  </span>
                </div>
                <button
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted active:bg-muted/80 transition-colors ios-button ios-tap-highlight"
                  onClick={closeApp}
                >
                  <X size={18} />
                </button>
              </div>

              {/* App content with animation */}
              <div className="app-content flex-1 overflow-auto animate-content-fade-in ios-momentum-scroll">
                {ActiveAppComponent && <ActiveAppComponent />}
              </div>

              {/* Enhanced gesture indicators */}
              <div className="gesture-handle absolute top-1 left-0 right-0 h-10 flex justify-center items-start pointer-events-none">
                <div className="w-12 h-1 rounded-full bg-foreground/20 mt-1"></div>
              </div>

              {isDraggingDown && (
                <div className="absolute top-16 left-0 right-0 flex justify-center items-center pointer-events-none">
                  <div className="bg-foreground/30 rounded-full flex items-center justify-center px-3 py-1.5">
                    <ChevronDown className="h-4 w-4 mr-1" />
                    <span className="text-xs">Close</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Mobile;
