import React from "react";
import { useTheme } from "next-themes";
import { FiMoon, FiSun } from "react-icons/fi";

const ThemeToggle = () => {
  const { theme, setTheme, systemTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <button
        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-500/40 bg-slate-900/60 text-xs text-slate-100"
        aria-label="Toggle theme"
      >
        <FiMoon className="text-sm" />
      </button>
    );
  }

  const currentTheme = theme === "system" ? systemTheme : theme;
  const isDark = currentTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-500/40 bg-slate-900/60 text-xs text-slate-100 shadow-md shadow-slate-900/60 backdrop-blur hover:border-sky-400 hover:text-sky-300"
      aria-label="Toggle theme"
    >
      {isDark ? <FiSun className="text-lg" /> : <FiMoon className="text-lg" />}
    </button>
  );
};

export default ThemeToggle;
