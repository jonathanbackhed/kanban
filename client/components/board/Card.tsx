"use client";

import { Task } from "@/types/board";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  item: Task | null | undefined;
}

export default function Card({ item }: Props) {
  if (item === null || item === undefined) return null;

  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: item?.id,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="my-2 cursor-grab rounded-lg border border-gray-300 bg-white p-4 active:cursor-grabbing"
      {...listeners}
      {...attributes}
    >
      {item?.title}
    </div>
  );
}
