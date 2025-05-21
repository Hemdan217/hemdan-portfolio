import React, { useState, useEffect } from "react";
import Window from "./Window";
import Dock from "./Dock";
import Taskbar from "./Taskbar";
import { Terminal, FileText, Briefcase, Code, Monitor, BookOpen, Mail } from "lucide-react";

// App component imports
import AboutMeTerminal from "./apps/AboutMeTerminal";
import ResumeApp from "./apps/ResumeApp";
import ExperienceApp from "./apps/ExperienceApp";
import ProjectsApp from "./apps/ProjectsApp";
import SkillsMonitor from "./apps/SkillsMonitor";
import EducationApp from "./apps/EducationApp";
import ContactApp from "./apps/ContactApp";

// Define app types and their components
const APPS = {
  ABOUT: {
    id: "about",
    title: "Terminal",
    icon: <Terminal size={16} />,
    dockIcon: <Terminal />,
    label: "About Me",
    component: AboutMeTerminal,
    defaultPosition: { x: 100, y: 50 },
    defaultSize: { width: 600, height: 400 }
  },
  RESUME: {
    id: "resume",
    title: "Resume",
    icon: <FileText size={16} />,
    dockIcon: <FileText />,
    label: "Resume",
    component: ResumeApp,
    defaultPosition: { x: 150, y: 80 },
    defaultSize: { width: 700, height: 500 }
  },
  EXPERIENCE: {
    id: "experience",
    title: "Experience",
    icon: <Briefcase size={16} />,
    dockIcon: <Briefcase />,
    label: "Experience",
    component: ExperienceApp,
    defaultPosition: { x: 200, y: 110 },
    defaultSize: { width: 750, height: 550 }
  },
  PROJECTS: {
    id: "projects",
    title: "Projects",
    icon: <Code size={16} />,
    dockIcon: <Code />,
    label: "Projects",
    component: ProjectsApp,
    defaultPosition: { x: 250, y: 140 },
    defaultSize: { width: 800, height: 600 }
  },
  SKILLS: {
    id: "skills",
    title: "Skills Monitor",
    icon: <Monitor size={16} />,
    dockIcon: <Monitor />,
    label: "Skills",
    component: SkillsMonitor,
    defaultPosition: { x: 300, y: 170 },
    defaultSize: { width: 650, height: 450 }
  },
  EDUCATION: {
    id: "education",
    title: "Education & Courses",
    icon: <BookOpen size={16} />,
    dockIcon: <BookOpen />,
    label: "Education",
    component: EducationApp,
    defaultPosition: { x: 350, y: 200 },
    defaultSize: { width: 700, height: 500 }
  },
  CONTACT: {
    id: "contact",
    title: "Contact",
    icon: <Mail size={16} />,
    dockIcon: <Mail />,
    label: "Contact",
    component: ContactApp,
    defaultPosition: { x: 400, y: 230 },
    defaultSize: { width: 600, height: 400 }
  }
};

