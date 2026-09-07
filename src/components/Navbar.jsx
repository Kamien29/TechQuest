import XPBadge from "./XPBadge"

function Navbar({ xp = 0 }) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">
            🚀
          </span>
          <span>TECH QUEST</span>
        </div>
        <XPBadge xp={xp} />
      </div>
    </header>
  )
}

export default Navbar
