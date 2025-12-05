"use client";

import { useState } from "react";
import {
  DndContext,
  useSensor,
  useSensors,
  DragEndEvent,
  TouchSensor,
  PointerSensor,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import Column from "./Column";
import Card from "./Card";
import { arrayMove } from "@dnd-kit/sortable";
import BoardControls from "./BoardControls";
import { Column as ColumnType, KanbanBoard } from "@/types/board";

interface Props {
  data: KanbanBoard;
}

export default function Board({ data }: Props) {
  const [board, setBoard] = useState<KanbanBoard>(data);
  const [activeId, setActiveId] = useState<string | null>(null);

  const pointerSensor = useSensor(PointerSensor);
  const touchSensor = useSensor(TouchSensor);
  const sensors = useSensors(pointerSensor, touchSensor);

  const findColumnId = (id: string) => {
    return board.data.find((col) => col.id === id || col.items.some((item) => item.id === id))?.id;
  };

  const getItemById = (id: string) => {
    const colId = findColumnId(id);
    if (!colId) return null;

    return board.data.find((c) => c.id === colId)?.items.find((i) => i.id === id);
  };

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    setActiveId(active.id as string);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const currentColumnId = findColumnId(active.id as string);
    const overColumnId = findColumnId(over?.id as string);

    if (!currentColumnId || !overColumnId || currentColumnId === overColumnId) return;

    setBoard((prev) => {
      const item = getItemById(active.id as string);
      if (!item) {
        console.error("GET ITEM FAILED");
        return prev;
      }

      return {
        ...prev,
        data: prev.data.map((col) => {
          if (col.id === currentColumnId) {
            return { ...col, items: col.items.filter((i) => i.id !== active.id) };
          }
          if (col.id === overColumnId) {
            return { ...col, items: [...col.items, item] };
          }
          return col;
        }),
      };
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const currentColumnId = findColumnId(active.id as string);
    const overColId = findColumnId(over.id as string);

    if (!currentColumnId || !overColId || currentColumnId !== overColId) return;

    setActiveId(null);
    setBoard((prev) => {
      const currentIndex = prev.data
        .find((c) => c.id === currentColumnId)
        ?.items.findIndex((i) => i.id === (active.id as string));
      const overIndex = prev.data
        .find((c) => c.id === currentColumnId)
        ?.items.findIndex((i) => i.id === (over.id as string));

      if (currentIndex === undefined || overIndex === undefined || currentIndex === overIndex) return prev;

      // TODO: Modify currentIndex and overIndex and apply correct index to their objects

      return {
        ...prev,
        data: prev.data.map((col) => {
          if (col.id === currentColumnId) {
            return { ...col, items: arrayMove(col.items, currentIndex, overIndex) };
          }
          return col;
        }),
      };
    });
  }

  return (
    <div className="flex flex-1 flex-col overflow-auto p-4">
      <BoardControls setBoard={setBoard} />
      <div className="flex flex-1 space-x-2">
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          autoScroll={false}
        >
          {board.data.map((col: ColumnType) => (
            <Column key={col.id} id={col.id} title={col.title} items={col.items} />
          ))}
          <DragOverlay>{activeId ? <Card item={getItemById(activeId)} /> : null}</DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}
