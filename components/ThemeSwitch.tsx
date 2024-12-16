import { useTheme } from "next-themes";
import React, { useState, useEffect } from "react";

const ThemeSwitch: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = theme === "dark" || theme === undefined;
  const themeIcon = isDark ? "🌝" : "🌚";
  const ariaLabel = isDark ? "Switch to Light Mode" : "Switch to Dark Mode";

  return (
    <button
      className="theme-button md:py-5 py-3 pl-5"
      type="button"
      aria-label={ariaLabel}
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      <span className="theme-icon">{themeIcon}</span>
    </button>
  );
};

export default ThemeSwitch;
