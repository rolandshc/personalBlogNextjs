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
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    > dark/light
    </button>
    // <div>
    // {/* The current theme is: {theme}
    // <button onClick={() => setTheme('light')}>Light Mode</button>
    // <button onClick={() => setTheme('dark')}>Dark Mode</button> */}
  // </div>
  );
};

export default ThemeSwitch;
