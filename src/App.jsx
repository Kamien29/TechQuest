import { useState } from "react";
import Home from "./pages/Home";
import Missions from "./pages/Missions";
import Mission from "./pages/Mission";
import Results from "./pages/Results";

function App() {
  const [page, setPage] = useState("home");
  const [selectedMission, setSelectedMission] = useState(null);
  const [result, setResult] = useState(null);

  const goToMissions = () => {
    setPage("missions");
  };

  const startMission = (mission) => {
    setSelectedMission(mission);
    setPage("mission");
  };

  const finishMission = (data) => {
    setResult(data);
    setPage("results");
  };

  const goHome = () => {
    setPage("home");
  };

  if (page === "missions") {
    return (
      <Missions
        onBack={goHome}
        onStartMission={startMission}
      />
    );
  }

  if (page === "mission") {
    return (
      <Mission
        mission={selectedMission}
        onBack={goToMissions}
        onFinish={finishMission}
      />
    );
  }

  if (page === "results") {
    return (
      <Results
        result={result}
        onMenu={goToMissions}
        onReplay={() => startMission(selectedMission)}
      />
    );
  }

  return <Home onStart={goToMissions} />;
}

export default App;