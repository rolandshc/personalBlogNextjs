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
      className="theme-button md:py-5 py-3 pl-5 text-3xl"
      type="button"
      aria-label="Toggle Dark Mode"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "light" ? (
        <span className="">🌚</span>
      ) : (
        <span className="">🌝</span>
      )}
    </button>
  );
};

export default ThemeSwitch;
