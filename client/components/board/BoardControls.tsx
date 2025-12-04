"use client";

import { KanbanBoard } from "@/types/board";
import { Plus } from "lucide-react";
import { SetStateAction } from "react";

interface Props {
  setBoard: React.Dispatch<SetStateAction<KanbanBoard>>;
}

export default function BoardControls({ setBoard }: Props) {
  const createColumn = () => {};

  return (
    <div className="flex pb-2">
      <button
        onClick={createColumn}
        className="rounded-lg bg-neutral-100 p-1 hover:cursor-pointer hover:bg-neutral-100/60 active:bg-neutral-300"
      >
        <Plus size={24} />
      </button>
    </div>
  );
}
