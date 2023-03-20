import { useTheme } from 'next-themes';
import React from 'react';
import { useState, useEffect } from "react";

const ThemeSwitch = (): JSX.Element => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  if (!mounted) return null


  const isDark = theme === 'dark';
  const color = isDark ? '#fff' : '#000';
  const maskColor = isDark ? '#000' : '#fff';
  return (
    <button
      className="theme-button"
      type="button"
      aria-label="Toggle Dark Mode"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
      {theme === "light"? (<span>Roland Shum 🌙</span>):<span>Roland Shum 🔆</span>}
    </button>
  );
};

export default ThemeSwitch;
