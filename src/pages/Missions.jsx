import Navbar from "../components/Navbar";
import MissionCard from "../components/MissionCard";
import { getUnlockedMissions } from "../data/missions";

function readCompleted() {
  try {
    return JSON.parse(localStorage.getItem("techQuestCompletedMissions") || "[]");
  } catch {
    return [];
  }
}

function Missions({ onBack, onStartMission }) {
  const xp = Number(localStorage.getItem("techQuestXP") || 0);
  const completed = readCompleted();
  const missions = getUnlockedMissions();

  return (
    <div className="app">
      <Navbar onBack={onBack} xp={xp} />

      <main className="missions-page">
        <div className="page-heading">
          <span className="eyebrow">TECH QUEST</span>
          <h1>Wybierz swoją misję</h1>
          <p>
            Zaprogramuj robota i rozwiązuj coraz trudniejsze zadania.
          </p>
        </div>

        <div className="missions-list">
          {missions.map((mission) => (
            <MissionCard
              key={mission.id}
              mission={mission}
              completed={completed.includes(mission.id)}
              onStart={onStartMission}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default Missions;
