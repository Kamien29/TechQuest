function getNextPosition(robot) {
  switch (robot.direction) {
    case "UP":
      return { x: robot.x, y: robot.y - 1 };
    case "RIGHT":
      return { x: robot.x + 1, y: robot.y };
    case "DOWN":
      return { x: robot.x, y: robot.y + 1 };
    case "LEFT":
      return { x: robot.x - 1, y: robot.y };
    default:
      return { x: robot.x, y: robot.y };
  }
}

function turnLeft(direction) {
  const directions = ["UP", "LEFT", "DOWN", "RIGHT"];
  const index = directions.indexOf(direction);
  return index === -1 ? direction : directions[(index + 1) % 4];
}

function turnRight(direction) {
  const directions = ["UP", "RIGHT", "DOWN", "LEFT"];
  const index = directions.indexOf(direction);
  return index === -1 ? direction : directions[(index + 1) % 4];
}

export function expandProgram(program) {
  const result = [];

  function expand(block) {
    if (block.type === "LOOP") {
      const children = Array.isArray(block.children) ? block.children : [];
      const count = Math.max(0, Number(block.count) || 0);

      for (let i = 0; i < count; i++) {
        children.forEach(expand);
      }
      return;
    }

    result.push(block);
  }

  (Array.isArray(program) ? program : []).forEach(expand);
  return result;
}

export function executeCommand(robot, command, board) {
  const nextRobot = { ...robot };

  if (command.type === "MOVE") {
    const nextPosition = getNextPosition(robot);

    if (
      nextPosition.x < 0 ||
      nextPosition.x >= board.width ||
      nextPosition.y < 0 ||
      nextPosition.y >= board.height
    ) {
      return {
        success: false,
        completed: false,
        error: "💥 Robot wyszedł poza planszę!",
        robot: nextRobot,
      };
    }

    const hitObstacle = (board.obstacles || []).some(
      (obstacle) =>
        obstacle.x === nextPosition.x && obstacle.y === nextPosition.y
    );

    if (hitObstacle) {
      return {
        success: false,
        completed: false,
        error: "💥 Robot uderzył w przeszkodę!",
        robot: nextRobot,
      };
    }

    nextRobot.x = nextPosition.x;
    nextRobot.y = nextPosition.y;
  } else if (command.type === "TURN_LEFT") {
    nextRobot.direction = turnLeft(robot.direction);
  } else if (command.type === "TURN_RIGHT") {
    nextRobot.direction = turnRight(robot.direction);
  }

  const completed =
    nextRobot.x === board.goal.x && nextRobot.y === board.goal.y;

  return {
    success: true,
    completed,
    robot: nextRobot,
  };
}
