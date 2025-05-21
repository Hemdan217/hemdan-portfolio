import { useState, useEffect } from "react";
import BootLoader from "../components/BootLoader";
import Desktop from "../components/Desktop";
import Mobile from "../components/Mobile";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const [isBooting, setIsBooting] = useState(true);
  const isMobile = useIsMobile();

  const handleBootComplete = () => {
    setIsBooting(false);

    // Set light mode as default (white mode)
    document.documentElement.classList.remove("dark");
    localStorage.setItem("hemdan-os-theme", "light");
  };

  // Listen for system appearance changes
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    // Default to light mode (white) regardless of system preference
    // Only apply saved theme if user manually set it via the toggle
    const savedTheme = localStorage.getItem("hemdan-os-theme");
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("hemdan-os-theme", "light"); // Ensure light mode is default
    }

    const handleChange = (e: MediaQueryListEvent) => {
      // Only apply system preference if user hasn't set a theme manually
      if (!localStorage.getItem("hemdan-os-theme")) {
        const newIsDark = e.matches;
        if (newIsDark) {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }
    };

    darkModeMediaQuery.addEventListener("change", handleChange);

    return () => {
      darkModeMediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <div className="min-h-screen">
      {isBooting ? (
        <BootLoader onBootComplete={handleBootComplete} />
      ) : (
        <>{isMobile ? <Mobile /> : <Desktop />}</>
      )}
    </div>
  );
};

export default Index;