const Desktop = () => {
  const [openWindows, setOpenWindows] = useState<string[]>([]);
  const [minimizedWindows, setMinimizedWindows] = useState<string[]>([]);
  const [activeWindowId, setActiveWindowId] = useState<string | null>(null);
  const [windowZIndexes, setWindowZIndexes] = useState<Record<string, number>>({});
  const [nextZIndex, setNextZIndex] = useState(100);

  // Helper to get dock position for window minimize animation
  const getDockPositionForApp = (appId: string) => {
    const dockElement = document.getElementById(`dock-app-${appId}`);
    if (dockElement) {
      const rect = dockElement.getBoundingClientRect();
      return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
    }
    return { x: 0, y: 0 };
  };

  // Open app window - enhanced to toggle minimize when already open
  const openApp = (appId: string) => {
    // If app is minimized, restore it
    if (minimizedWindows.includes(appId)) {
      setMinimizedWindows(minimizedWindows.filter(id => id !== appId));
      setActiveWindowId(appId);
      
      // Update z-index for the focused window
      setWindowZIndexes({
        ...windowZIndexes,
        [appId]: nextZIndex
      });
      setNextZIndex(nextZIndex + 1);
      return;
    }
    
    // If app is already open and active, minimize it
    if (openWindows.includes(appId) && activeWindowId === appId) {
      minimizeApp(appId);
      return;
    }
    
    // If app is already open but not active, focus it
    if (openWindows.includes(appId)) {
      setActiveWindowId(appId);
      
      // Update z-index for the focused window
      setWindowZIndexes({
        ...windowZIndexes,
        [appId]: nextZIndex
      });
      setNextZIndex(nextZIndex + 1);
      return;
    }
    
    // Open new window with sound effect
    const audio = new Audio();
    audio.src = "data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjI5LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAADgADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzM//////////////////////////////////////////////////////////////////8AAAAATGF2YzU4LjU0AAAAAAAAAAAAAAAAJAAAAAAAAAAAQIMk6VcYAAAAAAD/+9DEAAAJlAF19BAAJfZGrn89gAGXBlUQ+WSwEAAA4LkjtBI04nHGB8H8EAQGCDfggCAIAgD/5cEAQBAEP/2c+D9PYICAgCAIYgCb4IAgCAIAh/iAIAgCAIDrggCAIAgM4IB3EAQGd////KAgCAIAgCCI/4ICLggCAIAvwQf+CAIAvgQBAZ/BAwQcH/+4IAgM9w34IAhiwQD//BAzggef//4IBggH////B8H4IAgCc34JfwQBDcEHx/ggCAIAgCAZvggCAID3g++CAIAmHA4P+CAI/GeCAIeYIAYIB9gYIHBAEf//gQB+CAI94Pm+CAIXDBA8EAQBAOwQDt8EBwQBHv//BB8EAQu+CAIAh+CAIBwwMEcULfLQaqWmKT2KCjolWYIAh/hDQwe+CB4IAhBIm6oooQwQQyETLnHITMXKOArZDPWcpuc5G5jUFGKiKNVNSqtVFRr4zN/nJUXzMo6pmTZZQrLLfOds53////nKjbjSM5z43atfO5TgjeKir2aLWv//9eMGDBgwYMGDBgwYMGDBgVVVVVVVVVVVVVVVXq9VVVVVVVVVVVVVVavV6qqqqqqqqqqr/+0MQbgAmFLWH9uoAZTZie/ntABqqqqqqtXqqqqqqqqqtVVVVVVVVVVVVVVVq9VVVVVVVVVVVVVVVVevVVVVVVVVVVVVVVev//VVVVVVVVVVVVVVVarRVVVVVVVVVVVVVVV6vVVVVVVVVVVVVVVVV//1VVVVVVVVVVVVVVVaqqqqqqqqqqqqqqqqqv/9VVVVVVVVVVVVVXq9VVVVVVVVVVVVVVVar//9VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX//VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/9VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVX/1VXq9VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV/9VVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/VVVVVVVVVVVVavVVVVVVVVVVVVVVVVVq";
    audio.volume = 0.3;
    audio.play().catch(e => console.log("Audio play prevented:", e));
    
    setOpenWindows([...openWindows, appId]);
    setActiveWindowId(appId);
    
    // Set z-index for the new window
    setWindowZIndexes({
      ...windowZIndexes,
      [appId]: nextZIndex
    });
    setNextZIndex(nextZIndex + 1);
  };

  // Close app window
  const closeApp = (appId: string) => {
    setOpenWindows(openWindows.filter(id => id !== appId));
    
    // If the closed app was active, set the next window as active
    if (activeWindowId === appId) {
      const remainingWindows = openWindows.filter(id => id !== appId);
      if (remainingWindows.length > 0) {
        setActiveWindowId(remainingWindows[remainingWindows.length - 1]);
      } else {
        setActiveWindowId(null);
      }
    }
  };

  // Minimize app window
  const minimizeApp = (appId: string) => {
    setMinimizedWindows([...minimizedWindows, appId]);
    
    // If the minimized app was active, set the next window as active
    if (activeWindowId === appId) {
      const visibleWindows = openWindows.filter(id => !minimizedWindows.includes(id) && id !== appId);
      if (visibleWindows.length > 0) {
        setActiveWindowId(visibleWindows[visibleWindows.length - 1]);
      } else {
        setActiveWindowId(null);
      }
    }
  };

  // Focus on app window
  const focusApp = (appId: string) => {
    setActiveWindowId(appId);
    
    // Update z-index for the focused window
    setWindowZIndexes({
      ...windowZIndexes,
      [appId]: nextZIndex
    });
    setNextZIndex(nextZIndex + 1);
  };

  // Handle click on dock app
  const handleDockAppClick = (appId: string) => {
    openApp(appId);
  };

  // Handle click on taskbar window
  const handleTaskbarWindowClick = (appId: string) => {
    if (minimizedWindows.includes(appId)) {
      setMinimizedWindows(minimizedWindows.filter(id => id !== appId));
    }
    focusApp(appId);
  };

  // Auto-open terminal app on first load
  useEffect(() => {
    setTimeout(() => {
      openApp(APPS.ABOUT.id);
    }, 500);
  }, []);

  // Prepare app data for Dock
  const dockApps = Object.values(APPS).map((app) => ({
    id: app.id,
    icon: app.dockIcon,
    label: app.label,
    isOpen: openWindows.includes(app.id),
    isActive: activeWindowId === app.id
  }));

  // Prepare window data for Taskbar
  const taskbarWindows = openWindows
    .filter(id => !minimizedWindows.includes(id))
    .map(id => {
      const app = Object.values(APPS).find(app => app.id === id)!;
      return {
        id: app.id,
        title: app.title,
        icon: app.icon
      };
    });

  return (
    <div 
      className="h-screen w-screen bg-os-desktop-bg overflow-hidden"
      onClick={() => setActiveWindowId(null)}
    >
      {/* Dock */}
      <Dock apps={dockApps} onAppClick={handleDockAppClick} />
      
      {/* Windows */}
      {openWindows
        .filter(id => !minimizedWindows.includes(id))
        .map(id => {
          const app = Object.values(APPS).find(app => app.id === id)!;
          const AppComponent = app.component;
          
          return (
            <Window
              key={id}
              id={id}
              title={app.title}
              icon={app.icon}
              isActive={activeWindowId === id}
              defaultPosition={app.defaultPosition}
              defaultSize={app.defaultSize}
              onClose={() => closeApp(id)}
              onFocus={() => focusApp(id)}
              onMinimize={() => minimizeApp(id)}
              dockPosition={getDockPositionForApp(id)}
              zIndex={windowZIndexes[id] || 100}
            >
              <AppComponent />
            </Window>
          );
        })
      }
      
      {/* Taskbar */}
      <Taskbar 
        openWindows={taskbarWindows} 
        activeWindowId={activeWindowId}
        onWindowClick={handleTaskbarWindowClick}
      />
    </div>
  );
};

export default Desktop;
