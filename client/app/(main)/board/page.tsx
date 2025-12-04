import Board from "@/components/board/Board";
import { KanbanBoard } from "@/types/board";

const data: KanbanBoard = {
  id: "default",
  title: "nameless",
  data: [
    {
      id: "todo",
      title: "ToDo",
      items: [
        { id: "1", title: "Task 1", index: 0 },
        { id: "2", title: "Task 2", text: "This is task 2!", index: 2 },
        {
          id: "3",
          title: "Task 3",
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
          index: 1,
        },
      ],
    },
    {
      id: "inprogress",
      title: "In Progress",
      items: [
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
    },
    {
      id: "done",
      title: "Done",
      items: [{ id: "6", title: "Task 6", text: "Task 6666666", index: 0 }],
    },
  ],
};

export default function FreeBoard() {
  return (
    <div className="flex flex-1 flex-col space-y-8 overflow-auto bg-neutral-200">
      <Board data={data} />
    </div>
  );
}
