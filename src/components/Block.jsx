import React from "react";

function Block({
  block,
  onDelete,
  onDragStart,
  onDrop,
  onDragOver,
  onCountChange,
}) {
  const children = Array.isArray(block.children) ? block.children : [];
  const className = `code-block ${block.type.toLowerCase()}`;

  if (block.type === "LOOP") {
    const count = block.count || 3;

    function changeCount(value) {
      const newCount = Math.max(1, Math.min(20, Number(value) || 1));

      if (onCountChange) {
        onCountChange(block.id, newCount);
      }
    }

    return (
      <div
        className="program-block loop-block"
        draggable
        onDragStart={(e) => onDragStart(e, block)}
        onDrop={(e) => onDrop(e, block)}
        onDragOver={(e) => onDragOver(e, block)}
      >
        <div className={className}>
          <span>🔁 POWTÓRZ</span>

          <div className="loop-count">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                changeCount(count - 1);
              }}
            >
              −
            </button>

            <input
              type="number"
              min="1"
              max="20"
              value={count}
              onChange={(e) => {
                e.stopPropagation();
                changeCount(e.target.value);
              }}
              onClick={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              onDragStart={(e) => e.stopPropagation()}
            />

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                changeCount(count + 1);
              }}
            >
              +
            </button>
          </div>

          <span>RAZY</span>

          <div className="block-controls">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(block.id);
              }}
            >
              🗑
            </button>
          </div>
        </div>

        <div
          className="loop-children"
          onDrop={(e) => {
            e.stopPropagation();
            onDrop(e, block, true);
          }}
          onDragOver={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          {children.length === 0 && (
            <div className="loop-placeholder">Przeciągnij blok tutaj</div>
          )}

          {children.map((child) => (
            <Block
              key={child.id}
              block={child}
              onDelete={onDelete}
              onDragStart={onDragStart}
              onDrop={onDrop}
              onDragOver={onDragOver}
              onCountChange={onCountChange}
            />
          ))}
        </div>

        <div className="loop-bottom" />
      </div>
    );
  }

  return (
    <div
      className="program-block"
      draggable
      onDragStart={(e) => onDragStart(e, block)}
      onDrop={(e) => onDrop(e, block)}
      onDragOver={(e) => onDragOver(e, block)}
    >
      <div className={className}>
        <span>{block.label}</span>

        <div className="block-controls">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(block.id);
            }}
          >
            🗑
          </button>
        </div>
      </div>
    </div>
  );
}

export default Block;
