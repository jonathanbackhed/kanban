"use client";

import { useState } from "react";
import { DndContext, useSensor, useSensors, DragEndEvent, TouchSensor, PointerSensor } from "@dnd-kit/core";
import Column from "./Column";
import { Card } from "@/types/board";

const data = {
  todo: [
    { id: "1", title: "Task 1" },
    { id: "2", title: "Task 2", text: "This is task 2!" },
    {
      id: "3",
      title: "Task 3",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
  ],
  inprogress: [
    { id: "4", title: "Task 4", text: "Task 4444444444444444444444444444444444444444444444444444444444" },
    {
      id: "5",
      title: "Task 5",
    },
  ],
  done: [
    { id: "6", title: "Task 6", text: "Task 6666666" },
    {
      id: "7",
      title: "Task 7",
    },
  ],
};

type ItemsState = {
  [key: string]: Card[];
};

export default function Board() {
  const [items, setItems] = useState<ItemsState>(data);

  const pointerSensor = useSensor(PointerSensor);
  const touchSensor = useSensor(TouchSensor);
  const sensors = useSensors(pointerSensor, touchSensor);

  const findContainer = (id: string) => {
    if (id in items) return id;
    return Object.keys(items).find((key) => items[key].some((card) => card.id === id));
  };

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    const currentContainer = findContainer(active.id as string);
    const newContainer = findContainer(over?.id as string);

    if (!currentContainer || !newContainer || currentContainer === newContainer) return;

    setItems((prev) => {
      const item = prev[currentContainer].find((item) => item.id === active.id);
      if (!item) return prev;

      return {
        ...prev,
        [currentContainer]: prev[currentContainer].filter((item) => item.id !== active.id),
        [newContainer]: [...prev[newContainer], item],
      };
    });
  }

  return (
    <div className="flex flex-row flex-1 overflow-auto p-4 bg-gray-400">
      <DndContext sensors={sensors} onDragEnd={handleDragEnd} autoScroll={false}>
        <Column id="todo" title="ToDo" items={items["todo"]} />
        <Column id="inprogress" title="In Progress" items={items["inprogress"]} />
        <Column id="done" title="Done" items={items["done"]} />
      </DndContext>
    </div>
  );
}
