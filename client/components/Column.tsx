"use client";

import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import React from "react";
import Card from "./Card";

interface Props {
  items: string[];
  id: string;
  title: string;
}

export default function Column({ items, id, title }: Props) {
  const { setNodeRef } = useSortable({ id });

  return (
    <div ref={setNodeRef} className="flex-1 p-2 bg-gray-100 rounded-lg mx-2 max-w-sm">
      <h3 className="p-2">{title}</h3>
      <SortableContext id={id} items={items} strategy={verticalListSortingStrategy}>
        {items.map((item) => (
          <Card key={item} id={item}>
            {item}
          </Card>
        ))}
      </SortableContext>
    </div>
  );
}
