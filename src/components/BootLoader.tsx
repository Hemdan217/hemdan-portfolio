import { useEffect, useState, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

interface BootLoaderProps {
  onBootComplete: () => void;
}

const BootLoader = ({ onBootComplete }: BootLoaderProps) => {
  const [bootStage, setBootStage] = useState(0);
  const [loadingText, setLoadingText] = useState("");
  const bootSequenceRunning = useRef(false);
  const [tipText, setTipText] = useState("");
  const isMobile = useIsMobile();

  // Desktop boot messages - more technical and verbose
  const bootMessages = [
    "Initializing system...",
    "Loading kernel modules...",
    "Starting system services...",
    "Mounting file systems...",
    "Setting up network connections...",
    "Loading user preferences...",
    "Starting HemdanOS...",
  ];

  // Mobile boot messages - simplified and fewer
  const mobileBootMessages = [
    "Booting HemdanOS Mobile...",
    "Loading apps...",
    "Finalizing setup...",
  ];

  // Tips that appear during desktop boot
  const bootTips = [
    "Tip: Swipe down to close apps on mobile",
    "Tip: Click and drag windows to move them",
    "Tip: Double-click app icons to open them",
    "Tip: Right-click for more options",
    "Tip: Explore all apps to learn more about me",
  ];

  useEffect(() => {
    // Prevent running the boot sequence multiple times
    if (bootSequenceRunning.current) return;

    // Set the running flag to prevent multiple executions
    bootSequenceRunning.current = true;

    // First message appears immediately
    setLoadingText(isMobile ? mobileBootMessages[0] : bootMessages[0]);

    // Show random tip for desktop
    if (!isMobile) {
      const randomTip = bootTips[Math.floor(Math.random() * bootTips.length)];
      setTipText(randomTip);
    }

    // Schedule the rest of the messages - shorter for mobile
    const bootSequence = isMobile
      ? [
          { stage: 2, delay: 800 },
          { stage: 5, delay: 1000 },
          { stage: 7, delay: 800 },
        ]
      : [
          { stage: 1, delay: 1000 },
          { stage: 2, delay: 800 },
          { stage: 3, delay: 1200 },
          { stage: 4, delay: 900 },
          { stage: 5, delay: 1000 },
          { stage: 6, delay: 1500 },
          { stage: 7, delay: 2000 },
        ];

    // Track timeouts for cleanup
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    bootSequence.forEach((step, index) => {
      const totalDelay = bootSequence
        .slice(0, index + 1)
        .reduce((total, curr) => total + curr.delay, 0);

      const timeoutId = setTimeout(() => {
        if (isMobile && index < mobileBootMessages.length) {
          setLoadingText(mobileBootMessages[index]);
        } else if (!isMobile && index < bootMessages.length) {
          setLoadingText(bootMessages[index]);
        }
        setBootStage(step.stage);

        // Final step
        if (index === bootSequence.length - 1) {
          const finalDelay = setTimeout(() => {
            // Vibrate on mobile if supported
            if (isMobile && "vibrate" in navigator) {
              try {
                navigator.vibrate(50);
              } catch (e) {
                console.log("Vibration not supported");
              }
            }

            // Call the completion callback
            onBootComplete();
          }, 500);

          timeouts.push(finalDelay);
        }
      }, totalDelay);

      timeouts.push(timeoutId);
    });

    // Cleanup on unmount or rerun
    return () => {
      timeouts.forEach(clearTimeout);
      bootSequenceRunning.current = false; // Reset the running flag
    };
  }, [onBootComplete, isMobile]); // Include onBootComplete and isMobile in dependencies

  // Create sound effect for boot
  useEffect(() => {
    const audio = new Audio();
    audio.src =
      "data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjI5LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAADQADMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzMzM//////////////////////////////////////////////////////////////////8AAAAATGF2YzU4LjU0AAAAAAAAAAAAAAAAJAAAAAAAAAAAQFUwYL4jAAAAAAD/+9DEAAAKkINR9BEAJbhBKT81kAC9A0QCAZAEf5OD/yQgOD5wfBAEAQzg/+CB9+D4Pggf/5wf//BA+D4Pv8EAQBAMQGIQPg+CAIBiAx//5wQBAEAxAYoYIEAQDEBihgg8HwfB8Hw+D589kxBTUUzLjEwMKqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqTEFNRTMuMTAwqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqr/+1DEGQDLOAEp9BEAKXSXZj88kA6qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqo=";
    audio.volume = 0.4;

    // Play boot sound at stage 1
    if (bootStage === 1) {
      audio.play().catch((e) => console.log("Audio play prevented:", e));
    }

    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [bootStage]);

  // iOS-style mobile boot animation
  if (isMobile) {
    return (
      <div className="h-screen w-screen bg-os-desktop-bg flex items-center justify-center flex-col">
        <div className="text-center p-6 flex flex-col items-center">
          {/* Circular avatar with subtle animation */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-os-accent to-blue-500 flex items-center justify-center text-white mb-6 overflow-hidden shadow-lg transition-all duration-300 animate-pulse">
            <span className="text-2xl font-bold">HK</span>
            {/* For a real avatar, uncomment and use your image:
            <img src="/avatar.png" alt="Hemdan Khalifa" className="w-full h-full object-cover" />
            */}
          </div>

          <h1 className="font-bold text-2xl mb-3 tracking-tight">
            Hemdan Khalifa
          </h1>

          <p className="text-sm text-muted-foreground/80 mb-4">
            JavaScript Developer
          </p>

          <div className="mb-6 w-16 h-16 relative">
            {bootStage > 0 && (
              <svg className="animate-spin w-full h-full" viewBox="0 0 24 24">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            )}
          </div>

          <p className="text-sm text-muted-foreground font-medium mb-3">
            {loadingText}
          </p>

          <div className="w-64 h-1 bg-muted rounded-full overflow-hidden mb-2">
            <div
              className="h-full bg-os-accent rounded-full transition-all duration-300 animate-pulse"
              style={{ width: `${(bootStage / 7) * 100}%` }}
            />
          </div>

          <p className="text-xs text-muted-foreground/70">
            {Math.round((bootStage / 7) * 100)}% complete
          </p>

          <p className="text-xs text-muted-foreground/60 mt-2">
            {bootStage >= 5 ? "Touch or swipe to interact" : "v1.0"}
          </p>
        </div>
      </div>
    );
  }

  // Default desktop boot animation
  return (
    <div className="h-screen w-screen bg-os-desktop-bg flex items-center justify-center flex-col">
      <div className="text-center max-w-md">
        <h1 className="font-bold text-3xl mb-8 font-['Ubuntu'] tracking-tight">
          <span className="text-os-accent">Hemdan</span>OS
        </h1>

        <div className="w-64 h-1 bg-muted rounded-full overflow-hidden mb-4">
          <div
            className="h-full bg-os-accent rounded-full transition-all duration-300 animate-pulse"
            style={{ width: `${(bootStage / 7) * 100}%` }}
          />
        </div>

        <p className="text-sm text-muted-foreground mb-1">{loadingText}</p>
        <p className="mb-6 text-xs text-muted-foreground/70">
          {Math.round((bootStage / 7) * 100)}% complete
        </p>

        {tipText && bootStage > 3 && (
          <div className="text-xs text-os-accent/80 bg-muted/30 py-2 px-4 rounded-md inline-block">
            {tipText}
          </div>
        )}
      </div>
    </div>
  );
};

export default BootLoader;
