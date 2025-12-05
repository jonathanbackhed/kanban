"use client";

import Board from "@/components/board/Board";
import { getBoardLocalstorage } from "@/lib/utils";
import { KanbanBoard } from "@/types/board";
import { useEffect, useState } from "react";

export default function FreeBoard() {
  const [data, setData] = useState<KanbanBoard>();

  useEffect(() => {
    let board = getBoardLocalstorage();
    if (!board) {
      board = {
        id: "default",
        title: "Default Board",
        data: [
          {
            id: "todo",
            title: "ToDo",
            items: [
              { id: "1", title: "Task 1", index: 0 },
              {
                id: "2",
                title: "Task 2",
                text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
                index: 1,
              },
            ],
          },
          {
            id: "done",
            title: "Done",
            items: [{ id: "3", title: "Task 3", text: "This is task 3!", index: 0 }],
          },
        ],
      };
    }
    setData(board);
  }, []);

  return (
    <div className="flex flex-1 flex-col space-y-8 overflow-auto bg-neutral-200">{data && <Board data={data} />}</div>
  );
}
