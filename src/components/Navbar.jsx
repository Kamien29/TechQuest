function Navbar({ onBack, xp = 0 }) {
  return (
    <header className="navbar">
      <div className="nav-left">
        {onBack && (
          <button className="back-button" onClick={onBack}>
            ←
          </button>
        )}

        <div className="logo">
          <span>🚀</span>
          <strong>TECH QUEST</strong>
        </div>
      </div>

      <div className="xp-badge">
        🏆 {xp} XP
      </div>
    </header>
  );
}

export default Navbar;