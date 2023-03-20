import { useTheme } from "next-themes";
import React from "react";
import { useState, useEffect } from "react";

const ThemeSwitch = (): JSX.Element => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = theme === "dark";
  return (
    <button
      className="theme-button mr-8 md:py-5 py-3 px-5"
      type="button"
      aria-label="Toggle Dark Mode"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "light" ? (
        <span className="modeSwitcher">Dark Mode 🌙</span>
      ) : (
        <span className="modeSwitcher">Light Mode 🔆</span>
      )}
    </button>
  );
};

export default ThemeSwitch;
