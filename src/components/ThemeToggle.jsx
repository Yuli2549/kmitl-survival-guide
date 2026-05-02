// src/components/ThemeToggle.jsx
import React, { useState, useEffect } from 'react';

const ThemeToggle = () => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') === 'dark';
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark]);

  return (
    <button
      onClick={() => setIsDark(!isDark)}
      className="w-10 h-10 flex items-center justify-center rounded-full bg-card border border-border-card shadow-sm hover:scale-110 transition-all duration-300"
    >
      {isDark ? (
        <span className="material-symbols-outlined text-yellow-400">light_mode</span>
      ) : (
        <span className="material-symbols-outlined text-text-base">dark_mode</span>
      )}
    </button>
  );
};

export default ThemeToggle;