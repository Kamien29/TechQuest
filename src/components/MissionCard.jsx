function MissionCard({ mission, completed, onStart }) {
  return (
    <div className={`mission-card ${!mission.unlocked ? "locked" : ""}`}>
      <div className="mission-number">
        {mission.unlocked ? `0${mission.id}` : "🔒"}
      </div>

      <div className="mission-info">
        <h3>{mission.title}</h3>
        <p>{mission.description}</p>

        <div className="mission-meta">
          <span>{mission.difficulty}</span>
          <span>🏆 {mission.xp} XP</span>
        </div>
      </div>

      <div className="mission-action">
        {completed ? (
          <button className="completed-button" disabled>
            ✓ Ukończona
          </button>
        ) : mission.unlocked ? (
          <button className="primary-button" onClick={() => onStart(mission)}>
            Start
          </button>
        ) : (
          <button className="locked-button" disabled>
            🔒 Zablokowana
          </button>
        )}
      </div>
    </div>
  );
}

export default MissionCard;