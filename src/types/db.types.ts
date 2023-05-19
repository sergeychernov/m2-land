export interface User {
  id: number;//telegram id
  first_name: string;
  username: string;
  is_bot: boolean;
  language_code: string;
  score: number;
  teams: string[];
}

export type TaskStatus = "opened" | "closed"

export interface Task {
  id: number;
  username: string; //Кто начал задачу
  status: TaskStatus;
  team: string; // для какой команды
  name: string;
  url?: string; //задача
  averageScore?: string; //задача
}

export interface Vote {
  id: number;
  username: string; //человек, который проголосовал
  taskId: string;
  score: number;
  x2?: boolean;
}