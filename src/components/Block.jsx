import React from "react";

function Block({ block, onDelete, onDragStart, onDrop, onDragOver }) {
  const children = Array.isArray(block.children) ? block.children : [];
  const className = `code-block ${block.type.toLowerCase()}`;

  if (block.type === "LOOP") {
    return (
      <div
        className="program-block"
        draggable
        onDragStart={(e) => onDragStart(e, block)}
        onDrop={(e) => onDrop(e, block)}
        onDragOver={(e) => onDragOver(e, block)}
      >
        <div className={className}>
          <span>🔁 Pętla</span>
          <strong>×{block.count || 3}</strong>
          <div className="block-controls">
            <button type="button" onClick={(e) => { e.stopPropagation(); onDelete(block.id); }}>🗑</button>
          </div>
        </div>

        <div
          className="loop-children"
          onDrop={(e) => onDrop(e, block, true)}
          onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
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
            />
          ))}
        </div>
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
          <button type="button" onClick={(e) => { e.stopPropagation(); onDelete(block.id); }}>🗑</button>
        </div>
      </div>
    </div>
  );
}

export default Block;
