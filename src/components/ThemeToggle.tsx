
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle = ({ className = "" }: ThemeToggleProps) => {
  const [isDark, setIsDark] = useState(false);

  // Initialize theme from localStorage with light mode as default
  useEffect(() => {
    const savedTheme = localStorage.getItem("hemdan-os-theme");
    
    // Set to dark only if explicitly saved as dark
    const initialDark = savedTheme === "dark";
    setIsDark(initialDark);
    
    if (initialDark) {
      document.documentElement.classList.add("dark");
    } else {
      // Ensure light mode is applied
      document.documentElement.classList.remove("dark");
      localStorage.setItem("hemdan-os-theme", "light");
    }
  }, []);

  const toggleTheme = () => {
    const audio = new Audio();
    audio.src = "data:audio/mpeg;base64,SUQzBAAAAAAAI1RTU0UAAAAPAAADTGF2ZjU4LjI5LjEwMAAAAAAAAAAAAAAA//tQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWGluZwAAAA8AAAACAAADwAD/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8AAAAATGF2YzU4LjU0AAAAAAAAAAAAAAAAJAAAAAAAAAAAwKyx8k3EAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD/+9DEAAAJaANr9BAAI9kApX56IAAAAABYWFhYWFAAAAAAAAAAAEhMZmdoaGhoaGhoaGgICAAAkJCQAAAJCZ+fn+wkJCkEoJASxcuXLnwTg4T8uXkCBAnym0CdQqXL+XLly5cuXLsXLly5cuXLlyAgICAgICAgICAgICAgQEBAQEBAQEBAQEAAAAAAAAAAAAAA//OCAgICAgICAgICAgQEBAQEBAQEBAQEAAAAAAAAAAAAAA//OCAgICBcICAgIEBAQEBAQEBAQEBAAAAAAAAAAAAAAAA//LiYA4LkBAQEBAQEBAQEBAQEBAAAAAAAAAAAAAAAA//LiA4QE/+0MQRgAmmj239BEAO6XOPvzxAABAQEBAQEBAQEBAAAAAAAAAAAAAA7/8uIDgAQICAgICAgICBAQEBAQEBAQEBAQLiAgICAgICAgICAgIEBAQEBAQEBAQEBAAAAAAAAAAAAAA//OCAgICAgICAgICAgQEBAQEBAQEBAQEAAAAAAAAAAAAAA/wSAgICAgICAgfwAAAAAAAAAAAAAAAAAAAAAAAAAAA=";
    audio.volume = 0.2;
    audio.play().catch(e => console.log("Audio play prevented:", e));
    
    setIsDark(!isDark);
    
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("hemdan-os-theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("hemdan-os-theme", "dark");
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className={`rounded-full p-2 hover:bg-muted transition-colors ${className}`}
      aria-label="Toggle theme"
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
};

export default ThemeToggle;
