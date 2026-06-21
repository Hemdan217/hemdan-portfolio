
import React, { useRef } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

interface DockAppProps {
  id: string;
  icon: React.ReactNode;
  label: string;
  isOpen: boolean;
  isActive: boolean;
  onClick: () => void;
}

const DockApp: React.FC<DockAppProps> = ({ id, icon, label, isOpen, isActive, onClick }) => {
  const appRef = useRef<HTMLButtonElement>(null);

  return (
    <HoverCard openDelay={200} closeDelay={100}>
      <HoverCardTrigger asChild>
        <button
          ref={appRef}
          id={`dock-app-${id}`}
          className={`relative flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200
            ${isActive ? 'bg-os-accent text-primary-foreground' : isOpen ? 'bg-muted' : 'hover:bg-muted/60'}
            hover:scale-110 transform transition-transform duration-150`}
          onClick={onClick}
          title={label}
        >
          <div className="text-2xl">
            {icon}
          </div>
          
          {isOpen && !isActive && (
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-os-accent" />
          )}
        </button>
      </HoverCardTrigger>
      <HoverCardContent 
        align="center" 
        side="right" 
        sideOffset={5}
        className="py-1 px-2 text-xs font-medium bg-os-window-bg border border-border shadow-lg"
      >
        {label}
      </HoverCardContent>
    </HoverCard>
  );
};

interface DockProps {
  apps: {
    id: string;
    icon: React.ReactNode;
    label: string;
    isOpen: boolean;
    isActive: boolean;
  }[];
  onAppClick: (id: string) => void;
}

const Dock: React.FC<DockProps> = ({ apps, onAppClick }) => {
  return (
    <div className="fixed left-0 bottom-14 top-0 w-16 bg-os-sidebar-bg text-foreground flex flex-col items-center pt-4 border-r border-border z-10 transition-all duration-300 md:w-16 sm:w-12">
      <div className="flex flex-col space-y-4">
        {apps.map((app) => (
          <DockApp
            key={app.id}
            id={app.id}
            icon={app.icon}
            label={app.label}
            isOpen={app.isOpen}
            isActive={app.isActive}
            onClick={() => onAppClick(app.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default Dock;
