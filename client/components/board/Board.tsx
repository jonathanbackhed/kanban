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
import { Card as CardType } from "@/types/board";
import Card from "./Card";
import { arrayMove } from "@dnd-kit/sortable";
import BoardControls from "./BoardControls";

type Data = {
  title: string;
  items: CardType[];
};

type ItemsState = {
  [key: string]: Data;
};

interface Props {
  data: ItemsState;
}

export default function Board({ data }: Props) {
  const [items, setItems] = useState<ItemsState>(data);
  const [activeId, setActiveId] = useState<string | null>(null);

  const pointerSensor = useSensor(PointerSensor);
  const touchSensor = useSensor(TouchSensor);
  const sensors = useSensors(pointerSensor, touchSensor);

  const findContainer = (id: string) => {
    if (id in items) return id;
    return Object.keys(items).find((key) => items[key].items.some((card) => card.id === id));
  };

  const getItemById = (id: string) => {
    const currentContainer = findContainer(id);
    if (!currentContainer) return null;

    return items[currentContainer].items.find((card) => card.id === id);
  };

  const getItemIndex = (id: string) => {
    const currentContainer = findContainer(id);
    console.log(items[currentContainer as string]);
  };

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    setActiveId(active.id as string);
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const currentContainer = findContainer(active.id as string);
    const overContainer = findContainer(over?.id as string);

    if (!currentContainer || !overContainer || currentContainer === overContainer) return;

    setItems((prev) => {
      const item = getItemById(active.id as string);
      if (!item) return prev;

      return {
        ...prev,
        [currentContainer]: {
          ...prev[currentContainer],
          items: prev[currentContainer].items.filter((item) => item.id !== active.id),
        },
        [overContainer]: {
          ...prev[overContainer],
          items: [...prev[overContainer].items, item],
        },
      };
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;

    const currentContainer = findContainer(active.id as string);
    const overContainer = findContainer(over.id as string);

    if (!currentContainer || !overContainer || currentContainer !== overContainer) return;

    setActiveId(null);
    setItems((prev) => {
      const currentIndex = prev[currentContainer].items.findIndex((item) => item.id === (active.id as string));
      const overIndex = prev[currentContainer].items.findIndex((item) => item.id === (over.id as string));

      if (currentIndex === overIndex) return prev;

      // TODO: Modify currentIndex and overIndex and apply correct index to their objects

      return {
        ...prev,
        [currentContainer]: {
          ...prev[currentContainer],
          items: arrayMove(prev[currentContainer].items, currentIndex, overIndex),
        },
      };
    });
  }

  return (
    <div className="flex flex-1 flex-col overflow-auto p-4">
      <BoardControls />
      <div className="flex flex-1 space-x-2">
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          autoScroll={false}
        >
          {Object.entries(items).map(([key, value]: any) => (
            <Column key={key} id={key} title={value.title} items={items[key].items} />
          ))}
          <DragOverlay>{activeId ? <Card item={getItemById(activeId)} /> : null}</DragOverlay>
        </DndContext>
      </div>
    </div>
  );
}
