function XPBadge({ xp = 0 }) {
  return (
    <div className="xp-badge" aria-label={`${xp} punktów doświadczenia`}>
      <span aria-hidden="true">🏆</span>
      <span>{xp} XP</span>
    </div>
  )
}

export default XPBadge
