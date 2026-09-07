function Robot({ direction }) {
  const arrows = {
    UP: "↑",
    RIGHT: "→",
    DOWN: "↓",
    LEFT: "←",
  };

  return (
    <div className="robot">
      <div className="robot-face">
        🤖
      </div>

      <span className="robot-direction">
        {arrows[direction]}
      </span>
    </div>
  );
}

export default Robot;