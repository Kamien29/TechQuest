import { useEffect } from "react";

function Results({ result, onMenu, onReplay }) {
  useEffect(() => {
    if (!result) return;

    let completed = [];
    try {
      completed = JSON.parse(
        localStorage.getItem("techQuestCompletedMissions") || "[]"
      );
    } catch {
      completed = [];
    }

    if (!completed.includes(result.mission.id)) {
      const nextCompleted = [...completed, result.mission.id];
      const oldXP = Number(localStorage.getItem("techQuestXP") || 0);

      localStorage.setItem(
        "techQuestCompletedMissions",
        JSON.stringify(nextCompleted)
      );
      localStorage.setItem("techQuestCompleted", JSON.stringify(nextCompleted));
      localStorage.setItem("techQuestXP", String(oldXP + result.xp));
    }
  }, [result]);

  if (!result) return null;

  const oldXP = Number(localStorage.getItem("techQuestXP") || 0);
  const completed = (() => {
    try {
      return JSON.parse(
        localStorage.getItem("techQuestCompletedMissions") || "[]"
      );
    } catch {
      return [];
    }
  })();

  const alreadyCompletedBefore = completed.includes(result.mission.id);
  const totalXP = alreadyCompletedBefore
    ? oldXP
    : oldXP + result.xp;

  return (
    <div className="app">
      <main className="results-page">
        <div className="results-card">
          <div className="success-icon">🎉</div>
          <span className="eyebrow">MISJA UKOŃCZONA</span>
          <h1>Gratulacje!</h1>
          <p>
            Udało Ci się zaprogramować robota i dotrzeć do celu.
          </p>

          <div className="result-xp">
            <span>+{result.xp}</span>
            <small>XP</small>
          </div>

          <div className="total-xp">
            Łącznie: <strong>{totalXP} XP</strong>
          </div>

          <div className="result-actions">
            <button className="primary-button large" onClick={onReplay}>
              ↻ Zagraj ponownie
            </button>
            <button className="secondary-button large" onClick={onMenu}>
              ← Wszystkie misje
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Results;
