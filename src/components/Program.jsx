import React, { useState } from "react";
import Block from "./Block";

function createBlock(data) {
  return {
    ...data,
    id: crypto.randomUUID(),
    ...(data.type === "LOOP" ? { count: data.count || 3, children: [] } : {}),
  };
}

function removeById(blocks, id) {
  let removed = null;
  const result = [];

  for (const block of blocks) {
    if (block.id === id) {
      removed = block;
      continue;
    }

    if (Array.isArray(block.children)) {
      const nested = removeById(block.children, id);
      if (nested.removed) removed = nested.removed;
      result.push({ ...block, children: nested.blocks });
    } else {
      result.push(block);
    }
  }

  return { blocks: result, removed };
}

function containsId(blocks, id) {
  return blocks.some(
    (block) => block.id === id || (Array.isArray(block.children) && containsId(block.children, id))
  );
}

function insertBefore(blocks, targetId, item) {
  const result = [];
  for (const block of blocks) {
    if (block.id === targetId) result.push(item);
    result.push(block);
  }
  return result;
}

function addToLoop(blocks, loopId, child) {
  return blocks.map((block) => {
    if (block.id === loopId && block.type === "LOOP") {
      return { ...block, children: [...(block.children || []), child] };
    }
    if (Array.isArray(block.children)) {
      return { ...block, children: addToLoop(block.children, loopId, child) };
    }
    return block;
  });
}

export default function Program({ program, setProgram }) {
  const [draggedBlock, setDraggedBlock] = useState(null);
  const [dragOverId, setDragOverId] = useState(null);

  function handleDragStart(e, block) {
    setDraggedBlock(block);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("application/x-techquest-block", block.id);
  }

  function handleDragOver(e, block) {
    e.preventDefault();
    e.stopPropagation();
    setDragOverId(block.id);
  }

  function finishDrag() {
    setDraggedBlock(null);
    setDragOverId(null);
  }

  function handleDrop(e, targetBlock, intoLoop = false) {
    e.preventDefault();
    e.stopPropagation();

    const paletteData = e.dataTransfer.getData("application/x-techquest-palette");
    if (paletteData) {
      const newBlock = createBlock(JSON.parse(paletteData));
      if (targetBlock.type === "LOOP" || intoLoop) {
        setProgram(addToLoop(program, targetBlock.id, newBlock));
      } else {
        setProgram(insertBefore(program, targetBlock.id, newBlock));
      }
      finishDrag();
      return;
    }

    if (!draggedBlock || draggedBlock.id === targetBlock.id) {
      finishDrag();
      return;
    }

    if (containsId(draggedBlock.children || [], targetBlock.id)) {
      finishDrag();
      return;
    }

    const { blocks: withoutDragged, removed } = removeById(program, draggedBlock.id);
    if (!removed) {
      finishDrag();
      return;
    }

    if (targetBlock.type === "LOOP" || intoLoop) {
      setProgram(addToLoop(withoutDragged, targetBlock.id, removed));
      finishDrag();
      return;
    }

    setProgram(insertBefore(withoutDragged, targetBlock.id, removed));
    finishDrag();
  }

  function handleProgramDrop(e) {
    e.preventDefault();
    const paletteData = e.dataTransfer.getData("application/x-techquest-palette");
    if (paletteData) {
      setProgram((prev) => [...prev, createBlock(JSON.parse(paletteData))]);
      finishDrag();
      return;
    }
    if (draggedBlock) {
      const { blocks, removed } = removeById(program, draggedBlock.id);
      if (removed) setProgram([...blocks, removed]);
    }
    finishDrag();
  }

  function deleteBlock(id) {
    setProgram(removeById(program, id).blocks);
  }

  return (
    <div
      className="program-box"
      onDrop={handleProgramDrop}
      onDragOver={(e) => e.preventDefault()}
    >
      <div className="program-header">
        <h3>💻 Twój program</h3>
        <span>{program.length} bloków</span>
      </div>

      <div className="program-list">
        {program.length === 0 ? (
          <div className="empty-program">
            <span>🧩</span>
            <p>Przeciągnij tutaj bloki instrukcji</p>
          </div>
        ) : (
          program.map((block) => (
            <div className={dragOverId === block.id ? "drop-target" : ""} key={block.id}>
              <Block
                block={block}
                onDelete={deleteBlock}
                onDragStart={handleDragStart}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}
