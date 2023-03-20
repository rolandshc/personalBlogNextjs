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
        <a className="text-sm text-gray-900 dark:text-white">Dark Mode 🌙</a>
      ) : (
        <a className="text-sm text-gray-900 dark:text-white">Light Mode 🔆</a>
      )}
    </button>
  );
};

export default ThemeSwitch;
