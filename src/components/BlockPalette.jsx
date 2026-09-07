const blocks = [
  { type: "MOVE", label: "▶ Idź" },
  { type: "TURN_LEFT", label: "↰ Lewo" },
  { type: "TURN_RIGHT", label: "↱ Prawo" },
  { type: "LOOP", label: "🔁 Pętla", count: 3 },
];

function BlockPalette({ onAdd }) {
  function handleDragStart(e, block) {
    e.dataTransfer.effectAllowed = "copy";
    e.dataTransfer.setData("application/x-techquest-palette", JSON.stringify(block));
  }

  return (
    <div className="block-palette">
      <h3>🧩 Dostępne bloki</h3>
      <p className="section-description">
        Przeciągnij blok do programu albo kliknij, aby go dodać.
      </p>

      <div className="palette-list">
        {blocks.map((block) => (
          <button
            type="button"
            className="palette-button"
            key={block.type}
            draggable
            onDragStart={(e) => handleDragStart(e, block)}
            onClick={() => onAdd(block)}
          >
            <div className={`code-block ${block.type.toLowerCase()}`}>
              <span>{block.label}</span>
              {block.type === "LOOP" && <strong>×{block.count}</strong>}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default BlockPalette;
