"use client";

import { Card as CardType } from "@/types/board";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  item: CardType;
}

export default function Card({ item }: Props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: item.id,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="p-4 my-2 bg-white border border-gray-300 rounded-lg cursor-grab active:cursor-grabbing"
      {...listeners}
      {...attributes}
    >
      {item.title}
    </div>
  );
}
