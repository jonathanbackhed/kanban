import { KanbanBoard } from "@/types/board";

const key = "default-board";

export const setBoardLocalstorage = (board: KanbanBoard) => {
  localStorage.setItem(key, JSON.stringify(board));
};

export const getBoardLocalstorage = (): KanbanBoard | null => {
  const board = localStorage.getItem(key);
  if (!board) return null;

  return JSON.parse(board);
};
