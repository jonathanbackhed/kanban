export interface Task {
  id: string;
  title: string;
  text?: string;
  index: number;
}

export interface Column {
  id: string;
  title: string;
  items: Task[];
}

export interface KanbanBoard {
  id: string;
  title: string;
  data: Column[];
}
