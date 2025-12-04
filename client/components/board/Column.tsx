"use client";

import { Task } from "@/types/board";
import Card from "./Card";
import { useDroppable } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

interface Props {
  id: string;
  title: string;
  items: Task[];
}

export default function Column({ items, id, title }: Props) {
  const { isOver, setNodeRef } = useDroppable({ id });
  const style = {
    color: isOver ? "green" : undefined,
  };

  // const sorted = items.sort((a, b) => a.index - b.index);

  return (
    <div className="flex max-w-sm min-w-2xs flex-1 flex-col rounded-lg bg-neutral-100 p-2" style={style}>
      <h3 className="p-2">{title}</h3>
      <div ref={setNodeRef} className="flex-1">
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((item: Task) => (
            <Card key={item.id} item={item} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
