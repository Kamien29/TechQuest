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
          
          <strong>TECH QUEST</strong>
        </div>
      </div>

      <div className="xp-badge">
        <span class="material-symbols-outlined">trophy</span>
 {xp} XP
      </div>
    </header>
  );
}

export default Navbar;