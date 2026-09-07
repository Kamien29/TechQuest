import Robot from "./Robot";

function Board({ board, robot }) {
  const cells = [];
  const obstacles = board.obstacles || [];

  for (let y = 0; y < board.height; y++) {
    for (let x = 0; x < board.width; x++) {
      const isRobot = robot.x === x && robot.y === y;
      const isGoal = board.goal.x === x && board.goal.y === y;
      const isObstacle = obstacles.some(
        (obstacle) => obstacle.x === x && obstacle.y === y
      );

      cells.push(
        <div
          key={`${x}-${y}`}
          className={`board-cell ${isObstacle ? "obstacle" : ""}`}
        >
          {isRobot && <Robot direction={robot.direction} />}
          {isGoal && !isRobot && <span className="goal">⭐</span>}
        </div>
      );
    }
  }

  return (
    <div className="board-wrapper">
      <div
        className="board"
        style={{ gridTemplateColumns: `repeat(${board.width}, 1fr)` }}
      >
        {cells}
      </div>
    </div>
  );
}

export default Board;
