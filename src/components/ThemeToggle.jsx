import { useEffect, useState } from "react";

const themes = ["dark", "light", "neon"];

const labels = {
  dark: "🌙",
  light: "☀️",
  neon: "🌌",
};

function ThemeToggle() {
  const [theme, setTheme] = useState(
    localStorage.getItem("techQuestTheme") || "dark"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("techQuestTheme", theme);
  }, [theme]);

  function changeTheme() {
    const index = themes.indexOf(theme);
    setTheme(themes[(index + 1) % themes.length]);
  }

  return (
    <button
      className="theme-toggle"
      onClick={changeTheme}
      title={`Motyw: ${theme}`}
      aria-label="Zmień motyw"
      type="button"
    >
      {labels[theme]}
    </button>
  );
}

export default ThemeToggle;
