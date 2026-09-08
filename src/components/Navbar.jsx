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
<span class="material-symbols-outlined"><img src="..\src\assets\trophy_24dp_E3E3E3_FILL0_wght400_GRAD0_opsz24.svg" alt="Trophy" /></span> {xp} XP
      </div>
    </header>
  );
}

export default Navbar;