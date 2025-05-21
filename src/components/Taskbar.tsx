
import { Clock } from "lucide-react";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

interface TaskbarProps {
  openWindows: { id: string; title: string; icon: React.ReactNode }[];
  activeWindowId: string | null;
  onWindowClick: (id: string) => void;
}

const Taskbar = ({ openWindows, activeWindowId, onWindowClick }: TaskbarProps) => {
  const [currentTime, setCurrentTime] = useState(new Date());

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
    hour: '2-digit', 
    minute: '2-digit'
  });

  return (
    <div className="fixed bottom-0 left-0 right-0 h-10 bg-os-taskbar-bg backdrop-blur-md z-50 border-t border-border flex items-center justify-between px-4">
      <div className="flex items-center space-x-1">
        {openWindows.map((window) => (
          <button
            key={window.id}
            className={`flex items-center px-2 py-1 rounded hover:bg-muted transition-colors text-xs ${
              activeWindowId === window.id ? 'bg-muted' : ''
            }`}
            onClick={() => onWindowClick(window.id)}
          >
            <span className="mr-1">{window.icon}</span>
            {window.title}
          </button>
        ))}
      </div>
      
      <div className="flex items-center space-x-4">
        <ThemeToggle />
        <div className="flex items-center text-sm">
          <Clock size={14} className="mr-1" />
          <span>{formattedTime}</span>
        </div>
      </div>
    </div>
  );
};

export default Taskbar;
