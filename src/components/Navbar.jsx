import ThemeToggle from "./themeToggle";

function Navbar({ onBack, xp = 0 }) {
  return (
    <header className="navbar">
      <div className="nav-left">
        {onBack && (
          <button className="back-button" onClick={onBack} type="button">
            ←
          </button>
        )}

        <div className="logo">
          <strong>TECH QUEST</strong>
        </div>
      </div>

      <div className="nav-right">
        <ThemeToggle />

        <div className="xp-badge">
          🏆 {xp} XP
        </div>
      </div>
    </header>
  );
}

export default Navbar;
