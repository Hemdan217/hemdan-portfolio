import React, { useState, useRef, useEffect } from "react";
import { X, Minus, Maximize } from "lucide-react";

interface WindowProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  isActive: boolean;
  defaultPosition?: { x: number; y: number };
  defaultSize?: { width: number; height: number };
  minWidth?: number;
  minHeight?: number;
  children: React.ReactNode;
  onClose: () => void;
  onFocus: () => void;
  onMinimize: () => void;
  dockPosition?: { x: number; y: number };
  zIndex: number;
}

const Window: React.FC<WindowProps> = ({
  id,
  title,
  icon,
  isActive,
  defaultPosition = { x: 100, y: 100 },
  defaultSize = { width: 600, height: 400 },
  minWidth = 300,
  minHeight = 200,
  children,
  onClose,
  onFocus,
  onMinimize,
  dockPosition,
  zIndex,
}) => {
  const [position, setPosition] = useState(defaultPosition);
  const [size, setSize] = useState(defaultSize);
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [resizeDirection, setResizeDirection] = useState("");
  const [isClosing, setIsClosing] = useState(false);
  const [isMinimizing, setIsMinimizing] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [previousSize, setPreviousSize] = useState(defaultSize);
  const [previousPosition, setPreviousPosition] = useState(defaultPosition);

  const windowRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const dragStartWindowPos = useRef({ x: 0, y: 0 });
  const resizeStartSize = useRef({ width: 0, height: 0 });
  const resizeStartPos = useRef({ x: 0, y: 0 });

  // Adjust window position to stay within screen bounds on resize
  useEffect(() => {
    const handleWindowResize = () => {
      if (windowRef.current) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Check if window is out of bounds after screen resize
        let newX = position.x;
        let newY = position.y;
        let needsUpdate = false;

        // Adjust X if needed
        if (newX + size.width > viewportWidth - 20) {
          newX = Math.max(20, viewportWidth - size.width - 20);
          needsUpdate = true;
        }

        // Adjust Y if needed
        if (newY + size.height > viewportHeight - 20) {
          newY = Math.max(20, viewportHeight - size.height - 20);
          needsUpdate = true;
        }

        // Update position if needed
        if (needsUpdate) {
          setPosition({ x: newX, y: newY });
        }
      }
    };

    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, [position, size]);

  // Handle window focus on click
  const handleWindowClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onFocus();
  };

  // Handle window header drag
  const handleHeaderMouseDown = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLButtonElement) return; // Don't start drag if clicking buttons

    e.preventDefault();
    setIsDragging(true);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    dragStartWindowPos.current = position;
  };

  // Handle window resize
  const handleResizeMouseDown = (e: React.MouseEvent, direction: string) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
    resizeStartSize.current = size;
    resizeStartPos.current = { x: e.clientX, y: e.clientY };
  };

  // Handle maximize to fit content or full screen
  const handleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isMaximized) {
      // Restore previous size and position
      setSize(previousSize);
      setPosition(previousPosition);
      setIsMaximized(false);
    } else {
      // Save current size and position
      setPreviousSize(size);
      setPreviousPosition(position);

      if (contentRef.current) {
        // Calculate content size plus some padding
        const contentRect = contentRef.current.getBoundingClientRect();
        const contentWidth = contentRect.width;
        const contentHeight = contentRect.height + 40; // Add header height

        // Add some padding to ensure content fits comfortably
        const paddedWidth = Math.min(contentWidth + 40, window.innerWidth - 40);
        const paddedHeight = Math.min(
          contentHeight + 40,
          window.innerHeight - 60
        );

        // Set new size to fit content
        setSize({
          width: Math.max(paddedWidth, minWidth),
          height: Math.max(paddedHeight, minHeight),
        });

        // Center the window
        const newX = Math.max((window.innerWidth - paddedWidth) / 2, 20);
        const newY = Math.max((window.innerHeight - paddedHeight) / 2, 20);
        setPosition({ x: newX, y: newY });
      } else {
        // Fallback to full screen if content ref not available
        setSize({
          width: window.innerWidth - 40,
          height: window.innerHeight - 60,
        });
        setPosition({ x: 20, y: 20 });
      }

      setIsMaximized(true);
    }
  };

  // Handle double click on header to maximize
  const handleHeaderDoubleClick = (e: React.MouseEvent) => {
    if (e.target instanceof HTMLButtonElement) return; // Don't maximize if clicking buttons
    handleMaximize(e);
  };

  // Mouse move for drag and resize
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - dragStartPos.current.x;
        const deltaY = e.clientY - dragStartPos.current.y;

        // Calculate new position
        let newX = dragStartWindowPos.current.x + deltaX;
        let newY = dragStartWindowPos.current.y + deltaY;

        // Keep window within viewport bounds
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Don't allow dragging completely off-screen
        newX = Math.min(Math.max(newX, -size.width + 100), viewportWidth - 100);
        newY = Math.min(Math.max(newY, 0), viewportHeight - 40);

        setPosition({
          x: newX,
          y: newY,
        });

        // When dragging a maximized window, restore it to previous size
        if (isMaximized) {
          setIsMaximized(false);
          setSize(previousSize);
        }
      }

      if (isResizing) {
        const deltaX = e.clientX - resizeStartPos.current.x;
        const deltaY = e.clientY - resizeStartPos.current.y;

        // When resizing, mark window as no longer maximized
        if (isMaximized) {
          setIsMaximized(false);
        }

        // Variables for different resize cases
        let newHeight: number;
        let newWidth: number;
        let swWidth: number;
        let nwWidth: number;
        let nwHeight: number;
        let neHeight: number;

        switch (resizeDirection) {
          case "e":
            setSize({
              width: Math.max(minWidth, resizeStartSize.current.width + deltaX),
              height: resizeStartSize.current.height,
            });
            break;
          case "s":
            setSize({
              width: resizeStartSize.current.width,
              height: Math.max(
                minHeight,
                resizeStartSize.current.height + deltaY
              ),
            });
            break;
          case "se":
            setSize({
              width: Math.max(minWidth, resizeStartSize.current.width + deltaX),
              height: Math.max(
                minHeight,
                resizeStartSize.current.height + deltaY
              ),
            });
            break;
          case "n":
            newHeight = Math.max(
              minHeight,
              resizeStartSize.current.height - deltaY
            );
            setSize({
              width: resizeStartSize.current.width,
              height: newHeight,
            });
            setPosition({
              x: position.x,
              y:
                dragStartWindowPos.current.y +
                (resizeStartSize.current.height - newHeight),
            });
            break;
          case "w":
            newWidth = Math.max(
              minWidth,
              resizeStartSize.current.width - deltaX
            );
            setSize({
              width: newWidth,
              height: resizeStartSize.current.height,
            });
            setPosition({
              x:
                dragStartWindowPos.current.x +
                (resizeStartSize.current.width - newWidth),
              y: position.y,
            });
            break;
          case "sw":
            swWidth = Math.max(
              minWidth,
              resizeStartSize.current.width - deltaX
            );
            setSize({
              width: swWidth,
              height: Math.max(
                minHeight,
                resizeStartSize.current.height + deltaY
              ),
            });
            setPosition({
              x:
                dragStartWindowPos.current.x +
                (resizeStartSize.current.width - swWidth),
              y: position.y,
            });
            break;
          case "nw":
            nwWidth = Math.max(
              minWidth,
              resizeStartSize.current.width - deltaX
            );
            nwHeight = Math.max(
              minHeight,
              resizeStartSize.current.height - deltaY
            );
            setSize({
              width: nwWidth,
              height: nwHeight,
            });
            setPosition({
              x:
                dragStartWindowPos.current.x +
                (resizeStartSize.current.width - nwWidth),
              y:
                dragStartWindowPos.current.y +
                (resizeStartSize.current.height - nwHeight),
            });
            break;
          case "ne":
            neHeight = Math.max(
              minHeight,
              resizeStartSize.current.height - deltaY
            );
            setSize({
              width: Math.max(minWidth, resizeStartSize.current.width + deltaX),
              height: neHeight,
            });
            setPosition({
              x: position.x,
              y:
                dragStartWindowPos.current.y +
                (resizeStartSize.current.height - neHeight),
            });
            break;
          default:
            break;
        }
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [
    isDragging,
    isResizing,
    minHeight,
    minWidth,
    resizeDirection,
    position,
    size,
    defaultPosition,
    isMaximized,
    previousSize,
  ]);

  // Handle window close
  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = new Audio();
    audio.src =
      "data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjI5LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAADwAD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAAATGF2YzU4LjU0AAAAAAAAAAAAAAAAJAAAAAAAAAAAwKyx8k3EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/+9DEAAAJaANr9BAAI9kApX56IAAAAABYWFhYWFAAAAAAAAAAAEhMZmdoaGhoaGhoaGgICAAAkJCQAAAJCZ+fn+wkJCkEoJASxcuXLnwTg4T8uXkCBAnym0CdQqXL+XLly5cuXLsXLly5cuXLlyAgICAgICAgICAgICAgQEBAQEBAQEBAQEAAAAAAAAAAAAAA//OCAgICAgICAgICAgQEBAQEBAQEBAQEAAAAAAAAAAAAAA//OCAgICBcICAgIEBAQEBAQEBAQEBAAAAAAAAAAAAAAAA//LiYA4LkBAQEBAQEBAQEBAQEBAAAAAAAAAAAAAAAA//LiA4QE/+0MQRgAmmj239BEAO6XOPvzxAABAQEBAQEBAQEBAAAAAAAAAAAAAA7/8uIDgAQICAgICAgICBAQEBAQEBAQEBAQLiAgICAgICAgICAgIEBAQEBAQEBAQEBAAAAAAAAAAAAAA//OCAgICAgICAgICAgQEBAQEBAQEBAQEAAAAAAAAAAAAAA/wSAgICAgICAgfwAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
    audio.volume = 0.2;
    audio.play().catch((e) => console.log("Audio play prevented:", e));

    setIsClosing(true);
    setTimeout(() => onClose(), 300);
  };

  // Handle window minimize
  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    const audio = new Audio();
    audio.src =
      "data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjI5LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAADwAD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAAATGF2YzU4LjU0AAAAAAAAAAAAAAAAJAAAAAAAAAAAwKyx8k3EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/+9DEAAAJaANr9BAAI9kApX56IAAAAABYWFhYWFAAAAAAAAAAAEhMZmdoaGhoaGhoaGgICAAAkJCQAAAJCZ+fn+wkJCkEoJASxcuXLnwTg4T8uXkCBAnym0CdQqXL+XLly5cuXLsXLly5cuXLlyAgICAgICAgICAgICAgQEBAQEBAQEBAQEAAAAAAAAAAAAAA//OCAgICAgICAgICAgQEBAQEBAQEBAQEAAAAAAAAAAAAAA//OCAgICBcICAgIEBAQEBAQEBAQEBAAAAAAAAAAAAAAAA//LiYA4LkBAQEBAQEBAQEBAQEBAAAAAAAAAAAAAAAA//LiA4QE/+0MQRgAmmj239BEAO6XOPvzxAABAQEBAQEBAQEBAAAAAAAAAAAAAA7/8uIDgAQICAgICAgICBAQEBAQEBAQEBAQLiAgICAgICAgICAgIEBAQEBAQEBAQEBAAAAAAAAAAAAAA//OCAgICAgICAgICAgQEBAQEBAQEBAQEAAAAAAAAAAAAAA/wSAgICAgICAgfwAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
    audio.volume = 0.15;
    audio.play().catch((e) => console.log("Audio play prevented:", e));

    if (dockPosition) {
      const windowRect = windowRef.current?.getBoundingClientRect();
      if (windowRect) {
        const minimizeX =
          dockPosition.x - (windowRect.left + windowRect.width / 2);
        const minimizeY =
          dockPosition.y - (windowRect.top + windowRect.height / 2);

        // Set CSS variables for the animation
        if (windowRef.current) {
          windowRef.current.style.setProperty("--minimize-x", `${minimizeX}px`);
          windowRef.current.style.setProperty("--minimize-y", `${minimizeY}px`);
        }
      }
    }

    setIsMinimizing(true);
    setTimeout(() => {
      setIsMinimizing(false);
      onMinimize();
    }, 300);
  };

  // Calculate animation classes
  const animationClasses = isClosing
    ? "animate-scale-out"
    : isMinimizing
    ? "animate-minimize-to-dock"
    : "animate-scale-in";

  // Media queries for responsive sizing on small screens
  useEffect(() => {
    const handleMediaQueryChange = (
      e: MediaQueryListEvent | MediaQueryList
    ) => {
      if (e.matches) {
        // On small screens, adjust window size
        setSize({
          width: Math.min(size.width, window.innerWidth - 20),
          height: Math.min(size.height, window.innerHeight - 60),
        });

        // Ensure window is visible
        setPosition({
          x: Math.min(position.x, window.innerWidth - 100),
          y: Math.min(position.y, window.innerHeight - 100),
        });
      }
    };

    const mediaQuery = window.matchMedia("(max-width: 768px)");
    handleMediaQueryChange(mediaQuery); // Initial check

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () =>
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, []);

  return (
    <div
      ref={windowRef}
      id={`window-${id}`}
      className={`window absolute ${animationClasses} ${
        isActive ? "ring-1 ring-os-accent" : ""
      }`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
        zIndex: zIndex,
      }}
      onClick={handleWindowClick}
    >
      {/* Window header */}
      <div
        className="window-header cursor-move flex items-center justify-between"
        onMouseDown={handleHeaderMouseDown}
        onDoubleClick={handleHeaderDoubleClick}
      >
        <div className="flex items-center">
          <div className="window-controls">
            <button
              className="window-control bg-red-500 hover:bg-red-600"
              onClick={handleClose}
              title="Close"
            />
            <button
              className="window-control bg-yellow-500 hover:bg-yellow-600"
              onClick={handleMinimize}
              title="Minimize"
            />
            <button
              className="window-control bg-green-500 hover:bg-green-600"
              onClick={handleMaximize}
              title={isMaximized ? "Restore" : "Fit Content"}
            />
          </div>
          <div className="flex items-center window-title">
            <span className="mr-2">{icon}</span>
            {title}
          </div>
        </div>
      </div>

      {/* Window content */}
      <div className="window-content" ref={contentRef}>
        {children}
      </div>

      {/* Resize handles - all sides and corners */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Corner resize handles */}
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize pointer-events-auto"
          onMouseDown={(e) => handleResizeMouseDown(e, "se")}
        />
        <div
          className="absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize pointer-events-auto"
          onMouseDown={(e) => handleResizeMouseDown(e, "sw")}
        />
        <div
          className="absolute top-0 right-0 w-4 h-4 cursor-ne-resize pointer-events-auto"
          onMouseDown={(e) => handleResizeMouseDown(e, "ne")}
        />
        <div
          className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize pointer-events-auto"
          onMouseDown={(e) => handleResizeMouseDown(e, "nw")}
        />

        {/* Edge resize handles */}
        <div
          className="absolute top-0 left-4 right-4 h-2 cursor-n-resize pointer-events-auto"
          onMouseDown={(e) => handleResizeMouseDown(e, "n")}
        />
        <div
          className="absolute bottom-0 left-4 right-4 h-2 cursor-s-resize pointer-events-auto"
          onMouseDown={(e) => handleResizeMouseDown(e, "s")}
        />
        <div
          className="absolute left-0 top-4 bottom-4 w-2 cursor-w-resize pointer-events-auto"
          onMouseDown={(e) => handleResizeMouseDown(e, "w")}
        />
        <div
          className="absolute right-0 top-4 bottom-4 w-2 cursor-e-resize pointer-events-auto"
          onMouseDown={(e) => handleResizeMouseDown(e, "e")}
        />
      </div>
    </div>
  );
};

export default Window;
