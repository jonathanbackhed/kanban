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

// ! REMOVE IN FUTURE
const data = {
  todo: [
    { id: "1", title: "Task 1", index: 0 },
    { id: "2", title: "Task 2", text: "This is task 2!", index: 2 },
    {
      id: "3",
      title: "Task 3",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      index: 1,
    },
  ],
  inprogress: [
    {
      id: "4",
      title: "Task 4",
      text: "Task 4444444444444444444444444444444444444444444444444444444444",
      index: 0,
    },
    {
      id: "5",
      title: "Task 5",
      index: 1,
    },
  ],
  done: [{ id: "6", title: "Task 6", text: "Task 6666666", index: 0 }],
};

type ItemsState = {
  [key: string]: CardType[];
};

export default function Board() {
  const [items, setItems] = useState<ItemsState>(data);
  const [activeId, setActiveId] = useState<string | null>(null);

  const pointerSensor = useSensor(PointerSensor);
  const touchSensor = useSensor(TouchSensor);
  const sensors = useSensors(pointerSensor, touchSensor);

  const findContainer = (id: string) => {
    if (id in items) return id;
    return Object.keys(items).find((key) => items[key].some((card) => card.id === id));
  };

  const getItemById = (id: string) => {
    const currentContainer = findContainer(id);
    if (!currentContainer) return null;

    return items[currentContainer].find((card) => card.id === id);
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
        [currentContainer]: prev[currentContainer].filter((item) => item.id !== active.id),
        [overContainer]: [...prev[overContainer], item],
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
      const currentIndex = prev[currentContainer].findIndex((item) => item.id === (active.id as string));
      const overIndex = prev[currentContainer].findIndex((item) => item.id === (over.id as string));

      if (currentIndex === overIndex) return prev;

      // TODO: Modify currentIndex and overIndex and apply correct index to their objects

      return {
        ...prev,
        [currentContainer]: arrayMove(prev[currentContainer], currentIndex, overIndex),
      };
    });
  }

  return (
    <div className="flex flex-1 flex-row overflow-auto bg-gray-400 p-4">
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onDragOver={handleDragOver}
        autoScroll={false}
      >
        <Column id="todo" title="ToDo" items={items["todo"]} />
        <Column id="inprogress" title="In Progress" items={items["inprogress"]} />
        <Column id="done" title="Done" items={items["done"]} />
        <DragOverlay>{activeId ? <Card item={getItemById(activeId)} /> : null}</DragOverlay>
      </DndContext>
    </div>
  );
}
