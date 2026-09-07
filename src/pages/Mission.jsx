import { useEffect, useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import BlockPalette from "../components/BlockPalette";
import Program from "../components/Program";
import Board from "../components/Board";
import ProgressBar from "../components/ProgressBar";
import { expandProgram, executeCommand } from "../utils/gameEngine";

function containsLoop(program) {
  return program.some(
    (block) =>
      block.type === "LOOP" ||
      (Array.isArray(block.children) && containsLoop(block.children))
  );
}

function MissionPage({ mission, onBack, onFinish }) {
  const [program, setProgram] = useState([]);
  const [robot, setRobot] = useState({ ...mission.board.robot });
  const [running, setRunning] = useState(false);
  const [message, setMessage] = useState("Ułóż program i uruchom robota.");
  const [currentCommand, setCurrentCommand] = useState(0);

  useEffect(() => {
    setProgram([]);
    setRobot({ ...mission.board.robot });
    setRunning(false);
    setMessage("Ułóż program i uruchom robota.");
    setCurrentCommand(0);
  }, [mission]);

  const addBlock = (block) => {
    const newBlock = {
      ...block,
      id: crypto.randomUUID(),
      ...(block.type === "LOOP" ? { children: [], count: block.count || 3 } : {}),
    };

    setProgram((prev) => [...prev, newBlock]);
  };

  const clearProgram = () => {
    if (running) return;
    setProgram([]);
    setRobot({ ...mission.board.robot });
    setMessage("Ułóż program i uruchom robota.");
    setCurrentCommand(0);
  };

  const commands = useMemo(() => expandProgram(program), [program]);
  const totalCommands = Math.max(commands.length, 1);

  const runProgram = async () => {
    if (running || program.length === 0) return;

    if (mission.id === 5 && !containsLoop(program)) {
      setMessage("🔁 Ta misja wymaga użycia pętli!");
      return;
    }

    setRunning(true);
    setMessage("🤖 Robot wykonuje program...");
    setCurrentCommand(0);

    let currentRobot = { ...mission.board.robot };

    for (let i = 0; i < commands.length; i++) {
      setCurrentCommand(i + 1);

      await new Promise((resolve) => setTimeout(resolve, 450));

      const result = executeCommand(currentRobot, commands[i], mission.board);
      currentRobot = result.robot;
      setRobot(currentRobot);

      if (!result.success) {
        setMessage(result.error);
        setRunning(false);
        return;
      }

      if (result.completed) {
        setMessage("🎉 Misja ukończona!");
        setRunning(false);
        setTimeout(() => {
          onFinish({ mission, xp: mission.xp });
        }, 700);
        return;
      }
    }

    setMessage("🤔 Robot nie dotarł do celu. Spróbuj ponownie.");
    setRunning(false);
  };

  return (
    <div className="app">
      <Navbar
        onBack={onBack}
        xp={Number(localStorage.getItem("techQuestXP") || 0)}
      />

      <main className="mission-page">
        <div className="mission-heading">
          <div>
            <span className="eyebrow">MISJA {mission.id}</span>
            <h1>{mission.title}</h1>
            <p>{mission.description}</p>
          </div>
          <div className="mission-reward">🏆 +{mission.xp} XP</div>
        </div>

        <div className="game-layout">
          <aside className="editor-sidebar">
            <BlockPalette onAdd={addBlock} />

            <div className="program-wrapper">
              <Program program={program} setProgram={setProgram} />
            </div>

            <div className="editor-actions">
              <button
                className="run-button"
                onClick={runProgram}
                disabled={running || program.length === 0}
              >
                {running ? "🤖 DZIAŁAM..." : "▶ URUCHOM"}
              </button>

              <button
                className="clear-button"
                onClick={clearProgram}
                disabled={running || program.length === 0}
              >
                🗑 Wyczyść
              </button>
            </div>
          </aside>

          <section className="game-area">
            <div className="game-top">
              <div>
                <span>PLANSZA</span>
                <strong>Programuj robota</strong>
              </div>
              <div className="command-counter">
                {currentCommand} / {totalCommands}
              </div>
            </div>

            <Board board={mission.board} robot={robot} />

            <div
              className={`game-message ${
                message.includes("🎉")
                  ? "success"
                  : message.includes("💥") || message.includes("🔁")
                    ? "error"
                    : ""
              }`}
            >
              {message}
            </div>

            <ProgressBar current={currentCommand} total={totalCommands} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default MissionPage;
