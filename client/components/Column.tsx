"use client";

import Card from "./Card";
import { Card as CardType } from "@/types/board";
import { useDroppable } from "@dnd-kit/core";

interface Props {
  items: CardType[];
  id: string;
  title: string;
}

export default function Column({ items, id, title }: Props) {
  const { isOver, setNodeRef } = useDroppable({ id });
  const style = {
    color: isOver ? "green" : undefined,
  };

  return (
    <div ref={setNodeRef} className="flex-1 p-2 bg-gray-100 rounded-lg mx-2 max-w-sm min-w-2xs" style={style}>
      <h3 className="p-2">{title}</h3>
      {items.map((item: CardType) => (
        <Card key={item.id} item={item} />
      ))}
    </div>
  );
}
